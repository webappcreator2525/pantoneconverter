/**
 * Measure what we are actually trying to fix, against the real static export.
 *
 *   node scripts/perf/measure.mjs           # both suites
 *   node scripts/perf/measure.mjs inp       # interaction latency only
 *   node scripts/perf/measure.mjs cls       # layout shift only
 *
 * INP: types into a converter input under 4x CPU throttling and reports the
 * Event Timing numbers the browser itself records — `processingEnd -
 * processingStart` is the handler time the acceptance criterion names, and
 * `duration` is the full input-to-paint figure INP is scored on.
 *
 * CLS: loads each route in a desktop viewport, waits for hydration and a scroll,
 * and sums the layout-shift entries that were not user-initiated — the same
 * definition Lighthouse uses.
 *
 * Run `npm run build` first: this measures out/, not the dev server.
 */
import { serveDir, launchChrome, evaluate, typeChar, sleep } from './cdp.mjs';

const CPU_THROTTLE = 4;
const PASSES = 4;

// Two cadences, because they answer different questions.
//   220 ms — slower than the debounce, so every keystroke is scored on its own
//            and none of the coalescing applies. Pessimistic, and the case the
//            acceptance bar is read against.
//   110 ms — roughly how fast someone actually types, where coalescing does
//            apply. Closer to what a real user experiences.
const CADENCES = [
  { gap: 220, label: 'isolated keystrokes' },
  { gap: 110, label: 'real typing speed  ' },
];

const INP_TARGETS = [
  { route: '/hex-to-pantone/', selector: '#hex-input', type: '#1a7f4b2c', clear: true },
  { route: '/pantone-to-hex/', selector: '#pantone-search', type: 'reflex blue' },
  { route: '/pantone-finder/', selector: '#finder-search', type: 'cool gray' },
];

const CLS_ROUTES = [
  '/', '/hex-to-pantone/', '/cmyk-to-pantone/', '/pantone-finder/', '/compare/',
  '/pantone-to-hex/', '/pantone-to-cmyk/',
];

// ── Page-side instrumentation ────────────────────────────────────────────────

// Installed once per page. Installing it per cadence stacked a second observer
// that replayed the first cadence's buffered entries into the same array, which
// made every later run a superset of the earlier one — the giveaway was two
// cadences reporting an identical max.
const OBSERVE_EVENTS = `
  window.__evts = [];
  if (!window.__evtObserver) {
    window.__evtObserver = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.name === 'keydown' || e.name === 'keyup' || e.name === 'input') {
          window.__evts.push({
            name: e.name,
            handler: e.processingEnd - e.processingStart,
            duration: e.duration,
          });
        }
      }
    });
    window.__evtObserver.observe({ type: 'event', durationThreshold: 0 });
  }
  true;
`;

const OBSERVE_CLS = `
  window.__cls = 0;
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__cls += e.value;
      if (e.value > 0.0005) {
        window.__shifts.push({
          value: +e.value.toFixed(4),
          t: Math.round(e.startTime),
          nodes: e.sources.slice(0, 3).map((s) => {
            // A source can be a text node or an element that has since been
            // replaced; walk up to something nameable so the report is useful.
            let n = s.node;
            while (n && n.nodeType !== 1) n = n.parentNode;
            if (!n) return '(detached)';
            const name = (el) => {
              const id = el.id ? '#' + el.id : '';
              const cls = typeof el.className === 'string' && el.className
                ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.')
                : '';
              return el.tagName.toLowerCase() + id + cls;
            };
            const trail = [];
            for (let el = n, i = 0; el && el.tagName && i < 3; el = el.parentElement, i += 1) {
              trail.unshift(name(el));
            }
            const text = (n.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40);
            return trail.join(' > ') + (text ? \` "\${text}"\` : '');
          }),
          fontsReady: document.fonts.status,
        });
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });
  true;
`;

const CONSOLE_TRAP = `
  window.__warnings = [];
  for (const level of ['error', 'warn']) {
    const orig = console[level];
    console[level] = (...args) => {
      window.__warnings.push(level + ': ' + args.map(String).join(' ').slice(0, 300));
      orig.apply(console, args);
    };
  }
  true;
`;

const stat = (xs) => {
  if (!xs.length) return { n: 0 };
  const s = [...xs].sort((a, b) => a - b);
  const at = (q) => +s[Math.min(s.length - 1, Math.floor(s.length * q))].toFixed(1);
  return {
    n: s.length,
    max: +s[s.length - 1].toFixed(1),
    p95: at(0.95),
    p75: at(0.75),
    median: at(0.5),
  };
};

// ── Suites ───────────────────────────────────────────────────────────────────

async function measureInp(session, origin) {
  console.log(`\n━━━ INTERACTION LATENCY (${CPU_THROTTLE}x CPU throttle) ━━━`);
  const results = [];

  for (const target of INP_TARGETS) {
    await session.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await session.send('Page.navigate', { url: origin + target.route });
    await session.once('Page.loadEventFired');
    // Let React hydrate before we start typing, so we measure interaction cost
    // and not hydration cost.
    await sleep(1200);

    const refocus = `
      (() => {
        const el = document.querySelector(${JSON.stringify(target.selector)});
        if (!el) return false;
        el.focus();
        ${target.clear ? 'el.setSelectionRange(0, el.value.length);' : 'el.setSelectionRange(el.value.length, el.value.length);'}
        return true;
      })()
    `;
    if (!await evaluate(session, refocus)) {
      console.log(`  ${target.route} ${target.selector} — NOT FOUND, skipped`);
      continue;
    }

    console.log(`\n  ${target.selector}  (${target.route})`);

    for (const cadence of CADENCES) {
      await evaluate(session, OBSERVE_EVENTS);
      await session.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE });

      // Repeat the phrase so the reported max comes from ~30 keystrokes rather
      // than a handful — with 7 samples a max is a coin toss, not a measurement.
      for (let pass = 0; pass < PASSES; pass += 1) {
        for (const ch of target.type) {
          await typeChar(session, ch);
          await sleep(cadence.gap);
        }
        await sleep(400);
        await evaluate(session, refocus);
      }
      await sleep(600);

      const evts = await evaluate(session, 'window.__evts');
      await session.send('Emulation.setCPUThrottlingRate', { rate: 1 });

      const handler = stat(evts.filter((e) => e.name === 'input').map((e) => e.handler));
      const duration = stat(evts.map((e) => e.duration));
      results.push({ ...target, cadence: cadence.gap, handler, duration });

      const verdict = handler.max <= 50 ? 'PASS' : 'FAIL';
      console.log(`    ${cadence.label}  handler  max ${String(handler.max).padStart(5)}  p95 ${String(handler.p95).padStart(5)}  p75 ${String(handler.p75).padStart(5)}  median ${String(handler.median).padStart(5)} ms  (n=${handler.n})  ${verdict}`);
      console.log(`                            INP-style duration  max ${String(duration.max).padStart(5)}  p95 ${String(duration.p95).padStart(5)}  median ${duration.median} ms`);
    }
  }
  return results;
}

/**
 * Seed saved colours before the app boots. A clean profile never renders the
 * nav's count badge, so it cannot reproduce the shift that badge causes for
 * returning visitors — which is the population CrUX reports on.
 */
const SEED_FAVORITES = `
  localStorage.setItem('pantone-favorites', JSON.stringify(
    [['Pantone 186-C', '#C8102E'], ['Pantone 300-C', '#005EB8'], ['Pantone 485-C', '#DA291C']]
      .map(([name, hex]) => ({ name, hex, rgb: { r: 0, g: 0, b: 0 }, cmyk: { c: 0, m: 0, y: 0, k: 0 } }))
  ));
  true;
`;

async function measureCls(session, origin, { withFavorites = false, slowNetwork = false } = {}) {
  const profile = [
    withFavorites ? '3 saved colours' : 'clean profile',
    slowNetwork ? 'throttled network' : 'local network',
  ].join(', ');
  console.log(`\n━━━ LAYOUT SHIFT (desktop 1350x940, ${profile}) ━━━`);
  const results = [];

  await session.send('Network.enable');
  await session.send('Network.emulateNetworkConditions', slowNetwork
    // Roughly Lighthouse's throttled profile: ~1.6 Mbps down, 150 ms RTT.
    ? { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000 }
    : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

  // Registered once per suite, not once per route: the script persists for
  // every new document, so re-adding it stacks observers that all sum into the
  // same counter and silently inflate every route after the first.
  const { identifier } = await session.send('Page.addScriptToEvaluateOnNewDocument', {
    source: (withFavorites ? SEED_FAVORITES : '') + OBSERVE_CLS + CONSOLE_TRAP,
  });

  for (const route of CLS_ROUTES) {
    await session.send('Page.navigate', { url: origin + route });
    await session.once('Page.loadEventFired');
    await sleep(1500); // hydration + any post-mount effects
    await evaluate(session, 'window.scrollTo(0, 600); true');
    await sleep(500);
    await evaluate(session, 'window.scrollTo(0, 0); true');
    await sleep(500);

    const cls = await evaluate(session, 'window.__cls');
    const shifts = await evaluate(session, 'window.__shifts');
    const warnings = await evaluate(session, 'window.__warnings');
    const hydration = warnings.filter((w) => /hydrat|did not match|server.*client/i.test(w));

    results.push({ route, cls, shifts, hydration });
    const verdict = cls <= 0.03 ? 'PASS' : 'FAIL';
    console.log(`\n  ${route.padEnd(22)} CLS ${cls.toFixed(4).padStart(8)}   ${verdict}`);
    for (const s of shifts.slice(0, 4)) {
      console.log(`      +${s.value.toFixed(4)} at ${s.t}ms  (fonts: ${s.fontsReady})`);
      for (const n of s.nodes) console.log(`           ${n}`);
    }
    if (hydration.length) {
      console.log(`      HYDRATION WARNINGS: ${hydration.length}`);
      hydration.slice(0, 2).forEach((w) => console.log(`        ${w.slice(0, 160)}`));
    }
  }

  await session.send('Page.removeScriptToEvaluateOnNewDocument', { identifier });
  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const which = process.argv[2] ?? 'all';
const server = await serveDir('out');
const session = await launchChrome();

try {
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.send('Emulation.setDeviceMetricsOverride', {
    width: 1350, height: 940, deviceScaleFactor: 1, mobile: false,
  });

  if (which === 'all' || which === 'cls') await measureCls(session, server.origin);
  if (which === 'all' || which === 'cls' || which === 'clsfav') {
    await measureCls(session, server.origin, { withFavorites: true });
  }
  if (which === 'all' || which === 'cls' || which === 'clsslow') {
    await measureCls(session, server.origin, { withFavorites: true, slowNetwork: true });
  }
  if (which === 'all' || which === 'inp') await measureInp(session, server.origin);
} finally {
  await session.close();
  await server.close();
}
