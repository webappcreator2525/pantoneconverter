import { Droplets } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import tcx from '../data/tcx.json';
import { CMYK_FORMULA } from '../lib/colorFormulas';
import { relatedFor, TEXTILE_EVERGREEN } from '../lib/converterLinks';

const PMS_VS_TCX = {
  h2: 'This is the textile Pantone library, not the print one',
  intro: 'Both systems produce a CMYK number, and they are not the same conversion. Check which code you are holding before you send anything to a printer.',
  left: {
    label: 'PMS 186 C → CMYK',
    parts: [
      { text: '186', note: 'Graphic arts catalogue index — a pre-mixed printing ink.' },
      { text: 'C', note: 'Coated paper deck.' },
    ],
    summary: 'Converting this gives you a process build for paper. Use the standard Pantone to CMYK converter for that job.',
  },
  right: {
    label: 'TCX 19-4052 → textile CMYK',
    parts: [
      { text: '19', note: 'Lightness band — 11 lightest to 19 deepest.' },
      { text: '4052', note: 'Hue family and chroma; 40xx is in the blues.' },
      { text: 'TCX', note: 'A dye standard on cotton — the reference a garment programme runs on.' },
    ],
    summary: 'Converting this gives you a starting build for sublimation or DTG, to be corrected against a printed strike-off on the real fabric.',
  },
  note: 'The number you get out looks the same in both cases. What differs is what it is for, and what you have to do to it before it is production-ready.',
};

export default function PantoneTextileToCmykPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-textile-to-cmyk/"
      pageTitle="Pantone Textile to CMYK | Sublimation & DTG Colour Builds"
      metaDescription="Convert Pantone TCX textile colours to CMYK starting values for dye sublimation and direct-to-garment printing. Free tool built for fabric print workflows."
      h1="Pantone Textile to CMYK Converter"
      breadcrumbLabel="Pantone Textile to CMYK"
      heroLead="Search a Pantone TCX fashion colour and get a CMYK starting build for digital textile printing — sublimation, direct-to-garment and pigment inkjet. This is the textile Pantone library, and the output is a starting point for a strike-off, not a finished profile."
      icon={<Droplets size={20} color="#ea580c" />}
      iconBg="#fff7ed"
      accentColor="#ea580c"

      appName="Pantone Textile to CMYK Converter"
      appDescription="Free browser-based tool that converts Pantone Fashion, Home + Interiors (TCX) textile colours into CMYK starting values for digital fabric printing."
      featureList={[
        'CMYK starting build for any Pantone TCX colour',
        'Cyan, magenta, yellow and key shown broken out',
        'HEX, RGB, CIELAB and HSV values alongside',
        'Built around digital textile printing workflows',
        'One-click copy for every value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="palette-to-formula"
      palette={tcx}
      formula={CMYK_FORMULA}
      systemLabel="Pantone TCX"
      sourceLabel="Pantone TCX"
      targetLabel="CMYK"
      searchLabel="Search a Pantone TCX textile colour"
      searchPlaceholder="e.g. 19-4052, Classic Blue, Viva Magenta…"
      searchHint="Searching the fashion library, not PMS — if your code looks like “186 C”, use the standard Pantone to CMYK converter instead."
      presets={[
        'PANTONE 19-4052 TCX',
        'PANTONE 18-1750 TCX',
        'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX',
        'PANTONE 15-0343 TCX',
        'PANTONE 19-0303 TCX',
        'PANTONE 11-4201 TCX',
      ]}
      exampleCodes={[
        'PANTONE 19-4052 TCX', 'PANTONE 18-1750 TCX', 'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX', 'PANTONE 15-0343 TCX', 'PANTONE 19-0303 TCX',
      ]}

      aboutH2="Why textile CMYK is a different problem"
      aboutParagraphs={[
        'Digital textile printing — dye sublimation, direct-to-garment, pigment inkjet — takes a CMYK file and lays it onto fabric. That sounds like ordinary process printing, and the numbers look the same, but almost everything downstream of the file is different. The ink is different, the substrate is a woven or knitted textile rather than a coated sheet, and in sublimation the colour does not even reach its final state until heat converts the dye to gas and it bonds into polyester fibre.',
        'The consequence is that a CMYK build which is correct on paper is routinely wrong on fabric. Sublimation colours shift substantially between the printed transfer sheet and the pressed garment — the transfer looks dull and the pressed result jumps in saturation, which is why nobody judges sublimation from the paper. Direct-to-garment on cotton behaves differently again: the fabric absorbs ink, and whether a white underbase is printed first changes the result completely.',
        'This page starts from the textile Pantone library rather than the print one, which is the point of it existing separately. If you are producing garments, your colour reference is a TCX code from a tech pack, not a PMS number from a brand book. Converting TCX to CMYK gives your RIP a starting build in the same colour space the file has to be delivered in.',
        'What no converter can do is replace the ICC profile for your specific combination of printer, ink set, fabric and heat press. Those four variables together determine the final colour, and every serious textile print operation characterises them and builds a profile. Treat the numbers here as the values you load before the first strike-off, then correct against the printed sample on the real fabric.',
      ]}

      comparisonRows={[
        ['Source library', 'PMS — graphic arts, ink on paper', 'TCX — Fashion, Home + Interiors, dye on cotton'],
        ['Where the code comes from', 'A brand book or print specification', 'A garment tech pack or mill approval'],
        ['Output goes to', 'A commercial press printing on paper', 'A RIP driving a sublimation or DTG printer'],
        ['Substrate', 'Coated or uncoated paper stock', 'Polyester, cotton, blends — woven or knitted'],
        ['Colour settles', 'As soon as the ink dries', 'After heat pressing, in sublimation — the shift is large'],
        ['Gamut limit', 'Set by the process ink set and paper', 'Set by ink set, fibre, and whether an underbase is printed'],
        ['What makes it accurate', 'A press profile for the stock', 'An ICC profile for printer, ink, fabric and press together'],
        ['Right converter', 'Use the standard Pantone to CMYK tool', 'This page'],
      ]}

      codeAnatomy={PMS_VS_TCX}

      useCasesIntro="This conversion sits at the start of a digital textile print job, where a colour reference has to become a file the RIP can accept."
      useCases={[
        { title: 'Dye sublimation on polyester', body: 'Sportswear, flags, banners and all-over-print garments. The TCX reference becomes a CMYK build, then gets corrected against a pressed strike-off.' },
        { title: 'Direct-to-garment printing', body: 'DTG on cotton needs a starting build plus decisions about underbase and ink limits — none of which a converter can make for you.' },
        { title: 'All-over print and cut-and-sew', body: 'Panels printed before assembly must match across pieces, so every colour in the artwork needs a consistent, documented build.' },
        { title: 'Sampling and strike-offs', body: 'The first printed sample is where the real correction happens. Starting from a defensible number shortens how many rounds that takes.' },
        { title: 'Matching digital print to dyed goods', body: 'Where printed panels sit next to piece-dyed fabric in the same garment, both have to land on the same TCX standard by different routes.' },
        { title: 'Soft signage and interiors', body: 'Printed textile banners, drapes and acoustic panels are specified from the same fashion library as apparel.' },
      ]}

      howToIntro="Say you are sublimating a team kit and the tech pack specifies Pantone 19-4052 TCX for the body. Search 19-4052, load the CMYK build into your RIP, and print a strike-off on the actual polyester you will use — then press it, because sublimation colour does not exist until it has been through the heat press, and judging the transfer sheet will mislead you every time."
      howToSteps={[
        'Search the TCX code from your tech pack and select the colour.',
        'Read the CMYK build, with cyan, magenta, yellow and key broken out beneath the combined value.',
        'Load those values into your artwork as a starting build, and make sure the file is delivered in the colour space your RIP expects.',
        'Print a strike-off on the actual fabric you will produce on — not on paper, and not on a different substrate.',
        'For sublimation, press the strike-off before judging it. Colour on the transfer sheet bears little resemblance to the pressed result.',
        'Compare the pressed sample against the physical TCX cotton swatch under controlled lighting, then correct the build and repeat until it is inside your agreed tolerance.',
        'Record the corrected build against that fabric and printer, and reuse it — that record is worth more than any converter.',
      ]}

      accuracyNote="Treat every number on this page as a starting point, not a specification. The CMYK build here is a straightforward mathematical conversion of an sRGB approximation of a dyed cotton standard; it knows nothing about your ink set, your fabric, your printer or your heat press, and those four things together determine the colour that actually comes out. Sublimation in particular shifts dramatically between the printed transfer and the pressed garment. The TCX values behind this are also curated public approximations covering 213 of roughly 2,625 colours."
      deltaENote="No ΔE is shown here, because the conversion is arithmetic rather than a nearest-neighbour match — nothing is being substituted. Where ΔE belongs in this workflow is between your pressed strike-off and the physical TCX swatch, measured with a spectrophotometer on the fabric. Agree that tolerance with your customer before sampling: ΔE*00 under 1 is a tight commercial standard and 1–2 a common working range for printed textiles."

      trademark={{
        system: 'PANTONE',
        owner: 'Pantone LLC',
        extra: 'Pantone Fashion, Home + Interiors® and TCX are Pantone LLC products. Colour values shown here are sRGB-derived approximations for reference and are not colour-managed reproductions of the physical cotton standards or a substitute for an ICC profile.',
      }}

      faqs={[
        {
          q: 'How is this different from the standard Pantone to CMYK converter?',
          a: 'Two things. The source library is different — this page searches Pantone Fashion, Home + Interiors (TCX), the textile system, while the standard converter searches the PMS graphic-arts system. And the intent is different: the output here is a starting build for a digital textile printer, framed around sublimation and DTG workflows, rather than a process build for a commercial press printing on paper.',
        },
        {
          q: 'Why does my sublimation print not match the CMYK values?',
          a: 'Because sublimation colour does not exist until the heat press. The dye is printed onto a transfer sheet, where it looks dull and washed out, then heat converts it to gas and it bonds into the polyester fibre — at which point saturation jumps dramatically. Judging colour from the transfer sheet is meaningless. Print, press, and only then compare against the standard.',
        },
        {
          q: 'Do I need an ICC profile for textile printing?',
          a: 'For anything commercial, yes. The final colour depends on your printer, ink set, fabric and press settings together, and only a profile characterised for that specific combination will let you predict it. A converter can give you a defensible number to start from; a profile is what makes the output repeatable across jobs. Most textile print operations profile each fabric they run regularly.',
        },
        {
          q: 'Can digital textile printing hit any Pantone colour?',
          a: 'No. A CMYK ink set on fabric has a gamut like any other process system, and highly saturated TCX colours will fall outside it — the same problem as printing a vivid spot colour in process on paper. Fabric adds its own limits: the fibre, the base colour of the substrate and whether a white underbase is laid down all constrain what is reachable. Deep saturated colours often need a dyed base rather than a printed one.',
        },
        {
          q: 'Should I use TCX or PMS codes for a printed garment?',
          a: 'TCX, in almost every case. It is the textile library, your tech pack will already be written in it, and your quality team will approve against a cotton swatch. PMS becomes relevant when the garment has to match printed material — packaging, hang tags, a lookbook — in which case you are matching two different processes to each other and both references need to be on the table.',
        },
        {
          q: 'Does the fabric type change the CMYK build I need?',
          a: 'Substantially. Polyester for sublimation, cotton for DTG and a poly-cotton blend will each take ink differently, and knitted versus woven constructions differ again because of how the surface scatters light. The same build printed on three fabrics gives three visibly different colours. This is exactly why the correction happens at strike-off stage on the real substrate, and why a corrected build should be recorded per fabric.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-textile-to-cmyk/', [
        '/tcx-to-hex/',
        '/pantone-c-to-tcx/',
        '/tcx-vs-tpx-vs-tpg/',
        '/pantone-to-cmyk/',
      ], TEXTILE_EVERGREEN)}
    />
  );
}
