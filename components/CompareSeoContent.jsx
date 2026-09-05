import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import FAQSection from './FAQSection';
import {
  COMPARE_SECTIONS,
  DELTA_BANDS,
  COATED_UNCOATED_ROWS,
  POPULAR_PAIRS,
  TOLERANCE_ROWS,
  HOWTO_STEPS,
  COMPARE_FAQS,
} from '../lib/compareData';

/**
 * The editorial half of /compare/ — everything below the comparison tool.
 *
 * Split out of pages/compare.jsx so the page file stays about the tool. Every
 * block here is static markup: no state, no data fetching, nothing that behaves
 * differently between the export and the hydrated page.
 */

const ACCENT = '#c44eed';
const P = { fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75 };

function Section({ id, h2, children, headingId }) {
  const hid = headingId || `${id}-heading`;
  return (
    <section id={id} className="card" style={{ borderTop: `3px solid ${ACCENT}` }} aria-labelledby={hid}>
      <h2 id={hid} style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
        {h2}
      </h2>
      {children}
    </section>
  );
}

/** Table wrapper: scrolls inside itself so a wide table never moves the page. */
function Scroller({ children, minWidth = '38rem' }) {
  return (
    <div style={{ overflowX: 'auto', margin: '0 -0.25rem', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', minWidth, borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        {children}
      </table>
    </div>
  );
}

const TH = {
  textAlign: 'left', padding: '0.65rem 0.75rem', borderBottom: '2px solid #e5e7eb',
  fontSize: '0.7rem', fontWeight: 800, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
};
const TD = {
  padding: '0.7rem 0.75rem', borderBottom: '1px solid #f3f4f6',
  color: '#4b5563', lineHeight: 1.6, verticalAlign: 'top',
};

/**
 * Colour chip plus its HEX value. The text carries the meaning; the chip is
 * decoration, so it is hidden from assistive technology rather than described
 * twice.
 */
function Chip({ hex, name }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
      <span
        aria-hidden="true"
        style={{
          width: '1rem', height: '1rem', borderRadius: '0.25rem', flexShrink: 0,
          backgroundColor: hex, border: '1px solid rgba(0,0,0,0.18)',
        }}
      />
      <code style={{ fontFamily: 'monospace', fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>
        {hex}
      </code>
      {name && <span className="sr-only">{` — ${name}`}</span>}
    </span>
  );
}

/** ΔE*00 figure with the band colour behind it, used in both data tables. */
function DeltaCell({ value }) {
  const band =
    value < 1 ? DELTA_BANDS[0] :
    value < 2 ? DELTA_BANDS[1] :
    value < 3.5 ? DELTA_BANDS[2] :
    value < 5 ? DELTA_BANDS[3] :
    value < 10 ? DELTA_BANDS[4] : DELTA_BANDS[5];

  return (
    <span style={{
      display: 'inline-block', padding: '0.2rem 0.55rem', borderRadius: '9999px',
      background: band.tint, color: band.color,
      fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8rem', whiteSpace: 'nowrap',
    }}>
      {value.toFixed(2)}
    </span>
  );
}

// ─── 2. Table of contents ────────────────────────────────────────────────────

export function CompareToc() {
  return (
    <nav
      aria-label="On this page"
      className="card"
      style={{ padding: '0.9rem 1.1rem', marginTop: '2rem' }}
    >
      <details open style={{ margin: 0 }}>
        <summary style={{
          cursor: 'pointer', listStyle: 'revert',
          fontSize: '0.68rem', fontWeight: 800, color: '#6b7280',
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          On this page
        </summary>
        <ul style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
          listStyle: 'none', margin: '0.7rem 0 0', padding: 0,
        }}>
          {COMPARE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                style={{
                  display: 'inline-block', padding: '0.3rem 0.7rem',
                  borderRadius: '9999px', border: '1.5px solid #e5e7eb',
                  background: '#f9fafb', textDecoration: 'none',
                  fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed',
                }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}

// ─── 3. How to compare ───────────────────────────────────────────────────────

export function HowToCompare() {
  return (
    <Section id="how-to-compare" h2="How to compare two Pantone colors">
      <p style={{ ...P, margin: '0 0 0.75rem' }}>
        The comparison runs entirely in your browser and updates as you type — there is no convert
        button, no signup and nothing is uploaded. Five steps take you from two PMS codes to a
        decision you can defend on a press check rather than a hunch about what looks close enough.
      </p>
      {/* Tailwind's preflight strips list markers, and a flex column would
          blockify the items and drop them again — so the numbering is restored
          explicitly here. These are ordered steps and need to read as such. */}
      <ol style={{ ...P, margin: 0, paddingLeft: '1.5rem', listStyle: 'decimal outside' }}>
        {HOWTO_STEPS.map((step, i) => (
          <li key={step.name} style={{ display: 'list-item', marginTop: i > 0 ? '0.55rem' : 0 }}>
            <strong style={{ color: '#111827' }}>{step.name}.</strong> {step.text}
          </li>
        ))}
      </ol>
    </Section>
  );
}

// ─── 4. ΔE*00 explained + tolerance ladder ───────────────────────────────────

function DeltaLadder() {
  return (
    <figure style={{ margin: '1.25rem 0 0' }}>
      <figcaption style={{
        fontSize: '0.68rem', fontWeight: 800, color: '#6b7280',
        textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.6rem',
      }}>
        ΔE*00 tolerance ladder
      </figcaption>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ minWidth: '34rem' }}>
          {/* Band bar — height fixed so the figure reserves its space up front. */}
          <div style={{
            display: 'flex', height: '3rem', borderRadius: '0.6rem',
            overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)',
          }}>
            {DELTA_BANDS.map((b) => (
              <div
                key={b.range}
                style={{
                  flex: b.span, background: b.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 0.3rem',
                }}
              >
                <span style={{
                  color: '#ffffff', fontWeight: 800, fontSize: '0.72rem',
                  fontFamily: 'monospace', whiteSpace: 'nowrap',
                }}>
                  {b.range}
                </span>
              </div>
            ))}
          </div>

          {/* Short label under each band. */}
          <div style={{ display: 'flex', gap: '2px', marginTop: '2px', height: '2.1rem' }}>
            {DELTA_BANDS.map((b) => (
              <div
                key={b.range}
                style={{
                  flex: b.span, background: b.tint, color: b.color,
                  borderRadius: '0.35rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.68rem', fontWeight: 700, textAlign: 'center',
                  padding: '0 0.25rem', lineHeight: 1.2,
                }}
              >
                {b.short}
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', marginTop: '0.4rem',
          }}>
            <span>ΔE*00 0 — identical</span>
            <span>ΔE*00 10+ — unrelated colours</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function DeltaEExplained() {
  return (
    <Section id="delta-e-explained" h2="Understanding ΔE*00: how different are two colours, really?">
      <p style={{ ...P, margin: 0 }}>
        ΔE is a measure of Pantone colour difference: one number for how far apart two colours sit
        in a space built to model human vision. It is not a difference in ink formula or in HEX
        digits — it is a difference in appearance. That distinction is the whole point. Two colours
        whose HEX values differ by a lot can look nearly identical, and two whose HEX values differ
        by a little can look obviously unlike each other, because sRGB digits are display
        instructions rather than a description of what an eye does with the result.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        The original 1976 formula, ΔE76, was simply the straight-line distance between two colours
        in CIELAB. It was easy to compute and perceptually uneven: it over-penalised differences in
        some hue regions and badly under-reported them in others, most notoriously in saturated
        blues, where two colours could measure a comfortable ΔE76 and still look like a mistake on
        press. CIEDE2000 — ΔE*00 — was published to fix exactly that. It adds weighting functions
        for lightness, chroma and hue, plus a rotation term that corrects the blue region
        specifically, so its numbers track what people actually see.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        This is why a ΔE of 2 in a blue does not look like a ΔE of 2 in a grey. Human vision is far
        more sensitive to small shifts in low-chroma neutrals than to the same measured shift in a
        saturated colour, so ΔE*00 compresses the saturated end and expands the neutral end to
        compensate. A pair of greys at ΔE*00 2 and a pair of blues at ΔE*00 2 should therefore look
        about equally different — which is the property ΔE76 never had.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        The other reason to trust ΔE*00 over an eyeballed HEX comparison is that it is device- and
        observer-independent. It is computed in CIELAB from a defined illuminant and standard
        observer, so it means the same thing on your laptop, on a printer&rsquo;s calibrated proofer
        and in a spectrophotometer report. Two HEX values compared by eye mean whatever your
        particular monitor, its profile and the light in your room make them mean. The ladder below
        is how the printing industry reads the resulting number.
      </p>

      <DeltaLadder />

      <div style={{ marginTop: '1.25rem' }}>
        <Scroller minWidth="34rem">
          <caption className="sr-only">
            ΔE*00 (CIEDE2000) tolerance bands, what each looks like to a human observer, and what
            each means in production
          </caption>
          <thead>
            <tr>
              {['ΔE*00', 'What a human sees', 'Practical meaning'].map((h) => (
                <th key={h} scope="col" style={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DELTA_BANDS.map((b) => (
              <tr key={b.range}>
                <th scope="row" style={{
                  ...TD, whiteSpace: 'nowrap', fontFamily: 'monospace',
                  fontWeight: 800, color: b.color, textAlign: 'left',
                }}>
                  {b.range}
                </th>
                <td style={TD}>{b.seen}</td>
                <td style={TD}>{b.meaning}</td>
              </tr>
            ))}
          </tbody>
        </Scroller>
      </div>
    </Section>
  );
}

// ─── 5. Coated vs uncoated ───────────────────────────────────────────────────

export function CoatedVsUncoated() {
  return (
    <Section id="coated-vs-uncoated" h2="Coated vs uncoated: why the same PMS number compares differently">
      <p style={{ ...P, margin: 0 }}>
        186 C and 186 U are the same ink. The only thing that changes is the paper underneath it,
        and that alone puts them 11.74 ΔE*00 apart — several times the tolerance most brand owners
        would accept anywhere else. The Pantone coated vs uncoated difference is not a colour
        decision that somebody got wrong; it is what the substrate does to a fixed quantity of ink.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        Coated stock carries a mineral or polymer layer that keeps ink sitting on the surface, where
        it stays dense and saturated and reflects light cleanly. Uncoated stock is absorbent: the
        vehicle wicks into the fibre, the pigment settles into a rougher surface, and the paper
        scatters light back through the ink film. The result is lighter, duller and lower in
        contrast. Dot gain compounds it — halftone dots spread as the ink is absorbed, so tints
        print heavier on uncoated even as solids print weaker.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        So when you compare a C code against a U code here, read the number as a substrate question
        rather than a colour question. It is telling you how much this particular ink will shift if
        the job moves from a coated sheet to a kraft box, which is genuinely useful — but it is not
        telling you that anyone chose the wrong colour. Specify the code that matches the stock you
        are actually printing on, and expect the two to look different side by side. Our{' '}
        <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600 }}>
          coated vs uncoated guide
        </Link>{' '}
        covers how to brief a printer when a brand has to live on both.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        <Scroller minWidth="42rem">
          <caption className="sr-only">
            Six Pantone numbers with their coated and uncoated HEX values and the ΔE*00 difference
            between them
          </caption>
          <thead>
            <tr>
              {['PMS', 'Coated HEX', 'Uncoated HEX', 'ΔE*00 C↔U', 'Notes'].map((h) => (
                <th key={h} scope="col" style={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COATED_UNCOATED_ROWS.map((row) => (
              <tr key={row.pms} id={`cu-${row.pms.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <th scope="row" style={{ ...TD, fontWeight: 800, color: '#111827', whiteSpace: 'nowrap', textAlign: 'left' }}>
                  {row.pms}
                </th>
                <td style={TD}><Chip hex={row.coatedHex} name={`${row.pms} coated`} /></td>
                <td style={TD}><Chip hex={row.uncoatedHex} name={`${row.pms} uncoated`} /></td>
                <td style={TD}><DeltaCell value={row.deltaE} /></td>
                <td style={TD}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </Scroller>
      </div>
    </Section>
  );
}

// ─── 6. Popular comparisons ──────────────────────────────────────────────────

function compareHrefFor(pair) {
  if (pair.compareHref !== undefined) return pair.compareHref;
  return `/compare/?a=${encodeURIComponent(pair.aName)}&b=${encodeURIComponent(pair.bName)}`;
}

export function PopularComparisons() {
  return (
    <Section id="popular-comparisons" h2="Pantone comparisons designers look up most">
      <p style={{ ...P, margin: '0 0 1rem' }}>
        A handful of Pantone vs Pantone questions come up far more often than the rest, usually
        because two codes share a word, a number or a reputation. Here is what each pair actually
        is, with the ΔE*00 figure computed from the same library the tool above searches. Every row
        in the table opens the comparison pre-loaded, so you can check it against your own screen.
      </p>

      {POPULAR_PAIRS.map((pair) => (
        <div key={pair.id} style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827', margin: '0 0 0.35rem' }}>
            {pair.title}
          </h3>
          <p style={{ ...P, margin: 0 }}>{pair.body}</p>
        </div>
      ))}

      <div style={{ marginTop: '1.25rem' }}>
        <Scroller minWidth="48rem">
          <caption className="sr-only">
            The most frequently compared Pantone pairs with their ΔE*00 colour difference and a
            one-line verdict
          </caption>
          <thead>
            <tr>
              {['Comparison', 'Swatch A', 'Swatch B', 'ΔE*00', 'Verdict', 'Compare it'].map((h) => (
                <th key={h} scope="col" style={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POPULAR_PAIRS.map((pair) => {
              const href = compareHrefFor(pair);
              return (
                <tr key={pair.id} id={pair.id}>
                  <th scope="row" style={{ ...TD, fontWeight: 800, color: '#111827', textAlign: 'left' }}>
                    {pair.title}
                  </th>
                  <td style={TD}><Chip hex={pair.aHex} name={pair.aLabel} /><br />
                    <span style={{ fontSize: '0.75rem' }}>{pair.aLabel}</span>
                  </td>
                  <td style={TD}><Chip hex={pair.bHex} name={pair.bLabel} /><br />
                    <span style={{ fontSize: '0.75rem' }}>{pair.bLabel}</span>
                  </td>
                  <td style={TD}><DeltaCell value={pair.deltaE} /></td>
                  <td style={TD}>{pair.verdict}</td>
                  <td style={TD}>
                    {href ? (
                      <Link
                        href={href}
                        style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        {pair.compareLabel || 'Open comparison'}
                      </Link>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                        Not a spot colour —{' '}
                        <Link href="/pantone-black/" style={{ color: '#7c3aed', fontWeight: 700 }}>
                          Pantone blacks
                        </Link>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Scroller>
      </div>
    </Section>
  );
}

// ─── 7. Close enough to substitute ───────────────────────────────────────────

export function CloseEnough() {
  return (
    <Section id="close-enough" h2="When two Pantone colours are close enough to substitute">
      <p style={{ ...P, margin: 0 }}>
        There is no single ΔE*00 number that means &ldquo;safe to swap&rdquo;. The threshold moves
        with what the colour is doing, how it will be produced and how it will be looked at, and
        getting that context right matters more than shaving a decimal place off the score.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        Brand identity work has near-zero tolerance regardless of ΔE. A logo colour is a recognition
        asset and often a registered one, so the answer to &ldquo;can we use the other red?&rdquo; is
        no, even at ΔE*00 1.5 — not because anyone would see it in isolation, but because the whole
        value of the colour is that it is the same everywhere. Packaging is a substrate question
        first: on coated board a two-point difference sits next to twenty identical packs on a shelf
        and becomes visible, while on kraft the paper moves the colour further than the substitution
        would.
      </p>
      <p style={{ ...P, margin: '0.75rem 0 0' }}>
        Signage and architectural work is judged at viewing distance under uncontrolled light, so
        tolerances widen considerably — a difference that is obvious on a desk is invisible on a
        fascia six metres up, and gloss level will shift the appearance more than the colour choice
        did. Textile is a different question entirely: it has its own deck, and a coated PMS number
        is a starting point for a dye lab rather than an answer. Ask for the TCX or TPG code and a
        lab dip on the actual fabric.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        <Scroller minWidth="44rem">
          <caption className="sr-only">
            Acceptable ΔE*00 tolerance by application, with the reason and what else to check
          </caption>
          <thead>
            <tr>
              {['Application', 'Acceptable ΔE*00', 'Why', 'What to check besides ΔE'].map((h) => (
                <th key={h} scope="col" style={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOLERANCE_ROWS.map((row) => (
              <tr key={row.application}>
                <th scope="row" style={{ ...TD, fontWeight: 800, color: '#111827', textAlign: 'left' }}>
                  {row.application}
                </th>
                <td style={{ ...TD, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{row.tolerance}</td>
                <td style={TD}>{row.why}</td>
                <td style={TD}>{row.check}</td>
              </tr>
            ))}
          </tbody>
        </Scroller>
      </div>
    </Section>
  );
}

// ─── 9. Accuracy ─────────────────────────────────────────────────────────────

export function CompareAccuracy() {
  return (
    <section
      id="accuracy"
      className="card"
      style={{ borderTop: '3px solid #f59e0b', background: '#fffbeb' }}
      aria-labelledby="accuracy-heading"
    >
      <h2
        id="accuracy-heading"
        style={{
          fontSize: '1.05rem', fontWeight: 800, color: '#92400e', marginBottom: '0.75rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <AlertTriangle size={18} color="#b45309" strokeWidth={2.5} aria-hidden="true" />
        Accuracy — read before you specify a colour
      </h2>
      <p style={{ ...P, color: '#78350f', margin: 0 }}>
        Everything on this page is computed from sRGB approximations of physical spot inks. A
        Pantone colour is a mixed ink laid on a specific paper; the HEX and RGB values here are the
        closest a standard display can come to that, and sRGB simply cannot reach parts of the
        Pantone gamut — a number of saturated oranges, greens and blues are clipped to the nearest
        displayable colour before you ever see them. Two inks that differ visibly on paper can
        therefore render closer here than they really are.
      </p>
      <p style={{ ...P, color: '#78350f', margin: '0.75rem 0 0' }}>
        Your screen is the other variable. An uncalibrated monitor, a colour profile you have never
        checked and the light in the room all move what you are looking at, and none of that is
        captured in the ΔE*00 figure. Judge hue relationships on screen if you like, but do not
        sign off a colour on one. No digital comparison replaces a physical Pantone guide viewed
        under a D50 light booth, or a spectrophotometer reading if the tolerance actually matters.
      </p>
      <p style={{ ...P, color: '#78350f', margin: '0.75rem 0 0' }}>
        Physical guides are consumable. Ink fades, paper yellows and a fan deck that has lived on a
        sunny desk for five years is no longer the standard it was printed as. Pantone recommends
        replacing guides roughly every year or two under normal use — if a comparison is going into
        a contract or a brand manual, make sure the book you are checking against is current.
      </p>
    </section>
  );
}

// ─── 10. FAQ ─────────────────────────────────────────────────────────────────

export function CompareFaq() {
  return (
    <div id="faq" className="card" style={{ borderTop: `3px solid ${ACCENT}` }}>
      <FAQSection
        suppressSchema
        items={COMPARE_FAQS.map((f) => ({ question: f.q, answer: f.a }))}
      />
    </div>
  );
}

// ─── 11. Related tools ───────────────────────────────────────────────────────

const RELATED = [
  { href: '/hex-to-pantone/', label: 'HEX to Pantone converter', description: 'Paste a HEX value from a design file and find the closest PMS colours by ΔE*00.' },
  { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone converter', description: 'Turn a process build into the nearest spot colour before you quote a print job.' },
  { href: '/pantone-to-lab/', label: 'Pantone to LAB values', description: 'Get the device-independent CIELAB values the ΔE*00 figure on this page is computed from.' },
  { href: '/pantone-to-ral/', label: 'Pantone to RAL Classic', description: 'Cross a Pantone brand colour into the RAL codes paint and powder coating are ordered in.' },
  { href: '/pantone-to-ncs/', label: 'Pantone to NCS notation', description: 'Translate a spot colour into the Natural Colour System used in Nordic specification.' },
  { href: '/pantone-finder/', label: 'Pantone colour finder', description: 'Browse and search the full library when you do not yet know which two codes to compare.' },
  { href: '/tcx-vs-tpx-vs-tpg/', label: 'TCX vs TPX vs TPG explained', description: 'Why the textile decks are a separate product from the PMS spot library, and which to specify.' },
  { href: '/learn/coated-vs-uncoated/', label: 'Coated vs uncoated guide', description: 'How paper stock changes a spot ink, and how to brief a printer when a brand needs both.' },
];

export function CompareRelated() {
  return (
    <Section id="related" h2="Related colour tools &amp; guides">
      <p style={{ ...P, margin: '0 0 1rem' }}>
        Comparing two Pantone colours is usually one step in a longer job. If you arrived with a HEX
        or CMYK value rather than a PMS code, start with one of the converters below and bring the
        result back here. If the comparison has to cross into paint, coatings or textile, the
        cross-standard tools will give you a ΔE*00-ranked shortlist instead of a single answer. And
        if the two codes you are weighing differ only by their C or U suffix, the coated versus
        uncoated guide explains what you are actually looking at before you change anything in the
        artwork.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))', gap: '0.75rem' }}>
        {RELATED.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block', padding: '0.9rem 1rem', borderRadius: '0.75rem',
              border: '1.5px solid #e5e7eb', background: '#f9fafb', textDecoration: 'none',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.3 }}>
                {link.label}
              </span>
              <ArrowRight size={15} color="#a78bfa" strokeWidth={2.5} style={{ flexShrink: 0 }} aria-hidden="true" />
            </span>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.55, marginTop: '0.3rem' }}>
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
