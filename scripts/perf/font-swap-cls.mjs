/** Is the residual layout shift the webfont swap? Block the font and see. */
import { serveDir, launchChrome, evaluate, sleep } from './cdp.mjs';

const OBS = `
  window.__cls = 0;
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
  true;
`;
const ROUTES = ['/', '/cmyk-to-pantone/', '/pantone-to-hex/', '/hex-to-pantone/'];

const server = await serveDir('out');
const session = await launchChrome();
try {
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.send('Network.enable');
  await session.send('Emulation.setDeviceMetricsOverride', { width: 1350, height: 940, deviceScaleFactor: 1, mobile: false });
  await session.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000 });
  await session.send('Page.addScriptToEvaluateOnNewDocument', { source: OBS });

  for (const blocked of [false, true]) {
    await session.send('Network.setBlockedURLs', { urls: blocked ? ['*plus-jakarta*'] : [] });
    console.log(`\n  webfont ${blocked ? 'BLOCKED (fallback only, no swap)' : 'loaded normally'}:`);
    for (const route of ROUTES) {
      await session.send('Page.navigate', { url: server.origin + route });
      await session.once('Page.loadEventFired');
      await sleep(2200);
      const cls = await evaluate(session, 'window.__cls');
      console.log(`    ${route.padEnd(22)} CLS ${cls.toFixed(4)}`);
    }
  }
} finally {
  await session.close();
  await server.close();
}
