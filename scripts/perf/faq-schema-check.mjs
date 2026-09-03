/**
 * Does each page's FAQPage JSON-LD match the FAQ it actually renders?
 *
 * Google requires the two to agree, and a page that keeps the schema and the
 * visible list in separate literals will drift — /hex-to-pantone/ had five of
 * six entries out of sync before the pages were changed to generate the schema
 * from the visible items.
 *
 *   npm run build && node scripts/perf/faq-schema-check.mjs
 */
import { readFileSync } from 'node:fs';
const dec = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));
const norm = (s) => dec(s).replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, ' ').trim();

for (const f of ['out/hex-to-pantone/index.html', 'out/cmyk-to-pantone/index.html',
                 'out/pantone-to-hex/index.html', 'out/pantone-to-cmyk/index.html']) {
  const h = readFileSync(f, 'utf8');
  const text = norm(h.match(/<main[\s\S]*?<\/main>/)[0]
    .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' '));
  const lds = [...h.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = lds.flatMap((o) => (o['@graph'] ? o['@graph'] : [o])).find((o) => o['@type'] === 'FAQPage');
  console.log(`\n=== ${f}`);
  if (!faq) { console.log('  no FAQPage schema'); continue; }
  let bad = 0;
  for (const q of faq.mainEntity) {
    const okQ = text.includes(norm(q.name));
    const okA = text.includes(norm(q.acceptedAnswer.text));
    if (!okQ || !okA) { bad += 1; console.log(`  MISMATCH  question:${okQ ? 'ok' : 'MISSING'}  answer:${okA ? 'ok' : 'MISSING'}  — ${q.name.slice(0, 68)}`); }
  }
  console.log(`  ${faq.mainEntity.length - bad}/${faq.mainEntity.length} schema Q&A found verbatim in visible text`);
}
