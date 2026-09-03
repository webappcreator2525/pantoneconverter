/**
 * How much of a keystroke is data work rather than React? This is the evidence
 * for NOT building a prefix index, precomputed Lab table or list virtualisation:
 * the dataset work is ~0.5 ms, so none of them can move the needle.
 *
 *   node scripts/perf/data-work.mjs
 */
import { readFileSync } from 'node:fs';
const db = JSON.parse(readFileSync('data/pantone.json', 'utf8'));
const COATED = db.filter(e => e.collection === 'coated');

const MAXD = Math.sqrt((2*255)**2 + (4*255)**2 + (3*255)**2);
function hexToRgb(hex){const c=hex.replace(/^#/,'');const f=c.length===3?c.split('').map(x=>x+x).join(''):c;return{r:parseInt(f.slice(0,2),16),g:parseInt(f.slice(2,4),16),b:parseInt(f.slice(4,6),16)};}
function dist(a,b){return Math.sqrt((2*(a.r-b.r))**2+(4*(a.g-b.g))**2+(3*(a.b-b.b))**2);}

function matchHex(hex, list) {
  const rgb = hexToRgb(hex);
  const res = list.map(e => {
    const er = e.rgb ?? hexToRgb(e.hex);
    const d = dist(rgb, er);
    return { name: e.name, hex: e.hex, rgb: er, cmyk: e.cmyk, distance: d, similarity: Math.round((1 - d/MAXD)*10000)/100 };
  });
  res.sort((a,b) => a.distance - b.distance);
  return res.slice(0,5);
}

function filterFinder(q, coll) {
  const s = q.trim().toLowerCase();
  return db.filter(e => (coll === 'all' || e.collection === coll)
    && (!s || e.name.toLowerCase().includes(s) || e.hex.toLowerCase().includes(s)));
}

function substringSearch(q) {
  const s = q.toLowerCase();
  return db.filter(e => e.name.toLowerCase().includes(s)).slice(0, 10);
}

const bench = (label, fn, iters = 200) => {
  for (let i = 0; i < 30; i++) fn();          // warm
  const t0 = performance.now();
  for (let i = 0; i < iters; i++) fn();
  const per = (performance.now() - t0) / iters;
  console.log(`  ${label.padEnd(46)} ${per.toFixed(3)} ms/call   (x4 throttle ≈ ${(per*4).toFixed(1)} ms)`);
  return per;
};

console.log('\nPure data work per keystroke (Node, unthrottled):');
bench('getMatchesFromHex over 1,341 coated', () => matchHex('#C8102E', COATED));
bench('finder filter over 3,231 (coated + query)', () => filterFinder('cool gray', 'coated'));
bench('finder filter over 3,231 (all, empty query)', () => filterFinder('', 'all'));
bench('PantoneSearchInput substring scan over 3,231', () => substringSearch('reflex blue'));
bench('  ...same, 1-char query (worst case)', () => substringSearch('a'));
console.log('\nResult-set sizes that then get rendered:');
console.log('  finder "cool gray"/coated ->', filterFinder('cool gray','coated').length, 'matches, first 120 rendered');
console.log('  finder ""/coated          ->', filterFinder('','coated').length, 'matches, first 120 rendered');
console.log('  search "a" (10 shown)     ->', db.filter(e=>e.name.toLowerCase().includes('a')).length, 'scanned, 10 shown');
