import { Ruler } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import tcx from '../data/tcx.json';
import { HEX_FORMULA } from '../lib/colorFormulas';
import { relatedFor, TEXTILE_EVERGREEN } from '../lib/converterLinks';

const PMS_VS_TCX = {
  h2: 'PMS vs TCX: why the code looks different',
  intro: 'Both are Pantone, and that is exactly why they get confused. They are separate libraries built for separate industries, and you can tell them apart from the code alone — one carries meaning, the other does not.',
  left: {
    label: 'PMS — the graphic arts library',
    parts: [
      { text: '186', note: 'A catalogue index. It encodes nothing about the colour — 186 tells you neither how light nor how red it is.' },
      { text: 'C', note: 'The deck: C for coated paper, U for uncoated. The ink is the same; the paper changes how it looks.' },
    ],
    summary: 'Specified on a printed swatch of ink on paper. Used by graphic designers, printers and brand managers.',
  },
  right: {
    label: 'TCX — the Fashion, Home + Interiors library',
    parts: [
      { text: '19', note: 'Lightness band, from 11 at the lightest to 19 at the deepest. You know this is a dark colour before you look it up.' },
      { text: '4052', note: 'Hue family and chroma — 40xx places it in the blues. This is what makes TCX codes readable and sortable.' },
      { text: 'TCX', note: 'The format suffix: a dyed cotton swatch. TPG is the printed paper equivalent of the same colour.' },
    ],
    summary: 'Specified on a swatch of dyed cotton. Used by fashion designers, mills, dye houses and interior specifiers.',
  },
  note: 'The practical consequence: a PMS number and a TCX number are never interchangeable, even when they name a similar colour. Sending "Pantone 186 C" to a dye house is asking for a printing ink, and they will have to guess.',
};

export default function TcxToHexPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/tcx-to-hex/"
      pageTitle="TCX to HEX Converter | Pantone Fashion Colour to RGB Code"
      metaDescription="Convert any Pantone TCX fashion colour to HEX and RGB values instantly. Free tool for turning textile colour codes into screen values for design and ecommerce."
      h1="TCX to HEX Converter"
      breadcrumbLabel="TCX to HEX"
      heroLead="Search any Pantone TCX code — the Fashion, Home + Interiors library — and get its HEX and RGB values for screen work. This is a different Pantone library from the PMS codes used in print, and the codes are not interchangeable."
      icon={<Ruler size={20} color="#db2777" />}
      iconBg="#fdf2f8"
      accentColor="#db2777"

      appName="TCX to HEX Converter"
      appDescription="Free browser-based tool that converts Pantone Fashion, Home + Interiors (TCX) textile colours to HEX and RGB values for digital design."
      featureList={[
        'HEX and RGB values for any Pantone TCX colour',
        'Search by TCX code or by colour name',
        'CMYK, CIELAB and HSV values shown alongside',
        'Every Pantone Color of the Year included',
        'One-click copy for every value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="palette-to-formula"
      palette={tcx}
      formula={HEX_FORMULA}
      systemLabel="Pantone TCX"
      sourceLabel="TCX"
      targetLabel="HEX"
      searchLabel="Search a Pantone TCX colour by code or name"
      searchPlaceholder="e.g. 19-4052, Classic Blue, Peach Fuzz…"
      searchHint="Names work as well as codes — “Viva Magenta” and “18-1750” find the same colour."
      presets={[
        'PANTONE 19-4052 TCX',
        'PANTONE 18-1750 TCX',
        'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX',
        'PANTONE 17-5104 TCX',
        'PANTONE 15-0343 TCX',
        'PANTONE 19-0303 TCX',
      ]}
      exampleCodes={[
        'PANTONE 19-4052 TCX', 'PANTONE 18-1750 TCX', 'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX', 'PANTONE 17-5104 TCX', 'PANTONE 15-0343 TCX',
      ]}

      aboutH2="What is Pantone TCX?"
      aboutParagraphs={[
        'TCX is Pantone’s colour library for fashion, home and interiors — a completely separate system from the PMS numbers used in graphic design and printing. Where PMS specifies pre-mixed printing inks on paper, TCX specifies colour on dyed cotton. The letters stand for Textile Cotton eXtended, and each colour is supplied as a physical swatch of cotton fabric rather than a printed chip.',
        'That difference is not cosmetic. A dye house cannot work from a printed ink chip: dye behaves differently from ink, cotton has a nap and a weave that scatter light in ways paper does not, and a colour approved on paper will not reliably reproduce on fabric. Pantone built a separate library, on the right substrate, for exactly this reason. The library runs to roughly 2,625 colours and is the reference for apparel, home textiles and interiors worldwide.',
        'The six-digit code is genuinely readable, which is the clearest structural difference from PMS. The first two digits are a lightness band running from 11 at the lightest to 19 at the deepest; the next four place the colour by hue family and chroma. So 19-4052 is a deep blue and 13-1023 is a light warm tone before you have seen either of them. A PMS number such as 186 C encodes nothing at all — it is purely a catalogue position.',
        'Converting TCX to HEX is the step from a physical textile standard into digital work: product photography retouching, ecommerce swatch chips, lookbooks, brand decks and design software. The HEX value is an approximation of a dyed cotton colour on a backlit screen, which is useful for design and useless for approving production — that distinction matters more here than on almost any other converter.',
      ]}

      comparisonRows={[
        ['Full name', 'Pantone Matching System (PMS)', 'Fashion, Home + Interiors (FHI), TCX format'],
        ['Physical form', 'Pre-mixed printing ink on coated or uncoated paper', 'Dyed cotton fabric swatch'],
        ['Code format', 'A number plus a deck letter — 186 C', 'Six digits plus a format suffix — 19-4052 TCX'],
        ['Does the code mean anything?', 'No — it is a catalogue index only', 'Yes — lightness band, then hue family and chroma'],
        ['Library size', '1,341 coated colours, over 3,200 in total', 'Around 2,625 colours'],
        ['Who uses it', 'Graphic designers, printers, brand managers', 'Fashion designers, mills, dye houses, interior specifiers'],
        ['Bought as', 'A fan deck or Formula Guide', 'Cotton swatch cards, chip sets and the TCX cotton passport'],
        ['Interchangeable?', 'No — a PMS number is not a TCX number', 'No — a TCX number is not a PMS number'],
      ]}

      codeAnatomy={PMS_VS_TCX}

      useCasesIntro="Converting TCX to HEX is the bridge from a physical textile standard to anything that happens on a screen."
      useCases={[
        { title: 'Ecommerce colour swatches', body: 'Product pages need a HEX chip for every colourway. The tech pack holds TCX codes, so the conversion happens on every new season’s upload.' },
        { title: 'Lookbooks and brand decks', body: 'Presenting a season’s palette in InDesign or Figma means turning the mill’s TCX references into values the software understands.' },
        { title: 'Product photography retouching', body: 'Retouchers correcting garment colour need a target value on screen, derived from the approved TCX standard.' },
        { title: 'Design system and web palettes', body: 'A fashion brand extending its identity onto a website needs its textile colours expressed as HEX for CSS.' },
        { title: 'Sharing a palette with non-textile suppliers', body: 'Packaging, print and digital partners do not hold TCX references, so HEX and RGB become the common language.' },
        { title: 'Trend and moodboard work', body: 'Building a digital moodboard from Pantone’s seasonal fashion reports means converting the published TCX list into screen colours.' },
      ]}

      howToIntro="Say your mill has approved a season’s navy as Pantone 19-4052 TCX and you now need a swatch chip for the ecommerce product page. Search 19-4052, copy the HEX value, and use it for the on-site chip — but keep approving the actual garment against the physical cotton swatch, because a backlit screen and a dyed fabric never agree completely."
      howToSteps={[
        'Type a TCX code or colour name into the search box — “19-4052” and “Classic Blue” both work.',
        'Select the colour from the suggestions to load it.',
        'Read the HEX value, with the RGB channels broken out beneath it.',
        'Copy HEX for CSS and design tools, or take the CMYK, LAB or HSV values shown below for other workflows.',
        'Use the HEX for digital work only. Production colour approval stays with the physical TCX cotton swatch — a screen cannot substitute for it.',
        'If you need a printing ink rather than a screen value, use the standard PMS converters instead; they are a different Pantone library.',
      ]}

      accuracyNote="A TCX colour is dyed cotton, and this page gives you an sRGB approximation of it. Two separate limits apply. First, no screen value can represent a textile: fabric has a nap, a weave and a directional sheen, and the same dye reads differently on poplin, jersey and canvas. Second, the values here are curated public approximations rather than Pantone’s own measurements, covering 213 of roughly 2,625 TCX colours. Use them for design and digital work; approve production against the physical cotton swatch."
      deltaENote="No ΔE is shown on this page because nothing is being approximated by the tool itself — converting an sRGB value to HEX is exact arithmetic. The approximation sits one step earlier, in the sRGB value used to stand in for the dyed cotton. For measurement work, a spectrophotometer reading of the actual fabric and a CIELAB comparison is the only defensible method."

      trademark={{
        system: 'PANTONE',
        owner: 'Pantone LLC',
        extra: 'Pantone Fashion, Home + Interiors® and TCX are Pantone LLC products. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical cotton standards.',
      }}

      faqs={[
        {
          q: 'What does TCX stand for?',
          a: 'Textile Cotton eXtended. It identifies the format of the physical standard: a swatch of dyed cotton fabric rather than a printed paper chip. The same Pantone Fashion, Home + Interiors colour also exists as TPG, which is the printed paper version of the identical colour. The suffix tells a supplier what physical form they are being asked to match.',
        },
        {
          q: 'Is TCX the same as the Pantone codes used in graphic design?',
          a: 'No, and this is the single most common confusion. Graphic design and printing use the Pantone Matching System — PMS — where codes look like "186 C". Fashion and interiors use Fashion, Home + Interiors, where codes look like "19-4052 TCX". They are separate libraries built on different substrates for different industries. A PMS number sent to a dye house is not usable, and a TCX number sent to a commercial printer is not either.',
        },
        {
          q: 'How do I read a TCX code?',
          a: 'Take 19-4052. The first two digits are a lightness band, running from 11 at the very lightest to 19 at the deepest, so 19 tells you this is a dark colour. The following four digits place it by hue family and chroma — the 40xx range sits in the blues. This readability is a real advantage over PMS, where 186 tells you nothing until you look it up.',
        },
        {
          q: 'Can I use a HEX value to approve production colour?',
          a: 'No. A HEX value describes light emitted by a screen; a garment reflects light off a dyed, textured surface. They can never be made to agree, and every monitor is calibrated differently anyway. Use the HEX for design, ecommerce and presentation work, and approve production against the physical cotton swatch or a spectrophotometer measurement of the actual fabric.',
        },
        {
          q: 'How many colours are in the Pantone TCX library?',
          a: 'Roughly 2,625 in the current Fashion, Home + Interiors system. This converter covers 213 of them — every Color of the Year plus the colours that recur across seasonal trend reporting — which is enough to look up the codes most people actually encounter, but not the full library. For anything outside that set, refer to a Pantone cotton passport or chip set.',
        },
        {
          q: 'Why does the same TCX colour look different on different fabrics?',
          a: 'Because the substrate changes how light behaves. A smooth poplin reflects more directly and reads brighter and more saturated; a brushed or knitted surface scatters light and reads softer and slightly darker. Pile fabrics change again depending on which way the nap is running. The TCX standard is defined on cotton, so any other fibre or construction will need its own approved lab dip.',
        },
      ]}

      relatedLinks={relatedFor('/tcx-to-hex/', [
        '/hex-to-tcx/',
        '/pantone-c-to-tcx/',
        '/tcx-vs-tpx-vs-tpg/',
        '/pantone-textile-to-cmyk/',
      ], TEXTILE_EVERGREEN)}
    />
  );
}
