/**
 * A minimal Chrome DevTools Protocol client, plus a static file server for
 * `out/`. Zero dependencies: Node 22+ ships a WebSocket client, and Chrome is
 * already on the machine, so measuring the real thing needs nothing installed.
 *
 * Used by scripts/perf/measure.mjs. Not part of the build.
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** Serve a directory over HTTP, resolving `/foo/` to `/foo/index.html`. */
export function serveDir(dir, port = 8099) {
  const root = resolve(dir);
  const server = createServer(async (req, res) => {
    try {
      const url = decodeURIComponent(req.url.split('?')[0]);
      let file = join(root, url);
      if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
      if (url.endsWith('/')) file = join(file, 'index.html');
      else if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
      else if (!extname(file)) file = join(file, 'index.html');
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': MIME[extname(file)] || 'application/octet-stream',
        'cache-control': 'no-store',
      }).end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
    }
  });
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok({
    origin: `http://127.0.0.1:${port}`,
    close: () => new Promise((done) => server.close(done)),
  })));
}

const CHROME_CANDIDATES = [
  `${process.env['ProgramFiles']}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

function chromePath() {
  const found = CHROME_CANDIDATES.find((p) => p && existsSync(p));
  if (!found) throw new Error('No Chrome binary found — checked:\n  ' + CHROME_CANDIDATES.join('\n  '));
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Launch headless Chrome and return a connected, attached CDP session. */
export async function launchChrome({ port = 9333, width = 1350, height = 940 } = {}) {
  const profile = await mkdtemp(join(tmpdir(), 'pc-perf-'));
  const proc = spawn(chromePath(), [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-sync',
    '--disable-gpu',
    '--hide-scrollbars',
  ], { stdio: 'ignore' });

  // Wait for the debugging endpoint to answer.
  let info = null;
  for (let i = 0; i < 100 && !info; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      info = await res.json();
    } catch { await sleep(100); }
  }
  if (!info) { proc.kill(); throw new Error('Chrome did not expose a debugging port'); }

  const session = await connect(info.webSocketDebuggerUrl);

  const { targetId } = await session.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await session.send('Target.attachToTarget', { targetId, flatten: true });
  session.sessionId = sessionId;

  session.close = async () => {
    try { session.ws.close(); } catch { /* already gone */ }
    proc.kill();
    await sleep(200);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };

  return session;
}

/** Open a CDP WebSocket and wrap it in a promise-based send/on API. */
function connect(url) {
  return new Promise((ok, fail) => {
    const ws = new WebSocket(url);
    let nextId = 1;
    const pending = new Map();
    const listeners = new Map();

    const api = {
      ws,
      sessionId: undefined,
      send(method, params = {}, opts = {}) {
        const id = nextId++;
        const msg = { id, method, params };
        const sid = opts.sessionId ?? api.sessionId;
        if (sid) msg.sessionId = sid;
        ws.send(JSON.stringify(msg));
        return new Promise((res, rej) => pending.set(id, { res, rej, method }));
      },
      on(event, fn) {
        if (!listeners.has(event)) listeners.set(event, []);
        listeners.get(event).push(fn);
      },
      /** Resolve when `event` next fires, or reject after `timeout` ms. */
      once(event, timeout = 30000) {
        return new Promise((res, rej) => {
          const t = setTimeout(() => rej(new Error(`timeout waiting for ${event}`)), timeout);
          api.on(event, (p) => { clearTimeout(t); res(p); });
        });
      },
    };

    ws.addEventListener('open', () => ok(api));
    ws.addEventListener('error', (e) => fail(new Error(`CDP socket error: ${e.message ?? e}`)));
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej, method } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(`${method}: ${msg.error.message}`));
        else res(msg.result);
        return;
      }
      for (const fn of listeners.get(msg.method) ?? []) fn(msg.params);
    });
  });
}

/** Evaluate an expression in the page and return its (awaited) value. */
export async function evaluate(session, expression) {
  const { result, exceptionDetails } = await session.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (exceptionDetails) {
    throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
  }
  return result.value;
}

/** Type one character as a real key sequence, so React's onChange fires. */
export async function typeChar(session, ch) {
  const base = { text: ch, unmodifiedText: ch, key: ch };
  await session.send('Input.dispatchKeyEvent', { type: 'keyDown', ...base });
  await session.send('Input.dispatchKeyEvent', { type: 'char', ...base });
  await session.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
}

export { sleep };
