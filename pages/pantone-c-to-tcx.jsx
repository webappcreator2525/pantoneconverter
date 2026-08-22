import { ArrowRightLeft } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import tcx from '../data/tcx.json';
import { relatedFor, TEXTILE_EVERGREEN } from '../lib/converterLinks';

const PMS_VS_TCX = {
  h2: 'Two Pantone libraries, two different codes',
  intro: 'This page exists because "Pantone" names two unrelated systems. Read the codes side by side and the difference is immediate: a PMS number is an index, a TCX number is a description.',
  left: {
    label: 'PMS 186 C — graphic arts',
    parts: [
      { text: '186', note: 'Catalogue position. Nothing about the number tells you the colour is red, or how dark it is.' },
      { text: 'C', note: 'The deck — C is coated paper, U is uncoated. Same ink, different surface.' },
    ],
    summary: 'A pre-mixed ink, printed on paper, made for presses. Owned by graphic design and print production.',
  },
  right: {
    label: 'TCX 19-1664 — fashion and interiors',
    parts: [
      { text: '19', note: 'Lightness band. 11 is the lightest in the library, 19 the deepest — so this is a dark colour.' },
      { text: '1664', note: 'Hue family and chroma. The 16xx range sits in the warm reds.' },
      { text: 'TCX', note: 'The physical format — a swatch of dyed cotton, which is what a dye house matches against.' },
    ],
    summary: 'A dye standard on fabric, made for mills. Owned by apparel, home textiles and interiors.',
  },
  note: 'Neither code can be substituted for the other. They describe different materials made by different processes, and Pantone maintains them as separate products with separate fan decks.',
};

export default function PantoneCToTcxPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-c-to-tcx/"
      pageTitle="Pantone C to TCX Converter | PMS to Fashion Colour Code"
      metaDescription="Convert a Pantone PMS coated colour to the closest Pantone TCX fashion code. Free ΔE-ranked tool for taking a graphic brand colour to a textile manufacturer."
      h1="Pantone C to TCX Converter"
      breadcrumbLabel="Pantone C to TCX"
      heroLead="Search a Pantone PMS coated colour and get the closest Pantone TCX codes, ranked by ΔE*00. These are two different Pantone libraries — PMS for print, TCX for textiles — and this page bridges them without pretending they are the same thing."
      icon={<ArrowRightLeft size={20} color="#6366f1" />}
      iconBg="#eef2ff"
      accentColor="#6366f1"

      appName="Pantone C to TCX Converter"
      appDescription="Free browser-based tool that finds the closest Pantone Fashion, Home + Interiors (TCX) textile colour for any Pantone PMS coated colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Pantone TCX codes for any PMS coated colour',
        'ΔE*00 colour difference and match quality for every result',
        'Side-by-side breakdown of how the two code systems differ',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every TCX code',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={tcx}
      systemLabel="Pantone TCX"
      sourceLabel="Pantone PMS"
      targetLabel="TCX"
      searchLabel="Search a Pantone PMS coated colour"
      searchPlaceholder="e.g. 186 C, 286, Cool Gray 9, Black 6…"
      searchHint="Enter the graphic-arts PMS number from your brand guidelines — the tool returns the fashion library equivalent."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone 485-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="Why does Pantone have two different code systems?"
      aboutParagraphs={[
        'Because ink and dye are not the same thing, and neither are paper and cloth. The Pantone Matching System — PMS — was created in 1963 for commercial printing: each number identifies a pre-mixed ink, supplied as a printed chip on coated or uncoated paper, that any press anywhere can reproduce. It solved a printing problem, and it is still the right tool for that job.',
        'Fashion, Home + Interiors is a separate Pantone product built for a different industry. Its colours are supplied as physical swatches of dyed cotton, because that is what a dye house needs to match against. Dye penetrates fibre where ink sits on a surface; cotton has a weave and a nap that scatter light in ways paper does not; and a colour signed off on a printed chip will not reliably come back the same from a bulk dyeing run. The library runs to roughly 2,625 colours in the TCX cotton format.',
        'The two code formats reflect that split. A PMS number such as 186 C is purely a catalogue index — the number tells you nothing about the colour. A TCX code such as 19-1664 is descriptive: 19 is the deepest lightness band, and 1664 places it in the warm reds. Once you know that rule, TCX codes become sortable and comparable in a way PMS numbers never are.',
        'What this page does is find the TCX colour that sits closest to a given PMS colour, and tell you honestly how close that is. What it cannot do is make them equivalent. If your brand guidelines specify a PMS colour and you are producing garments, the correct outcome is a TCX code added to those guidelines as a separate, approved textile standard — not a claim that the two numbers are the same colour.',
      ]}

      comparisonRows={[
        ['Full name', 'Pantone Matching System (PMS)', 'Pantone Fashion, Home + Interiors (FHI)'],
        ['Introduced', '1963, for commercial printing', 'For apparel, home textiles and interiors'],
        ['Physical form', 'Pre-mixed ink printed on paper', 'Dye on a cotton fabric swatch'],
        ['Code format', 'Number plus deck letter — 186 C', 'Six digits plus format suffix — 19-1664 TCX'],
        ['Code meaning', 'None — a catalogue index', 'Lightness band, then hue family and chroma'],
        ['Library size', '1,341 coated, over 3,200 in total', 'Around 2,625 colours'],
        ['Target industry', 'Print, packaging, graphic design, branding', 'Fashion, apparel, home textiles, interiors'],
        ['Bought as', 'Formula Guide fan deck', 'Cotton passport, chip sets, individual swatch cards'],
        ['Reproduced by', 'A printing press mixing ink to formula', 'A dye house matching a lab dip to the standard'],
      ]}

      codeAnatomy={PMS_VS_TCX}

      useCasesIntro="This conversion happens at the point where a brand built for print starts making physical product."
      useCases={[
        { title: 'Brand merchandise and uniforms', body: 'A company whose identity is defined in PMS needs a TCX reference before staff uniforms, caps or branded apparel can be manufactured.' },
        { title: 'Fashion brand extension', body: 'A label whose logo and packaging are specified in PMS has to add textile standards when it moves from print collateral into garments.' },
        { title: 'Matching garments to packaging', body: 'Where a product ships in printed packaging, the garment and the box have to read as one colour despite being different materials.' },
        { title: 'Adding a textile section to a brand book', body: 'Mature brand guidelines list PMS, CMYK, RGB and HEX. Adding an approved TCX standard is what makes the book usable by a garment supplier.' },
        { title: 'Sports kit and team apparel', body: 'Club colours are almost always documented in PMS. Kit manufacturers work in TCX, so every kit programme starts with this conversion.' },
        { title: 'Interiors and soft furnishings', body: 'An interior scheme coordinated with printed graphics or signage needs TCX references for upholstery, curtains and cushions.' },
      ]}

      howToIntro="Say your brand red is documented as Pantone 186 C and you are commissioning a run of branded polo shirts. Search 186, take the top TCX code, and add it to the brand guidelines as the approved textile standard — then send the physical cotton swatch to the manufacturer, because the factory will dye to fabric and sign off against fabric."
      howToSteps={[
        'Enter the PMS number from your brand guidelines and select the colour from the suggestions.',
        'Read the five closest Pantone TCX codes, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge: under 2 is a commercial match, 2–5 is visible side by side, above 5 means no TCX standard is genuinely close.',
        'Compare the top candidates using their codes — the lightness band immediately tells you which is the deeper of two near matches.',
        'Add the chosen TCX code to your brand guidelines as a separate approved textile standard. Do not replace the PMS number; you need both.',
        'Order the physical cotton swatch and send it with the order. A dye house matches against fabric, not against a number on a page.',
      ]}

      accuracyNote="This is a cross-library approximation and should be treated as one. PMS specifies ink on paper and TCX specifies dye on cotton — different colourants, different substrates, different gamuts — so a PMS colour and its nearest TCX neighbour are related, not identical. Pantone does not publish an official cross-reference between the two libraries. The TCX values matched against here are also curated public approximations covering 213 of roughly 2,625 colours, so a closer standard may exist outside this set."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Highly saturated PMS colours will match poorly for a real reason: spot inks reach a saturation that dye on cotton cannot, so an electric PMS orange or a fluorescent green has no dyed equivalent. Use the number to shortlist candidates, then approve against physical swatches under controlled lighting."

      trademark={{
        system: 'PANTONE',
        owner: 'Pantone LLC',
        extra: 'The Pantone Matching System® and Pantone Fashion, Home + Interiors® are separate Pantone LLC products. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of either library’s physical standards.',
      }}

      faqs={[
        {
          q: 'Is Pantone 186 C the same as a TCX colour?',
          a: 'No. Pantone 186 C is a printing ink in the graphic arts library; TCX codes are dye standards on cotton in the fashion library. They are separate Pantone products with separate fan decks, and Pantone does not publish an official conversion between them. This page finds the TCX colour that sits closest and reports the ΔE so you can see how close "closest" actually is.',
        },
        {
          q: 'Why does Pantone maintain two systems instead of one?',
          a: 'Because the industries need different things. Printing needs a pre-mixed ink specified on paper, with tolerances that make sense on a press. Textile manufacturing needs a dye standard on fabric, because dye behaves differently from ink and cloth reflects light differently from paper. A single library on a single substrate could not serve both without failing one of them.',
        },
        {
          q: 'Can I put a PMS number on a garment tech pack?',
          a: 'You can, but you should not expect it to work cleanly. A dye house has no PMS ink chips and no way to lab-dip against one, so at best they will convert it themselves — introducing an approximation you did not control and cannot audit — and at worst you will get a sample that does not match anything. Give them a TCX code and, ideally, the physical cotton swatch.',
        },
        {
          q: 'Should I replace my PMS brand colour with the TCX one?',
          a: 'No — keep both. They apply to different production processes. Your brand book should list the PMS number for print and packaging and the TCX code for textiles, alongside the CMYK, RGB and HEX values for process print and screen. Replacing one with the other means someone will eventually send the wrong reference to the wrong supplier.',
        },
        {
          q: 'What does the C in "Pantone 186 C" mean?',
          a: 'It identifies the deck the colour is shown on: C for coated paper, U for uncoated. The ink is the same in both; coated stock holds it on the surface so it reads more vivid, while uncoated absorbs it and reads softer and slightly darker. It is a paper distinction, not a colour formula distinction — and it has no relationship to the TCX and TPG suffixes in the fashion library.',
        },
        {
          q: 'Why do my brightest brand colours match TCX so poorly?',
          a: 'Because pre-mixed spot inks can be more saturated than dyed cotton. A vivid PMS orange or a bright process-defying green exists as ink because the pigment can be manufactured that way, but reaching the same intensity as dye on a cotton fibre is a different chemistry problem. A high ΔE here is a genuine manufacturing signal: the colour will need a speciality dye, a synthetic fibre, or a printed rather than dyed treatment.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-c-to-tcx/', [
        '/tcx-vs-tpx-vs-tpg/',
        '/tcx-to-hex/',
        '/hex-to-tcx/',
        '/pantone-textile-to-cmyk/',
      ], TEXTILE_EVERGREEN)}
    />
  );
}
