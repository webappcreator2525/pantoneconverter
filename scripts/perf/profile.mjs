/**
 * CPU-profile a burst of typing in one converter input and report where the
 * time actually goes, so an INP fix targets the real cost instead of the
 * assumed one.
 *
 *   node scripts/perf/profile.mjs /hex-to-pantone/ '#hex-input' '#1a7f4b2c'
 */
import { serveDir, launchChrome, evaluate, typeChar, sleep } from './cdp.mjs';

const route = process.argv[2] ?? '/hex-to-pantone/';
const selector = process.argv[3] ?? '#hex-input';
const text = process.argv[4] ?? '#1a7f4b2c';

const server = await serveDir('out');
const session = await launchChrome();

try {
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.send('Profiler.enable');
  await session.send('Emulation.setDeviceMetricsOverride', { width: 1350, height: 940, deviceScaleFactor: 1, mobile: false });
  await session.send('Page.navigate', { url: server.origin + route });
  await session.once('Page.loadEventFired');
  await sleep(1500);

  await evaluate(session, `
    (() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      el.focus(); el.setSelectionRange(0, el.value.length);
      return true;
    })()
  `);

  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await session.send('Profiler.setSamplingInterval', { interval: 100 });
  await session.send('Profiler.start');

  for (let pass = 0; pass < 3; pass += 1) {
    for (const ch of text) { await typeChar(session, ch); await sleep(200); }
    await evaluate(session, `(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.setSelectionRange(0, el.value.length); return true; })()`);
    await sleep(200);
  }

  const { profile } = await session.send('Profiler.stop');
  await session.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  const total = profile.nodes.reduce((s, n) => s + (n.hitCount || 0), 0);
  const byFn = new Map();
  for (const n of profile.nodes) {
    if (!n.hitCount) continue;
    const f = n.callFrame;
    const file = (f.url || '').split('/').pop().split('?')[0] || '(native)';
    const key = `${f.functionName || '(anonymous)'}  @ ${file}:${f.lineNumber}`;
    byFn.set(key, (byFn.get(key) || 0) + n.hitCount);
  }
  const ms = (hits) => ((hits / total) * (profile.endTime - profile.startTime) / 1000).toFixed(0);

  console.log(`\n${route}  ${selector}  — ${text.length * 3} keystrokes, 4x CPU throttle`);
  console.log(`total sampled ${((profile.endTime - profile.startTime) / 1000).toFixed(0)} ms wall, ${total} samples\n`);
  console.log('Top self-time:');
  [...byFn.entries()].sort((a, b) => b[1] - a[1]).slice(0, 22)
    .forEach(([k, v]) => console.log(`  ${String(((v / total) * 100).toFixed(1)).padStart(5)}%  ${String(ms(v)).padStart(5)} ms   ${k}`));
} finally {
  await session.close();
  await server.close();
}
