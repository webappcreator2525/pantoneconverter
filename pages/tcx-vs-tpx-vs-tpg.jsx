import { BookOpen } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import tcx from '../data/tcx.json';
import { HEX_FORMULA } from '../lib/colorFormulas';
import { relatedFor, TEXTILE_EVERGREEN } from '../lib/converterLinks';

const FORMAT_ANATOMY = {
  h2: 'What the suffix actually tells you',
  intro: 'The six digits identify the colour. The suffix identifies the physical object you are being asked to match — and that is the part people get wrong.',
  left: {
    label: 'The number — identical across all three formats',
    parts: [
      { text: '19', note: 'Lightness band, from 11 at the lightest to 19 at the deepest.' },
      { text: '4052', note: 'Hue family and chroma. The 40xx range sits in the blues.' },
    ],
    summary: '19-4052 is Classic Blue whether it arrives as TCX, TPX or TPG. The colour identity does not change with the format.',
  },
  right: {
    label: 'The suffix — the material it is supplied on',
    parts: [
      { text: 'TCX', note: 'Textile Cotton eXtended. A swatch of dyed cotton. Current, and the format dye houses match against.' },
      { text: 'TPG', note: 'Textile Paper Green. Printed on paper with an environmentally improved ink set. Current — this replaced TPX.' },
      { text: 'TPX', note: 'Textile Paper eXtended. The earlier paper format, discontinued in 2019 and superseded by TPG.' },
    ],
    summary: 'Same colour, three substrates. Ask which one your supplier holds before you write a code onto a tech pack.',
  },
  note: 'The common mistake is treating the suffix as decoration and dropping it. "19-4052" alone does not tell a supplier whether to match cotton or paper, and the two do not look identical side by side.',
};

export default function TcxVsTpxVsTpgPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/tcx-vs-tpx-vs-tpg/"
      pageTitle="TCX vs TPX vs TPG | Pantone Textile Colour Formats Guide"
      metaDescription="TCX, TPX and TPG explained: cotton versus paper, which Pantone textile format is current, why TPX was discontinued, and which one to put on your tech pack."
      h1="TCX vs TPX vs TPG: Pantone Textile Formats Explained"
      breadcrumbLabel="TCX vs TPX vs TPG"
      heroLead="Three suffixes, one numbering system, and a lot of confusion. This guide explains what each Pantone textile format is, which are current, and which one belongs on your tech pack — with a TCX lookup tool if you just need a colour's values."
      icon={<BookOpen size={20} color="#0e7490" />}
      iconBg="#ecfeff"
      accentColor="#0e7490"

      appName="Pantone Textile Format Guide and TCX Lookup"
      appDescription="Reference guide to the Pantone TCX, TPX and TPG textile colour formats, with a lookup tool for TCX colour values."
      featureList={[
        'Plain explanation of TCX, TPX and TPG',
        'Which formats are current and which are discontinued',
        'Side-by-side comparison of substrate, use and audience',
        'TCX colour lookup with HEX, RGB, CMYK and CIELAB values',
        'Guidance on which format to specify on a tech pack',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="palette-to-formula"
      palette={tcx}
      formula={HEX_FORMULA}
      systemLabel="Pantone TCX"
      sourceLabel="TCX"
      targetLabel="HEX"
      searchLabel="Look up a Pantone TCX colour"
      searchPlaceholder="e.g. 19-4052, Classic Blue, Very Peri…"
      searchHint="This page is mostly a guide — the lookup is here so you can check a colour's values while you read."
      presets={[
        'PANTONE 19-4052 TCX',
        'PANTONE 17-3938 TCX',
        'PANTONE 18-1750 TCX',
        'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX',
        'PANTONE 11-4201 TCX',
      ]}
      exampleCodes={[
        'PANTONE 19-4052 TCX', 'PANTONE 17-3938 TCX', 'PANTONE 18-1750 TCX',
        'PANTONE 13-1023 TCX', 'PANTONE 17-1230 TCX', 'PANTONE 11-4201 TCX',
      ]}

      aboutH2="What are TCX, TPX and TPG?"
      aboutParagraphs={[
        'All three belong to Pantone Fashion, Home + Interiors — the colour library for apparel, home textiles and interiors, and a completely separate product from the PMS numbers used in graphic design and printing. Within FHI, the six-digit number identifies the colour and the letter suffix identifies the physical material the colour is supplied on. The number never changes between formats; the substrate does.',
        'TCX stands for Textile Cotton eXtended. The colour is supplied as a swatch of dyed cotton fabric, and it is the format dye houses and mills work against, because you cannot reliably judge a lab dip against a printed chip. It is the current standard for anything that will be dyed, and the format most tech packs should specify.',
        'TPX stood for Textile Paper eXtended — the same colours printed on paper, offered for situations where a fabric swatch was impractical or too expensive. Pantone discontinued TPX in 2019. TPG, Textile Paper Green, replaced it: the same paper-based idea, reformulated with an environmentally improved ink set. Because the ink set changed, some TPG chips are a visible step away from the TPX chip carrying the same number, which is why old TPX references circulating in archived tech packs cause real problems.',
        'The practical rule is simple. Specify TCX when the colour will be dyed onto fabric. Use TPG when you need an affordable paper reference for design, presentation or a printed application. Treat any TPX reference you inherit as a legacy code to be re-approved against a current TCX or TPG standard rather than trusted as-is.',
      ]}

      comparisonRows={[
        ['Full name', 'Textile Cotton eXtended (TCX)', 'Textile Paper eXtended (TPX) → Textile Paper Green (TPG)'],
        ['Substrate', 'Dyed cotton fabric swatch', 'Printed paper chip'],
        ['Status', 'Current', 'TPX discontinued in 2019; TPG is the current paper format'],
        ['Primary use', 'Dyeing, lab dips, bulk production approval', 'Design, presentation, printed applications, budget reference'],
        ['Who works from it', 'Mills, dye houses, garment manufacturers', 'Designers, studios, buyers, anyone specifying on paper'],
        ['Relative cost', 'Higher — physical dyed fabric', 'Lower — printed chips'],
        ['Colour identity', 'Same six-digit number as the paper formats', 'Same six-digit number as TCX'],
        ['Do they look identical?', 'No — cotton scatters light differently from paper', 'No — and TPG differs slightly from the TPX it replaced'],
      ]}

      codeAnatomy={FORMAT_ANATOMY}

      useCasesIntro="Knowing which format to name saves a sampling round, and knowing which are current stops you specifying something nobody sells any more."
      useCases={[
        { title: 'Writing a garment tech pack', body: 'Specify TCX. The mill lab-dips against dyed cotton, and a paper reference gives them a substrate they cannot judge a dye against.' },
        { title: 'Inheriting an old tech pack', body: 'A TPX code means the pack predates 2019. Re-approve the colour against a current TCX or TPG standard rather than assuming the reference still holds.' },
        { title: 'Building a seasonal palette on a budget', body: 'TPG chips cost a fraction of cotton swatches and are fine for internal design and presentation work — just not for production sign-off.' },
        { title: 'Home textiles and upholstery', body: 'Fabric goods are dyed, so TCX applies exactly as it does to apparel. The format question is the same regardless of end product.' },
        { title: 'Printed textile applications', body: 'Where a design is printed onto fabric rather than dyed, TPG is often the more relevant reference because both are printed processes.' },
        { title: 'Briefing a supplier in a new market', body: 'Ask which format they hold before specifying. A supplier without TCX swatches will convert your code themselves, and that conversion is out of your control.' },
      ]}

      howToIntro="Say you have picked up a tech pack from a previous season that specifies “19-4052 TPX” and you need to reorder. TPX was discontinued in 2019, so do not simply pass it on: look the colour up here to check what you are dealing with, then re-approve it as 19-4052 TCX against a current physical cotton swatch before the mill starts dyeing."
      howToSteps={[
        'Identify which format the code you are holding uses — the suffix after the six digits.',
        'If it says TPX, treat it as legacy. The format was discontinued in 2019 and the paper replacement, TPG, uses a different ink set.',
        'Decide what the colour is actually for. Dyed onto fabric means TCX; design reference, presentation or a printed application means TPG.',
        'Ask your supplier which format they physically hold before you write the code onto a pack.',
        'Write the code in full, including the suffix. "19-4052" alone leaves the substrate ambiguous.',
        'Use the lookup above to check a colour’s screen values while you work — but approve production against the physical swatch, not the HEX.',
      ]}

      accuracyNote="This page is a guide to formats rather than a production tool, and the values in the lookup carry the same caveat as everywhere on this site: they are sRGB approximations of physical Pantone standards, covering 213 of roughly 2,625 FHI colours. No screen value can stand in for a dyed cotton swatch or a printed chip. The format guidance here reflects Pantone's published product structure, but check the current Pantone catalogue before making a purchasing decision — product lines change."
      deltaENote="No ΔE is reported on this page, because the lookup performs an exact arithmetic conversion rather than a nearest-neighbour match. Where ΔE does matter in textile work is between a lab dip and its standard: agree that tolerance with your supplier in writing before sampling, measured on the physical fabric with a spectrophotometer. A ΔE*00 under 1 is a tight commercial tolerance; 1–2 is a common working range for apparel."

      trademark={{
        system: 'PANTONE',
        owner: 'Pantone LLC',
        extra: 'Pantone Fashion, Home + Interiors®, TCX, TPX and TPG are Pantone LLC products. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical standards.',
      }}

      faqs={[
        {
          q: 'What is the difference between TCX and TPG?',
          a: 'The substrate, not the colour. Both use the same six-digit numbering, so 19-4052 is Classic Blue in either. TCX supplies that colour as a swatch of dyed cotton fabric; TPG supplies it as a printed paper chip. TCX is what a dye house matches a lab dip against; TPG is a cheaper reference for design and presentation work. They will not look perfectly identical side by side, because cotton and paper reflect light differently.',
        },
        {
          q: 'Is TPX still available?',
          a: 'No. Pantone discontinued the TPX format in 2019 and replaced it with TPG, which prints the same colours using an environmentally improved ink set. Because the ink changed, some TPG chips sit a visible step away from the TPX chip carrying the same number. If you inherit a TPX reference on an old tech pack, treat it as a legacy code and re-approve the colour against a current standard rather than assuming it still holds.',
        },
        {
          q: 'Which format should I put on my tech pack?',
          a: 'TCX for anything that will be dyed onto fabric, which covers most apparel and home textile work — it is the format mills and dye houses match against. TPG where you need an affordable paper reference for design, presentation or a printed application. Whichever you choose, write the suffix out in full, because the number alone does not tell the supplier which physical object to match.',
        },
        {
          q: 'Are TCX codes the same as the Pantone codes used in printing?',
          a: 'No. Printing uses the Pantone Matching System, where codes look like "186 C" and refer to pre-mixed inks on paper. TCX, TPX and TPG all belong to Fashion, Home + Interiors, a separate library built for textiles. A PMS number and an FHI number are never interchangeable, even when they name a similar colour — see the Pantone C to TCX converter for the cross-library comparison.',
        },
        {
          q: 'Why is the cotton version more expensive than the paper version?',
          a: 'Because it is a manufactured textile product rather than a printed one. Each TCX swatch is cotton dyed to a controlled tolerance, which is a materially more expensive process than printing a chip. You are paying for the substrate that makes the standard usable in a dye house — which is exactly why the cheaper paper version is not a substitute for production sign-off.',
        },
        {
          q: 'Do I need both TCX and TPG?',
          a: 'Many studios keep both, and for a good reason. TPG chip sets are cheap enough to hand out to a whole design team for palette work and presentations. The TCX cotton swatches then live with whoever manages production and travel with the tech packs, because they are what the mill and the quality team actually approve against. Using the cheap format for design and the accurate format for production is a sensible split.',
        },
      ]}

      relatedLinks={relatedFor('/tcx-vs-tpx-vs-tpg/', [
        '/pantone-c-to-tcx/',
        '/hex-to-tcx/',
        '/tcx-to-hex/',
        '/pantone-textile-to-cmyk/',
      ], TEXTILE_EVERGREEN)}
    />
  );
}
