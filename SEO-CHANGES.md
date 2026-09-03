# SEO rebuild — /pantone-to-hex/ and /pantone-to-cmyk/

Both pages were thin wrappers around the shared converter component with ~300 words of body copy
each, and both shipped byte-identical "Popular Colors" and "Convert the Same Pantone Colour to
Another System" blocks. They now carry substantial, page-specific reference content and share no
prose at all.

Search Console baseline: `/pantone-to-hex/` at avg. position 16.4 on "pantone to hex" (32
impressions, 0 clicks); `/pantone-to-cmyk/` at avg. position 74.1 on "pantone to cmyk", absent from
the top-26 pages report.

---

## Word counts

Measured on the exported HTML, `<main>` only, with nav, footer, `<script>`, `<style>` and `<svg>`
stripped.

| Page | Prose words (tables and figure captions excluded) | Including table content |
|---|---|---|
| `/pantone-to-hex/` | **3,601** | 4,630 |
| `/pantone-to-cmyk/` | **4,224** | 5,062 |

Both are comfortably over the 2,000-word target. Identical paragraphs shared between the two
pages: **0** (checked by diffing every `<p>` longer than six words across the two exported files).

---

## What changed on /pantone-to-hex/

| Section | Target queries |
|---|---|
| H1 + intro (direct answer in first 40 words) | `pantone to hex`, `pms to hex` |
| **Pantone to HEX Conversion Chart — 100 Most-Used PMS Colors** — 100 rows: swatch, PMS name, HEX, RGB, nearest CSS keyword by ΔE2000, WCAG contrast vs white and vs black. Filterable, sticky first column, rows 26–100 behind a toggle | `pantone black c hex`, `pantone black 7 c hex`, `pantone yellow c hex`, `pantone green c hex`, `pantone 485 c`, plus long-tail `pantone <n> c hex` |
| **Coated vs Uncoated — Why the Same PMS Number Has Two Different HEX Codes** — 20-row C/U table with ΔE2000 and a generated shift note | `pantone c vs u`, `hex to pantone uncoated`, `pantone 186 c vs u` |
| **Why Pantone → HEX Is Always an Approximation** — four named failure modes: sRGB gamut clipping (with the real 20.8% figure), metallics and neons, published vs computed sRGB, M0/M1/M2 and D50 vs D65 | `is pantone to hex accurate`, `pantone metallic hex`, `pantone 877 c hex` |
| **[SVG] How Far Apart Coated and Uncoated Really Are** — ΔE2000 histogram over all 1,341 C/U pairs | `pantone coated vs uncoated difference` |
| **How to Convert Pantone to HEX in Illustrator, Photoshop, Figma and InDesign** — four `<h3>` procedures, 18 numbered steps, feeds the HowTo schema | `how to convert pantone to hex illustrator`, `pantone hex photoshop`, `pantone in figma` |
| **When You Should NOT Use the HEX Value** | brand-guideline and print-spec intent; internal-link surface |
| **FAQ** — 14 Q&A | `what is the hex code for pantone black c`, `how do i convert pms to hex`, `what hex is pantone 485 c`, `what hex code is pantone reflex blue`, `do pantone metallics have a hex code`, `how many pantone colors are there`, `what is tcx` |
| **Where to Go From a HEX Code** — hand-written related block, unique anchors | internal linking |
| **Methodology + last updated** | E-E-A-T |

## What changed on /pantone-to-cmyk/

Deliberately print-oriented rather than a reworded HEX page: different tables, different charts,
different examples, different FAQ questions.

| Section | Target queries |
|---|---|
| H1 + intro | `pantone to cmyk`, `pms to cmyk`, `process color` |
| **Pantone to CMYK Conversion Chart — 100 Most-Used PMS Colors** — 100 rows: swatch, PMS name, C/M/Y/K, TAC, ink-headroom flag | `pantone 485 c cmyk`, `pantone 871 c cmyk`, `pantone reflex blue c cmyk`, `pantone blue 072 c cmyk`, `pantone black c cmyk values` |
| **Coated vs Uncoated CMYK Breakdowns** — six-row build comparison plus a dot-gain explanation | `pantone c vs u cmyk`, `uncoated cmyk conversion` |
| **Which Pantone Colors Cannot Be Reproduced in CMYK** — the named families, then a 25-row table ranked by ink headroom | `pantone colors not in cmyk`, `pantone out of gamut cmyk`, `reflex blue cmyk problem` — the most linkable section on the page |
| **[SVG] How Much Ink a Pantone Build Actually Puts on the Sheet** — TAC histogram over all 1,341 coated builds | `pantone total ink coverage`, `tac print` |
| **[SVG] Ink Build Comparison** — stacked C/M/Y/K bars for eight colours | `pantone cmyk breakdown` |
| **Rich Black, Total Ink Limit and Press Reality** — 300% limits, SWOP / GRACoL / FOGRA, registration black | `rich black cmyk`, `total ink limit`, `pantone process black c cmyk` |
| **How to Convert Pantone to CMYK in Illustrator and InDesign** — including the Ink Manager route; feeds the HowTo schema | `convert pantone to cmyk illustrator`, `indesign ink manager spot to process` |
| **Spot vs Process — When to Pay for the Extra Plate** | commercial-intent, genuinely under-served |
| **FAQ** — 14 Q&A | `what is pantone 485 c in cmyk`, `what is the cmyk value of pantone black c`, `why does my pantone color shift`, `what is pantone 871 c in cmyk`, `what is the cmyk for pantone reflex blue`, `is cmyk conversion the same for coated and uncoated` |
| **Next Steps for a Print Job** + **Methodology** | internal linking, E-E-A-T |

---

## Data honesty — read this before changing the CMYK page

`data/pantone.json` holds a published sRGB value for each colour and a CMYK breakdown that is
**derived from that sRGB value** by the standard non-colour-managed formula. `scripts/build-color-stats.mjs`
verifies this at build time (`CMYK_IS_DERIVED`): 3,226 of 3,231 entries match `rgbToCmyk(hex)` exactly,
the other five differ by one point of rounding. There is no measured Lab for the spot inks and no ICC
characterisation of any press condition anywhere in the repo.

Two consequences, both of which shaped the delivered pages:

1. **The brief asked for a gamut flag marking ΔE2000 > 5 as "out of process gamut".** That number
   cannot be produced honestly here. Comparing a build against the sRGB value it was derived from
   returns ΔE ≈ 0 for all 1,341 coated colours — it measures the round-trip, not the press. (Measured
   before deciding: max 1.33, median under 0.3, and the known-hard colours such as Orange 021 and
   Reflex Blue rank mid-table, which is the giveaway.) The substitute is **ink headroom**: how many
   of cyan, magenta and yellow the build drives to 95% or more. That is exact arithmetic on the
   published recipe, it ranks the genuinely difficult builds sensibly (Reflex Blue, the 2740s, the
   deep navies and greens all surface at the top), and the page states in a callout and again in the
   methodology section exactly what it does and does not mean.
2. **The brief asked for a "how much of the Pantone library fits inside sRGB" chart.** Every entry in
   the dataset *is* an sRGB hex, so by construction the answer is 100% and the chart would be
   meaningless. Replaced with a coated↔uncoated ΔE2000 histogram — real, computed, and directly
   serving the `pantone c vs u` and `hex to pantone uncoated` queries the site already ranks for.
   The sRGB-gamut point is still made, with the honest figure: **279 of 1,341 coated colours (20.8%)
   publish a screen value with at least one channel pinned at 0 or 255**, i.e. clipped at the gamut
   wall.

Also worth knowing: `Pantone Process Black C` is **not** in the dataset. Rather than invent it, the
CMYK FAQ answers the query by explaining that Process Black is the K ink itself (100% K by
definition) and contrasting it with Pantone Black C, which is in the dataset and converts to
C 0 M 9 Y 16 K 82.

If `data/pantone.json` ever gains measured builds, `CMYK_IS_DERIVED` flips to `false` and the
generated JSON says so — at which point the caveats above should be revisited.

---

## New and changed files

**New**

- `scripts/build-color-stats.mjs` — derives every figure the two pages print, writes `data/color-stats.json`.
  Wired up as `npm run data:stats` and included in `npm run data`. Written as `.mjs` rather than the
  `.ts` the brief suggested: the repo has no TypeScript build step for `scripts/`, every other
  generator there is `.mjs`, and they are run directly by Node.
- `scripts/css-named-colors.mjs` — the 148 CSS Color Level 4 keywords, used for the "nearest CSS colour"
  column. Spec values, not derived.
- `data/color-stats.json` — generated; committed so the numbers are stable between builds rather than
  moving on every deploy.
- `components/ConversionChartTable.jsx` — parameterised 100-row chart: sticky first column, horizontal
  scroll, `content-visibility: auto`, client-side filter, rows 26–100 behind a toggle with a
  `<noscript>` fallback that reveals them.
- `components/GamutChart.jsx` — `DistributionChart` (horizontal histogram), `InkBuildChart` (stacked
  C/M/Y/K bars), `ChartFigure` (figure + caption + written takeaway). Hand-written inline SVG, no
  library, 0 KB of JS.
- `components/LongFormSection.jsx` — `Section`, `P`, `H3`, `Steps`, `Bullets`, `Callout`, `A`,
  `RelatedLinks`. Shared furniture, zero shared content.

**Changed**

- `pages/pantone-to-hex.jsx`, `pages/pantone-to-cmyk.jsx` — rewritten.
- `components/PantoneToXPage.jsx` — now the shell only. The hard-coded Popular Colors strip, SEO
  paragraph and cross-system link block are gone; `popularNames`, `intro`, `schemas` and `children`
  come in as props. This is what removes the duplicate boilerplate.
- `scripts/palette-lib.mjs` — added `deltaE2000`, `relativeLuminance`, `contrastRatio` (mirroring
  `lib/colorUtils.js`, per the existing note in that file about `lib/` not being resolvable from
  build scripts).
- `pages/hex-to-pantone.jsx`, `pages/cmyk-to-pantone.jsx` — prominent contextual link to the matching
  forward converter, placed directly under the match results rather than four paragraphs into an SEO
  block.
- `pages/index.jsx` — body-copy links to both pages in the hero, not just the tool-grid cards.
- `content/learn/how-to-convert-hex-to-pantone.mdx`, `content/learn/how-to-convert-cmyk-to-pantone.mdx`
  — in-content links to the matching converter.
- `next-sitemap.config.js` — added a hand-kept `LASTMOD` map for the seven pages actually changed.
  `autoLastmod` stays off, for the reason documented in that file.
- `package.json` — `data:stats` script.

---

## Structured data

Each page emits five JSON-LD blocks, all validated as parsing and as matching visible text:

| Type | `/pantone-to-hex/` | `/pantone-to-cmyk/` |
|---|---|---|
| `WebApplication` | with `datePublished` + `dateModified` | same |
| `BreadcrumbList` | Home › Pantone to HEX | Home › Pantone to CMYK |
| `FAQPage` | 14 questions | 14 questions |
| `HowTo` | 4 `HowToSection`, 18 `HowToStep` | 2 `HowToSection`, 10 `HowToStep` |
| `Dataset` | 5 `variableMeasured`, CC-BY-4.0, creator, dateModified | 6 `variableMeasured`, same |

FAQ and HowTo schema are generated from the same arrays that render the visible text, so they cannot
drift. Verified: 14/14 FAQ questions, 14/14 FAQ answers and 18/18 (resp. 10/10) HowTo steps appear
verbatim in the exported HTML.

---

## Meta

| Page | Title | Len | Description | Len |
|---|---|---|---|---|
| `/pantone-to-hex/` | Pantone to HEX Converter — 3,200+ PMS Codes & Chart | 51 | Free instant Pantone to HEX converter for 3,231 PMS colours, coated and uncoated, plus a 100-colour PMS to HEX chart with RGB, CSS names and contrast ratios. | 157 |
| `/pantone-to-cmyk/` | Pantone to CMYK Converter + Free PMS Ink Chart | 46 | Free instant Pantone to CMYK converter for 3,231 PMS colours, coated and uncoated, plus a 100-colour ink chart with C M Y K percentages and total coverage. | 155 |

---

## FAQ schema drift on the two reverse converters

Found while preparing the deploy, with `node scripts/perf/faq-schema-check.mjs`, which compares each
page's `FAQPage` JSON-LD against the FAQ it actually renders.

`/hex-to-pantone/` — the site's strongest page — was maintaining its FAQ twice: once as a hardcoded
`FAQPage` node in the page's `@graph`, once as the `items` array passed to `<FAQSection>`. The two
had drifted, and **five of six schema entries no longer matched the visible text**, which is grounds
for Google to drop the FAQ rich result. `/cmyk-to-pantone/` had one of seven out of sync.

Both pages now generate the `FAQPage` node from the same array that renders the accordion, the way
the two rebuilt pages already did, so they cannot drift again. All four converter pages verify clean:

| Page | Before | After |
|---|---|---|
| `/hex-to-pantone/` | 1/6 matching | 8/8 |
| `/cmyk-to-pantone/` | 6/7 matching | 7/7 |
| `/pantone-to-hex/` | 14/14 | 14/14 |
| `/pantone-to-cmyk/` | 14/14 | 14/14 |

---

## Cannibalisation check

Searched every page title, H1 and meta description for "pantone to hex" and "pantone to cmyk". No
other page on the site targets either phrase in any of those three places. The colour-family hubs
(`/pantone-black/`, `/pantone-blue/`, …) use the pattern "Pantone X Color Codes: HEX, RGB, CMYK",
which targets colour-name intent rather than converter intent, and `/compare/` targets colour
comparison. No differentiation work was needed; both new pages now link to the hubs with descriptive
anchors instead of competing with them.

---

## Verification

- `next build` passes; both pages export to `out/`.
- All 100 chart row codes and all 100 hex values present in each exported HTML file.
- Chart `<caption>`, `scope="col"`, `scope="row"`, SVG `<title>`/`<desc>`, `role="img"` and
  `content-visibility` all present in the static output.
- Zero identical paragraphs between the two pages.
- Every HEX, RGB, CMYK, ΔE, TAC and contrast value traces to `data/color-stats.json`, which traces to
  `data/pantone.json`. `scripts/build-color-stats.mjs` throws if a named colour is missing from the
  dataset, so a bad row fails the build rather than shipping a guess.
- Tool unchanged in behaviour and still directly under the H1. Content is server-rendered, so there
  is no new layout shift; the added intro paragraph sits above the tool because the brief's own
  section order puts it there.

---

## Phase 2 — proposed, not built

1. **Programmatic per-colour pages** — `/pantone/485-c/` for the ~300 most-searched PMS numbers, each
   with HEX, RGB, CMYK, Lab, the C/U pair with its ΔE, closest RAL / NCS / DMC, and brands that use it
   (`data/brands.json` already maps 19 brands to PMS numbers, so that last block would be real for a
   subset and omitted otherwise). `getStaticPaths` over a curated list, one template. Biggest single
   opportunity in the query data — the site currently captures none of it. Needs a decision on
   thin-content risk: 300 near-identical pages is exactly what Google penalises unless each carries
   something the others do not, so the per-colour brand and C/U data has to be doing real work.
2. **Deep-linkable converter state** — `/pantone-to-hex/?c=485-C` shareable URLs. Cheap to add
   (`useEffect` seeding from the query string, as `/hex-to-pantone/` already does for `?hex=`). The
   "prerender the top 100 as static routes" half overlaps almost entirely with item 1 and should be
   folded into it rather than built twice.
3. **Downloadable assets** — full PMS→HEX chart as CSV and an `.ase` swatch file, generated by the
   same build script. `.ase` is a small binary format and is genuinely link-bait. Worth checking
   Pantone's licensing position on redistributing a full swatch set before shipping the `.ase`; the
   CSV of values we already publish on-page carries no additional risk.
4. **Embeddable widget** — an iframe-able mini converter with an attribution backlink. Needs a
   separate lightweight route with no nav or footer, plus an embed-code snippet on the page.
5. **Chart images** — render `pantone-to-hex-chart.png` and `pantone-to-cmyk-chart.png` from the
   existing SVG at build time (the repo already has `@resvg/resvg-js` for OG images), with descriptive
   alt text, for Google Images. Low effort, reuses existing tooling.

Recommended order: 1, then 3 (CSV only), then 2, then 5, then 4.
