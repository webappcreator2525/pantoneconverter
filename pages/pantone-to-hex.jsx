import { Fingerprint } from 'lucide-react';
import PantoneToXPage from '../components/PantoneToXPage';
import ConversionChartTable from '../components/ConversionChartTable';
import { DistributionChart, ChartFigure } from '../components/GamutChart';
import FAQSection from '../components/FAQSection';
import { Section, P, H3, Steps, Bullets, Callout, A, RelatedLinks } from '../components/LongFormSection';
import stats from '../data/color-stats.json';

const CANONICAL = 'https://pantoneconverter.com/pantone-to-hex/';
const ACCENT = '#ca8a04';

// Every figure printed below is looked up from data/color-stats.json, which
// scripts/build-color-stats.mjs derives from data/pantone.json. Nothing on this
// page is a typed-in colour value.
const C = Object.fromEntries(stats.chart.map((row) => [row.code, row]));
const hex = (code) => C[code].hex;
const { cuHistogram, srgbClipping, counts } = stats;

// ─── The chart table ─────────────────────────────────────────────────────────

const CHART_COLUMNS = [
  { key: 'name', label: 'Pantone colour' },
  { key: 'hex', label: 'HEX' },
  { key: 'rgb', label: 'RGB' },
  { key: 'css', label: 'Nearest CSS colour' },
  { key: 'cw', label: 'Contrast vs white', align: 'right', hint: 'WCAG 2.2 contrast ratio against #FFFFFF' },
  { key: 'cb', label: 'Contrast vs black', align: 'right', hint: 'WCAG 2.2 contrast ratio against #000000' },
];

const mono = { fontFamily: 'monospace', fontWeight: 700 };

/** WCAG bands, so the two contrast columns mean something at a glance. */
function contrastBadge(ratio) {
  const tone = ratio >= 4.5 ? '#166534' : ratio >= 3 ? '#9a3412' : '#6b7280';
  const label = ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : '—';
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      <strong style={{ color: '#111827' }}>{ratio.toFixed(2)}</strong>
      <span style={{ color: tone, fontSize: '0.68rem', fontWeight: 700, marginLeft: '0.4rem' }}>{label}</span>
    </span>
  );
}

const CHART_ROWS = stats.chart.map((row) => ({
  id: row.name,
  hex: row.hex,
  search: `${row.code} ${row.name} ${row.hex} ${row.css.name} ${row.family}`.toLowerCase(),
  cells: [
    <span key="n">
      {row.code}
      {row.collection !== 'coated' && (
        <span style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.7rem', marginLeft: '0.35rem' }}>
          ({row.collection === 'metallic' ? 'metallic' : 'neon'})
        </span>
      )}
    </span>,
    <code key="h" style={mono}>{row.hex}</code>,
    <span key="r" style={{ color: '#6b7280' }}>{row.rgb.r}, {row.rgb.g}, {row.rgb.b}</span>,
    <span key="c">
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block', width: '0.6rem', height: '0.6rem', borderRadius: '2px',
          background: row.css.hex, border: '1px solid rgba(0,0,0,0.15)', marginRight: '0.35rem',
        }}
      />
      {row.css.name}
      <span style={{ color: '#9ca3af', fontSize: '0.7rem', marginLeft: '0.35rem' }}>ΔE {row.css.deltaE.toFixed(1)}</span>
    </span>,
    contrastBadge(row.contrastWhite),
    contrastBadge(row.contrastBlack),
  ],
}));

// ─── Coated vs uncoated table ────────────────────────────────────────────────

function CoatedUncoatedTable() {
  const cell = {
    padding: '0.5rem 0.7rem', borderBottom: '1px solid #f3f4f6',
    fontSize: '0.79rem', color: '#374151', whiteSpace: 'nowrap',
  };
  const th = {
    ...cell, background: '#f9fafb', fontWeight: 800, fontSize: '0.7rem',
    color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em',
    borderBottom: '1.5px solid #e5e7eb', textAlign: 'left',
  };
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #f3f4f6', borderRadius: '0.875rem', background: '#fff' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '40rem' }}>
        <caption style={{ captionSide: 'top', textAlign: 'left', padding: '0.8rem 0.7rem', fontSize: '0.76rem', color: '#4b5563', lineHeight: 1.6 }}>
          Twenty widely-specified PMS numbers, with the HEX code published for the coated printing, the
          HEX code published for the uncoated printing, and the CIEDE2000 difference between them.
        </caption>
        <thead>
          <tr>
            <th scope="col" style={th}>PMS number</th>
            <th scope="col" style={th}>Coated (C) HEX</th>
            <th scope="col" style={th}>Uncoated (U) HEX</th>
            <th scope="col" style={{ ...th, textAlign: 'right' }}>ΔE2000</th>
            <th scope="col" style={th}>What changes</th>
          </tr>
        </thead>
        <tbody>
          {stats.coatedUncoated.map((row) => (
            <tr key={row.name}>
              <th scope="row" style={{ ...cell, fontWeight: 700, color: '#111827', textAlign: 'left' }}>{row.code}</th>
              <td style={cell}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '0.7rem', height: '0.7rem', borderRadius: '2px', background: row.coatedHex, border: '1px solid rgba(0,0,0,0.15)', marginRight: '0.4rem' }} />
                <code style={mono}>{row.coatedHex}</code>
              </td>
              <td style={cell}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: '0.7rem', height: '0.7rem', borderRadius: '2px', background: row.uncoatedHex, border: '1px solid rgba(0,0,0,0.15)', marginRight: '0.4rem' }} />
                <code style={mono}>{row.uncoatedHex}</code>
              </td>
              <td style={{ ...cell, textAlign: 'right', fontWeight: 700, color: row.deltaE >= 10 ? '#b91c1c' : row.deltaE >= 5 ? '#9a3412' : '#166534' }}>
                {row.deltaE.toFixed(2)}
              </td>
              <td style={{ ...cell, whiteSpace: 'normal', color: '#6b7280' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── How-to procedures ───────────────────────────────────────────────────────
//
// One array drives both the rendered <h3> sections and the HowTo JSON-LD, so
// the structured data can never describe steps the page does not show.

const HOW_TO = [
  {
    id: 'illustrator',
    app: 'Adobe Illustrator',
    heading: 'How to get a HEX code from a Pantone swatch in Illustrator',
    intro: 'Illustrator keeps spot colours as book references, so the Color panel shows you Lab or CMYK until you ask it for RGB.',
    steps: [
      'Select the object filled with the Pantone spot colour, or double-click its swatch in the Swatches panel.',
      'In the Swatch Options dialog, set Color Mode to RGB. Illustrator converts the book value and shows R, G and B.',
      'Open Window then Color, click the panel menu at the top right and choose RGB, then choose Web Safe RGB to reveal the hex field.',
      'Copy the six-digit value from the hex field. Prefix it with # for CSS.',
      'If you need the whole palette at once, choose File then Export then Export As, pick CSS, and Illustrator writes a stylesheet with every swatch as a hex value.',
    ],
  },
  {
    id: 'photoshop',
    app: 'Adobe Photoshop',
    heading: 'How to get a HEX code from a Pantone colour in Photoshop',
    intro: 'Photoshop reaches Pantone through the Color Libraries panel inside the colour picker.',
    steps: [
      'Click the foreground colour swatch in the toolbar to open the Color Picker.',
      'Click Color Libraries and choose the book you need — PANTONE+ Solid Coated for a C number, PANTONE+ Solid Uncoated for a U number.',
      'Type the PMS number with the list focused; Photoshop jumps to it as you type.',
      'Click Picker to return to the standard picker. The # field now holds the hex code for that colour.',
      'Make sure the document is in RGB mode and tagged sRGB before you read the value, or Photoshop reports the hex code for whatever working space the file is in.',
    ],
  },
  {
    id: 'figma',
    app: 'Figma',
    heading: 'How to use a Pantone colour in Figma',
    intro: 'Figma has no Pantone book. It is an sRGB tool end to end, so the hex value is the only thing it can hold.',
    steps: [
      'Look the PMS number up in the converter at the top of this page and copy the hex code.',
      'Select the layer, open the Fill swatch and paste the hex into the field at the top of the colour picker.',
      'Save it as a style straight away — click the four-dot icon, then the plus, and name the style with the PMS number, for example “Brand / PMS 186 C”.',
      'Put the PMS number in the style description as well, so anyone handing the file to a printer knows which spot ink it stands for.',
    ],
  },
  {
    id: 'indesign',
    app: 'Adobe InDesign',
    heading: 'How to read a Pantone swatch as HEX in InDesign',
    intro: 'InDesign is the one place where you usually want the spot swatch left alone — but you still need the hex for the matching web asset.',
    steps: [
      'Open Window then Color then Swatches and double-click the Pantone swatch.',
      'In Swatch Options, change Color Mode to RGB to read the R, G and B numbers, then press Cancel — not OK — so the swatch stays a spot colour in the document.',
      'Convert those RGB numbers to hex, or look the same PMS number up in the converter above.',
      'If you actually do want the document converted, use Window then Output then Ink Manager and tick “All Spots to Process” instead, so every spot swatch changes at once and none is missed.',
    ],
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
//
// Plain strings, because FAQPage JSON-LD has to match the visible answer text
// exactly and rich text would put markup on one side and not the other.

const FAQ = [
  {
    question: 'What is the HEX code for Pantone Black C?',
    answer: `Pantone Black C is ${hex('PMS Black C')} in HEX, or RGB ${C['PMS Black C'].rgb.r}, ${C['PMS Black C'].rgb.g}, ${C['PMS Black C'].rgb.b}. It is not a pure black — it is a warm, slightly brown-grey black, which is why brand sheets that specify Black C look softer on screen than ones that specify #000000. If you need a cooler black, Pantone Black 6 C is ${hex('PMS Black 6 C')} and Black 7 C is ${hex('PMS Black 7 C')}.`,
  },
  {
    question: 'How do I convert PMS to HEX?',
    answer: 'Type the PMS number into the search box at the top of this page and the hex code appears with the RGB and CMYK values beside it. Doing it by hand means opening the Pantone book in Illustrator or Photoshop, switching the swatch to RGB mode and reading the hex field. There is no arithmetic that turns a PMS number into a hex code — it is always a table lookup, because the numbers are ink names, not coordinates.',
  },
  {
    question: 'Is Pantone to HEX conversion accurate?',
    answer: 'It is accurate as a lookup and approximate as a colour. The hex code is the published sRGB rendition of the ink, so it is the right value to put in your CSS. But a spot ink is a physical pigment and sRGB is a display standard, and the two do not overlap perfectly. Highly saturated inks, metallics and neons have no hex code that genuinely matches them on paper.',
  },
  {
    question: 'What is the difference between Pantone C and U in HEX?',
    answer: `C is the ink printed on coated stock, U is the same ink on uncoated stock, and they publish different hex codes because they genuinely look different. Across the ${cuHistogram.n.toLocaleString('en-GB')} PMS numbers that exist in both decks, the median difference is ΔE ${cuHistogram.median}, and ${cuHistogram.over10} of them differ by ΔE 10 or more — a gap nobody would call the same colour. Always convert the variant your brand sheet actually names.`,
  },
  {
    question: 'Can I convert HEX back to Pantone?',
    answer: 'Yes, but it is a nearest-match search rather than a reversal. Several Pantone colours can round to similar hex codes, and most hex codes have no exact Pantone equivalent at all, so a reverse tool returns a ranked list of candidates with a difference score. Use the HEX to Pantone converter for that direction and check the top two or three against a physical swatch book before committing.',
  },
  {
    question: 'What HEX is Pantone 485 C?',
    answer: `Pantone 485 C is ${hex('PMS 485 C')}, or RGB ${C['PMS 485 C'].rgb.r}, ${C['PMS 485 C'].rgb.g}, ${C['PMS 485 C'].rgb.b}. It is the bright pillar-box red used across fast food, sports and transport branding. The uncoated printing, Pantone 485 U, is ${stats.coatedUncoated.find((r) => r.code === 'PMS 485').uncoatedHex} — noticeably lighter and duller, a ΔE2000 difference of ${stats.coatedUncoated.find((r) => r.code === 'PMS 485').deltaE}.`,
  },
  {
    question: 'Why does my Pantone color look different on screen?',
    answer: 'Three reasons, usually all at once. Your display renders sRGB differently from the next one unless both are calibrated. The hex code is a flat sRGB value with no ink, paper or gloss behind it. And the printed swatch you are comparing against changes with the light you hold it under — a colour measured at D50 in a viewing booth will not match the same sheet under warm office lighting.',
  },
  {
    question: 'Do Pantone metallics have a HEX code?',
    answer: `They have a hex value, but it does not represent the colour you would see on paper. Pantone 877 C, the standard silver, converts to ${hex('PMS 877 C')} — a flat mid-grey. Pantone 871 C, the standard gold, is ${hex('PMS 871 C')}, a flat olive-brown. Metallic inks work by reflecting light directionally, and a screen pixel cannot do that, so treat these values as placeholders and never as a match.`,
  },
  {
    question: 'Is there a free Pantone to HEX converter?',
    answer: 'This one. There is no account, no download and no usage limit, and the whole Pantone library is searchable from the box at the top of this page — coated, uncoated, metallic, pastel and neon. The conversion runs in your browser, so nothing you look up is sent anywhere.',
  },
  {
    question: 'What HEX code is Pantone Reflex Blue?',
    answer: `Pantone Reflex Blue C is ${hex('PMS Reflex Blue C')}, an extremely deep blue with the red channel at zero. That zero is a warning sign: the ink is more saturated than sRGB can represent, so the hex value sits on the edge of the display gamut. The uncoated printing, Reflex Blue U, publishes as ${stats.coatedUncoated.find((r) => r.code === 'PMS Reflex Blue').uncoatedHex}, which is ΔE ${stats.coatedUncoated.find((r) => r.code === 'PMS Reflex Blue').deltaE} away — one of the biggest coated-to-uncoated gaps in the whole system.`,
  },
  {
    question: 'How many Pantone colors are there?',
    answer: `This site indexes ${counts.total.toLocaleString('en-GB')} of them: ${counts.coated.toLocaleString('en-GB')} coated, ${counts.uncoated.toLocaleString('en-GB')} uncoated, ${counts.metallic} metallic and ${counts['pastels-neons']} pastels and neons, plus the Colour of the Year and skin-tone sets. The graphics system most people mean by "Pantone" is the Solid Coated and Solid Uncoated deck, which is the pair of 1,341-colour libraries at the core of that total.`,
  },
  {
    question: 'What is TCX and does it convert to HEX?',
    answer: 'TCX is the Pantone Fashion, Home and Interiors library — cotton-dyed swatches for textiles, numbered like 19-4052 rather than 286 C. It converts to hex the same way, but a TCX code and a PMS code are different systems and do not cross-reference by number. Use the TCX to HEX converter for textile colours; this page covers the graphics PMS library.',
  },
  {
    question: 'Why does the same PMS number give different HEX codes on different sites?',
    answer: 'Because there is more than one defensible way to render an ink as sRGB. Pantone publishes its own screen values; a colour-managed conversion from measured Lab through an sRGB profile gives slightly different numbers; and the rendering intent you pick changes them again. Differences of a few units per channel are normal. Pick one source and use it consistently across a brand rather than mixing them.',
  },
  {
    question: 'Should I use the HEX code or the Pantone number in my brand guidelines?',
    answer: 'Both, clearly separated. Name the PMS number as the master specification, then list the hex code beneath it labelled "screen only", along with the CMYK build labelled "process print only". Guidelines that publish a hex code alone force every printer to guess at the ink, and guidelines that publish only a PMS number leave every web developer to guess at the pixel.',
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

const PUBLISHED = '2024-11-18';
const MODIFIED = stats.generatedAt;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to convert a Pantone colour to a HEX code',
  description:
    'Read the sRGB hex value of a Pantone PMS spot colour in Adobe Illustrator, Adobe Photoshop, Figma and Adobe InDesign.',
  totalTime: 'PT3M',
  dateModified: MODIFIED,
  tool: HOW_TO.map((section) => ({ '@type': 'HowToTool', name: section.app })),
  step: HOW_TO.map((section) => ({
    '@type': 'HowToSection',
    name: section.heading,
    itemListElement: section.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `${section.app} step ${i + 1}`,
      text,
      url: `${CANONICAL}#${section.id}`,
    })),
  })),
};

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Pantone to HEX conversion chart — 100 most-used PMS colours',
  description:
    'HEX and RGB values for 100 Pantone PMS colours, each with its nearest CSS Color Level 4 keyword by CIEDE2000 and its WCAG 2.2 contrast ratio against white and against black.',
  url: `${CANONICAL}#hex-chart`,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  creator: { '@type': 'Organization', name: 'PantoneConverter.com', url: 'https://pantoneconverter.com/' },
  variableMeasured: [
    { '@type': 'PropertyValue', name: 'HEX', description: 'Six-digit sRGB hexadecimal colour code' },
    { '@type': 'PropertyValue', name: 'RGB', description: 'sRGB channel values, 0 to 255' },
    { '@type': 'PropertyValue', name: 'Nearest CSS named colour', description: 'Closest CSS Color Level 4 keyword, ranked by CIEDE2000' },
    { '@type': 'PropertyValue', name: 'Contrast ratio vs white', description: 'WCAG 2.2 contrast ratio against #FFFFFF, 1 to 21' },
    { '@type': 'PropertyValue', name: 'Contrast ratio vs black', description: 'WCAG 2.2 contrast ratio against #000000, 1 to 21' },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PantoneToHex() {
  return (
    <PantoneToXPage
      primaryOutput="hex"
      icon={<Fingerprint size={20} color={ACCENT} />}
      iconBg="#fefce8"
      pageTitle="Pantone to HEX Converter — 3,200+ PMS Codes & Chart"
      h1="Pantone to HEX Converter"
      metaDescription="Free instant Pantone to HEX converter for 3,231 PMS colours, coated and uncoated, plus a 100-colour PMS to HEX chart with RGB, CSS names and contrast ratios."
      canonical={CANONICAL}
      datePublished={PUBLISHED}
      dateModified={MODIFIED}
      toolLabel="Search any PMS colour to get its HEX code"
      toolHint="Try “186-C”, “Cool Gray 9”, “Reflex Blue”, “Black 7-C”, “877-C”"
      popularHeading="Most-searched PMS colours — click for the HEX code"
      popularNames={[
        'Pantone BLACK-C', 'Pantone BLACK-7-C', 'Pantone 186-C', 'Pantone 485-C',
        'Pantone YELLOW-C', 'Pantone GREEN-C', 'Pantone REFLEX-BLUE-C', 'Pantone BLUE-072-C',
        'Pantone COOL-GRAY-11-C', 'Pantone 877-C', 'Pantone 2955-C', 'Pantone WARM-RED-C',
      ]}
      schemas={[faqSchema, howToSchema, datasetSchema]}
      intro={
        <>
          <p style={{ margin: '0 0 0.6rem' }}>
            A Pantone to HEX conversion gives you the closest sRGB hex code for a PMS spot ink —
            Pantone 186 C, for example, is <code style={{ ...mono, color: '#111827' }}>{hex('PMS 186 C')}</code>.
            Search any of the {counts.total.toLocaleString('en-GB')} Pantone colours below and copy the
            hex code straight into your CSS, Figma file or brand sheet.
          </p>
          <p style={{ margin: 0 }}>
            Below the tool you will find a 100-colour PMS to HEX chart with RGB values, the nearest CSS
            keyword and WCAG contrast ratios; a coated-versus-uncoated table showing how far apart the C
            and U hex codes really are; and step-by-step instructions for pulling hex values out of
            Illustrator, Photoshop, Figma and InDesign. Every number on this page is computed from the
            same dataset the converter uses.
          </p>
        </>
      }
    >
      {/* ── 3. Conversion chart ───────────────────────────────────────────── */}
      <Section id="hex-chart-section" accent={ACCENT} kicker="Reference chart"
        heading="Pantone to HEX Conversion Chart — 100 Most-Used PMS Colors">
        <P>
          This chart covers a hundred PMS colours in one place: the fourteen base inks the Pantone
          system mixes everything else from, the seven deck blacks, all eleven Cool Grays, four
          speciality colours people look up by name, and sixty-four numbered colours that keep turning
          up in brand guidelines. It is a hand-picked selection rather than a popularity ranking, and it
          is grouped by ink family so you can scan a hue rather than hunt a number.
        </P>
        <P>
          Two columns go beyond a plain lookup. <strong>Nearest CSS colour</strong> gives the closest
          keyword from CSS Color Level 4 with the CIEDE2000 difference beside it, which tells you at a
          glance whether a shortcut exists — Pantone Yellow 012 C is exactly{' '}
          <code style={mono}>{hex('PMS Yellow 012 C')}</code>, which is CSS <code style={mono}>gold</code> to
          the digit, while Pantone Black C sits ΔE {C['PMS Black C'].css.deltaE.toFixed(1)} from CSS{' '}
          <code style={mono}>black</code> and is nothing like it.
        </P>
        <P>
          The two <strong>contrast</strong> columns are WCAG 2.2 ratios against white and against black,
          which is the number you actually need when someone hands you a brand colour and asks whether
          body text can sit on it. Anything at 4.5 or above passes AA for normal text; 3.0 to 4.49
          passes only for large text. Pantone Yellow C manages {C['PMS Yellow C'].contrastWhite.toFixed(2)} against
          white and {C['PMS Yellow C'].contrastBlack.toFixed(2)} against black, which is why yellow brands
          always set their type in black.
        </P>
        <ConversionChartTable
          id="hex-chart"
          caption="Pantone PMS to HEX conversion chart. HEX and RGB are the published sRGB values from data/pantone.json. The nearest CSS keyword is ranked by CIEDE2000 and contrast ratios follow WCAG 2.2. Scroll sideways on a narrow screen; the colour name column stays in place."
          columns={CHART_COLUMNS}
          rows={CHART_ROWS}
          initialVisible={25}
          revealLabel="Show all 100 colours"
          filterPlaceholder="Filter by PMS number, HEX code or CSS name…"
          footnote="Metallic and neon rows are marked. Their hex values are placeholders — see “Why Pantone to HEX is always an approximation” below."
        />
      </Section>

      {/* ── 4. Coated vs uncoated ─────────────────────────────────────────── */}
      <Section id="coated-vs-uncoated" accent={ACCENT} kicker="C vs U"
        heading="Coated vs Uncoated — Why the Same PMS Number Has Two Different HEX Codes">
        <P>
          A PMS number on its own is incomplete. Pantone 186 is not a colour; Pantone 186 C and Pantone
          186 U are. The suffix names the paper the ink was printed on when the swatch was made — C for
          coated stock, U for uncoated — and the same ink on those two papers is genuinely a different
          colour, so each gets its own published hex code.
        </P>
        <P>
          The mechanism is absorption. Coated stock carries a clay or polymer layer that keeps ink
          sitting on the surface, where the pigment stays dense and light bounces off a smooth face.
          Uncoated stock is open fibre: the vehicle soaks in, pigment particles spread and settle among
          the fibres, and the surface scatters light in every direction. The result is almost always the
          same two-part shift — lighter, because less light is being absorbed by a dense ink film, and
          duller, because scattering washes out saturation.
        </P>
        <P>
          Across all {cuHistogram.n.toLocaleString('en-GB')} PMS numbers that exist in both decks, the
          median coated-to-uncoated difference is ΔE2000 {cuHistogram.median} and the mean is{' '}
          {cuHistogram.mean}. Only {cuHistogram.under2} pairs — {Math.round((cuHistogram.under2 / cuHistogram.n) * 100)}%
          — come in under ΔE 2, the threshold the printing trade treats as a commercial match. At the
          other end, {cuHistogram.over10} pairs differ by ΔE 10 or more. The widest gap in the deck is{' '}
          {cuHistogram.widest[0].code}, at ΔE {cuHistogram.widest[0].deltaE}: a deep violet that
          publishes as <code style={mono}>{cuHistogram.widest[0].coatedHex}</code> coated and{' '}
          <code style={mono}>{cuHistogram.widest[0].uncoatedHex}</code> uncoated.
        </P>
        <Callout tone="warn" title="The practical rule">
          Convert the variant your brand sheet names, not the number. If the sheet says “PMS 485 U” and
          you look up 485 C because it was the first hit, you have shipped a red that is{' '}
          ΔE {stats.coatedUncoated.find((r) => r.code === 'PMS 485').deltaE} away from the one the brand
          owns. If the sheet names only a bare number with no suffix, ask — do not assume coated.
        </Callout>
        <CoatedUncoatedTable />
        <P style={{ marginTop: '0.9rem' }}>
          Working the other way — you have a hex code and need to know which uncoated PMS number it
          belongs to — is a nearest-match problem rather than a lookup. The{' '}
          <A href="/hex-to-pantone/">HEX to Pantone converter</A> searches the coated and uncoated decks
          separately for exactly that reason, and there is a longer walkthrough in{' '}
          <A href="/learn/coated-vs-uncoated/">our coated vs uncoated guide</A>.
        </P>
      </Section>

      {/* ── 5. Approximation ──────────────────────────────────────────────── */}
      <Section id="approximation" accent={ACCENT} kicker="Accuracy"
        heading="Why Pantone → HEX Is Always an Approximation">
        <P>
          A hex code describes a mix of three light emitters inside the sRGB gamut. A Pantone colour
          describes a jar of pre-mixed pigment. The conversion is a translation between two things that
          are not the same kind of thing at all, and it fails in four specific ways worth knowing about.
        </P>
        <H3>1. Some inks are more saturated than sRGB can display</H3>
        <P>
          When a colour cannot be represented, the conversion clips it to the nearest value the gamut can
          hold, and the giveaway is a channel pinned at 0 or 255. In the coated deck,{' '}
          <strong>{srgbClipping.clipped} of {srgbClipping.total} colours — {srgbClipping.pct}%</strong> —
          have at least one channel sitting on that wall, and {srgbClipping.byChannelCount[1].count} have
          two. Pantone Reflex Blue C is <code style={mono}>{hex('PMS Reflex Blue C')}</code>: the red
          channel is at zero, which means the real ink is bluer than that hex code and sRGB simply ran
          out of room. Pantone Orange 021 C, <code style={mono}>{hex('PMS Orange 021 C')}</code>, is the
          same story at the other end.
        </P>
        <H3>2. Metallics and neons have no honest equivalent</H3>
        <P>
          Pantone 877 C is silver ink; it converts to <code style={mono}>{hex('PMS 877 C')}</code>, a flat
          grey. Pantone 871 C is gold; it converts to <code style={mono}>{hex('PMS 871 C')}</code>, a flat
          olive-brown. Pantone 8003 C is <code style={mono}>{hex('PMS 8003 C Metallic')}</code>. All three
          are wrong in the same way: metallic inks contain aluminium or bronze flake and reflect light
          directionally, so the colour changes as the sheet tilts. A pixel has one value from every
          angle. Fluorescents such as Pantone 811 C, <code style={mono}>{hex('PMS 811 C')}</code>, fail
          differently — the ink re-emits ultraviolet as visible light and is literally brighter than the
          paper it sits on, which a screen cannot imitate at all.
        </P>
        <H3>3. Published sRGB values and computed ones disagree</H3>
        <P>
          Pantone publishes its own screen values for each ink. Converting the same ink’s measured Lab
          through a colour-managed sRGB transform gives a slightly different answer, and changing the
          rendering intent from relative colorimetric to perceptual changes it again. Nobody is wrong;
          they are answering slightly different questions. This is why the same PMS number produces
          different hex codes on different sites, usually differing by a few units per channel. Pick one
          source and use it across the whole brand rather than mixing.
        </P>
        <H3>4. Viewing conditions are part of the measurement</H3>
        <P>
          A printed swatch has no colour without a light source. Graphic-arts measurement is normally
          specified at D50 with an M0, M1 or M2 illumination mode — M1 includes the UV component and is
          what you need for paper with optical brighteners, M2 excludes it. Screens are characterised at
          D65. So the number you are comparing against was captured under a different white point than
          the one your monitor renders, before anyone even mentions the office lighting you are holding
          the swatch under.
        </P>
      </Section>

      {/* ── 6. Chart ──────────────────────────────────────────────────────── */}
      <Section id="cu-distribution" accent={ACCENT} kicker="From the dataset"
        heading="How Far Apart Coated and Uncoated Really Are">
        <P>
          Every PMS number in the Solid deck exists twice, and the two hex codes are rarely close. This
          chart puts all {cuHistogram.n.toLocaleString('en-GB')} coated-to-uncoated pairs into CIEDE2000
          buckets so you can see the shape of the problem rather than take it on trust.
        </P>
        <ChartFigure
          caption={`CIEDE2000 difference between the coated and uncoated printing of each of the ${cuHistogram.n.toLocaleString('en-GB')} PMS numbers present in both decks. Computed from data/pantone.json by scripts/build-color-stats.mjs.`}
          takeaway={
            <>
              <P>
                <strong>The takeaway: the C and U printings of a PMS number are usually not the same
                colour.</strong> Only {cuHistogram.under2} pairs ({Math.round((cuHistogram.under2 / cuHistogram.n) * 100)}%)
                fall under ΔE 2, the point below which most people cannot tell two colours apart side by
                side. {cuHistogram.buckets[4].count} pairs land between ΔE 5 and 10, and{' '}
                {cuHistogram.buckets[5].count} — {cuHistogram.buckets[5].pct}% of the deck — exceed ΔE 10,
                which reads as a different colour to anyone looking. The median is ΔE {cuHistogram.median}
                and the extreme is {cuHistogram.widest[0].code} at ΔE {cuHistogram.widest[0].deltaE}.
              </P>
              <P>
                Two consequences follow. First, a brand sheet that lists one hex code for a PMS number
                without saying whether it means C or U has left out information you cannot recover.
                Second, deep and highly saturated colours dominate the right-hand buckets: the more ink
                density a colour depends on, the more it loses when the paper drinks it.
              </P>
            </>
          }
        >
          <DistributionChart
            id="cu-histogram"
            title="Coated to uncoated colour difference across the Pantone Solid deck"
            desc={`Horizontal bar chart of ${cuHistogram.n} PMS numbers grouped by the CIEDE2000 difference between their coated and uncoated printings. Under 1: ${cuHistogram.buckets[0].count}. 1 to 2: ${cuHistogram.buckets[1].count}. 2 to 3: ${cuHistogram.buckets[2].count}. 3 to 5: ${cuHistogram.buckets[3].count}. 5 to 10: ${cuHistogram.buckets[4].count}. 10 and over: ${cuHistogram.buckets[5].count}, the largest group.`}
            buckets={cuHistogram.buckets}
            unitLabel="PMS numbers"
          />
        </ChartFigure>
      </Section>

      {/* ── 7. How-to ─────────────────────────────────────────────────────── */}
      <Section id="how-to" accent={ACCENT} kicker="Step by step"
        heading="How to Convert Pantone to HEX in Illustrator, Photoshop, Figma and InDesign">
        <P>
          The tool at the top of this page is faster than any of these, but you will sometimes need the
          value out of a file you have been handed rather than out of a number someone told you. Here is
          where each application keeps it.
        </P>
        {HOW_TO.map((section) => (
          <div key={section.id}>
            <H3 id={section.id}>{section.heading}</H3>
            <P>{section.intro}</P>
            <Steps items={section.steps} />
          </div>
        ))}
        <Callout tone="info" title="One thing that catches everyone out">
          Photoshop and Illustrator both report the hex code for the document’s current working space. If
          the file is tagged Adobe RGB or ProPhoto rather than sRGB, the six digits you copy will not be
          the ones a browser renders. Check Edit then Convert to Profile, and convert to sRGB IEC61966-2.1
          before reading any hex value that is going on the web.
        </Callout>
      </Section>

      {/* ── 8. When not to use HEX ────────────────────────────────────────── */}
      <Section id="when-not-to-use" accent={ACCENT} kicker="Limits"
        heading="When You Should NOT Use the HEX Value">
        <P>
          A hex code is the right answer for anything rendered by a display and the wrong answer for
          almost everything else. Three cases in particular go wrong regularly.
        </P>
        <Bullets
          items={[
            <>
              <strong>Anything going on a press.</strong> Handing a printer a hex code makes them guess at
              an ink. If the job runs spot, give them the PMS number. If it runs four-colour, give them a
              process build — the <A href="/pantone-to-cmyk/">Pantone to CMYK converter</A> produces one,
              and explains where the conversion loses colour.
            </>,
            <>
              <strong>Brand-guideline compliance.</strong> Auditing a partner’s artwork against a hex code
              tells you what their screen did, not what their ink was. Measure against the PMS number and
              compare in a device-independent space — <A href="/pantone-to-lab/">Pantone to LAB</A> gives
              you the coordinates and <A href="/compare/">the colour comparison tool</A> gives you the ΔE
              between any two.
            </>,
            <>
              <strong>Physical materials.</strong> Embroidery thread, cut vinyl, heat-transfer film and
              paint are all fixed catalogues of real pigments; the useful question is which stocked item
              is closest, not what the hex code is. Use{' '}
              <A href="/pantone-to-dmc/">Pantone to DMC</A> for floss,{' '}
              <A href="/pantone-to-oracal/">Pantone to ORACAL 651</A> for vinyl,{' '}
              <A href="/pantone-to-siser-htv/">Pantone to Siser HTV</A> for garment film, and{' '}
              <A href="/pantone-to-ral/">Pantone to RAL</A> for coatings.
            </>,
          ]}
        />
        <P>
          A useful habit for brand documents: publish the PMS number as the master, then the hex code
          labelled “digital only” and the CMYK build labelled “process print only”, with the coated or
          uncoated variant spelled out. That one line of labelling prevents most of the colour
          arguments that reach a print buyer.
        </P>
      </Section>

      {/* ── 9. FAQ ────────────────────────────────────────────────────────── */}
      <div className="card" style={{ borderTop: `3px solid ${ACCENT}` }}>
        <FAQSection suppressSchema items={FAQ} id="faq" />
      </div>

      {/* ── 10. Related ───────────────────────────────────────────────────── */}
      <RelatedLinks
        id="related"
        accent={ACCENT}
        heading="Where to Go From a HEX Code"
        intro="Chosen for what a hex code is usually the first step towards, rather than a list of everything on the site."
        links={[
          { href: '/hex-to-pantone/', label: 'HEX to Pantone', why: 'The reverse lookup — paste a hex code and get ranked PMS candidates with the difference score for each.' },
          { href: '/pantone-to-rgb/', label: 'Pantone to RGB', why: 'The same values as channel numbers, for tools that will not take a hex string.' },
          { href: '/pantone-to-lab/', label: 'Pantone to LAB', why: 'Device-independent coordinates, for when you need to measure rather than display.' },
          { href: '/pantone-black/', label: 'Every Pantone black compared', why: 'Black C, Black 2 through 7 and Neutral Black side by side, with the hex code for each.' },
          { href: '/pantone-blue/', label: 'Pantone blue shades', why: 'Reflex Blue, Blue 072, Process Blue and the 280s, with the hex value of each.' },
          { href: '/pantone-gold/', label: 'Pantone gold and metallics', why: '871, 872, 873 and the 8000 series, and what their hex codes do and do not tell you.' },
          { href: '/pantone-finder/', label: 'Pantone Finder', why: `Browse or search all ${counts.total.toLocaleString('en-GB')} colours when you do not have a number to start from.` },
          { href: '/compare/', label: 'Compare two colours', why: 'Put a hex code next to a PMS colour and get the ΔE2000 between them.' },
        ]}
      />

      {/* ── 11. Methodology ───────────────────────────────────────────────── */}
      <Section id="methodology" accent={ACCENT} kicker="Methodology"
        heading="Where These Numbers Come From">
        <P>
          Every HEX and RGB value on this page is read from this site’s Pantone dataset, which holds{' '}
          {counts.total.toLocaleString('en-GB')} colours across the coated, uncoated, metallic,
          pastel-and-neon, Colour of the Year and skin-tone libraries. No value is entered by hand and no
          row appears for a colour the dataset does not contain.
        </P>
        <P>
          Derived figures are computed at build time by{' '}
          <code style={mono}>scripts/build-color-stats.mjs</code> and written to a JSON file the page
          imports, so they can be reproduced by re-running the script. Colour differences use{' '}
          <strong>CIEDE2000</strong> as formulated by Sharma, Wu and Dalal (2005) with kL = kC = kH = 1,
          computed on Lab values converted from sRGB through CIE XYZ under the D65 illuminant and the
          2° standard observer. Contrast ratios follow the WCAG 2.2
          relative-luminance definition. The nearest-CSS-colour column is ranked by CIEDE2000 against the
          148 keywords defined in CSS Color Module Level 4.
        </P>
        <P>
          One honest limitation: this dataset carries published sRGB values, not spectrophotometer
          readings of printed ink. That is enough to give you the right hex code, and not enough to
          predict what a specific press on a specific stock will produce. For a job where that matters,
          proof it and measure the proof.
        </P>
        <P style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280' }}>
          The HEX, RGB, contrast and ΔE figures above were last recomputed from the dataset on{' '}
          <time dateTime={MODIFIED}>{MODIFIED}</time>. This converter has been online since{' '}
          <time dateTime={PUBLISHED}>{PUBLISHED}</time>.
        </P>
      </Section>
    </PantoneToXPage>
  );
}
