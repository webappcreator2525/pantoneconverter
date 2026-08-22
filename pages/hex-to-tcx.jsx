import { Ruler } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import tcx from '../data/tcx.json';
import { HEX_FORMULA } from '../lib/colorFormulas';
import { relatedFor, TEXTILE_EVERGREEN } from '../lib/converterLinks';

const PMS_VS_TCX = {
  h2: 'Which Pantone code does your supplier need?',
  intro: 'Before you send anything, check which library your supplier works in. Both codes below are Pantone; they are not alternatives to each other, and sending the wrong one costs a sampling round.',
  left: {
    label: 'PMS — send this to a printer',
    parts: [
      { text: '186', note: 'A catalogue index with no internal meaning.' },
      { text: 'C', note: 'Coated paper. U would be uncoated.' },
    ],
    summary: 'A pre-mixed printing ink. Right for packaging, swing tags, lookbooks and any printed matter.',
  },
  right: {
    label: 'TCX — send this to a mill or dye house',
    parts: [
      { text: '19', note: 'Lightness band: 11 lightest, 19 deepest.' },
      { text: '4052', note: 'Hue family and chroma — 40xx is in the blues.' },
      { text: 'TCX', note: 'Dyed cotton swatch, the format a dye house matches against.' },
    ],
    summary: 'A colour standard on fabric. Right for garments, home textiles and anything that gets dyed rather than printed.',
  },
  note: 'Most fashion projects need both: TCX for the garment and PMS for the packaging and print collateral that ships with it.',
};

export default function HexToTcxPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/hex-to-tcx/"
      pageTitle="HEX to TCX Converter | Find Pantone Fashion Colour Code"
      metaDescription="Enter a HEX or RGB colour and find the closest Pantone TCX fashion code, ranked by ΔE. Free tool bridging screen design to textile manufacturing and dye houses."
      h1="HEX to TCX Converter"
      breadcrumbLabel="HEX to TCX"
      heroLead="Enter a HEX colour and get the closest Pantone TCX codes, ranked by ΔE*00. This is the fashion and interiors library — the code a mill or dye house can actually work from, and a different system from the PMS numbers used in print."
      icon={<Ruler size={20} color="#e11d48" />}
      iconBg="#fff1f2"
      accentColor="#e11d48"

      appName="HEX to TCX Converter"
      appDescription="Free browser-based tool that finds the closest Pantone Fashion, Home + Interiors (TCX) textile colour for any HEX or RGB value, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Pantone TCX codes for any HEX value',
        'ΔE*00 colour difference and match quality for every result',
        'Covers every Pantone Color of the Year',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every TCX code',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="formula-to-palette"
      palette={tcx}
      formula={HEX_FORMULA}
      systemLabel="Pantone TCX"
      sourceLabel="HEX"
      targetLabel="TCX"
      searchLabel="Enter a HEX colour"
      searchHint="Three- and six-digit HEX both work, with or without the leading hash."
      exampleCodes={[
        'PANTONE 19-4052 TCX', 'PANTONE 18-1750 TCX', 'PANTONE 13-1023 TCX',
        'PANTONE 17-1230 TCX', 'PANTONE 17-5104 TCX', 'PANTONE 15-0343 TCX',
      ]}

      aboutH2="What is Pantone TCX, and why not just send a HEX code?"
      aboutParagraphs={[
        'TCX is Pantone’s Fashion, Home + Interiors library — the colour system used for apparel, home textiles and interiors. It is a separate library from the PMS numbers used in graphic design and printing, and the difference is physical: PMS is pre-mixed ink printed on paper, TCX is dye on cotton fabric. TCX stands for Textile Cotton eXtended, and every colour ships as a swatch of dyed cotton rather than a printed chip.',
        'That is the answer to why a HEX code is not enough. A HEX value describes light emitted by a screen, and no two screens are calibrated alike. A dye house needs a physical standard it can put next to a lab dip under controlled lighting and judge against. Sending "make it #0F4C81" gives a mill nothing to match to; sending "Pantone 19-4052 TCX" gives them a standard they already own, that Pantone manufactures to a tolerance, and that both sides can point at when a sample comes back wrong.',
        'The six-digit code carries real information, unlike a PMS number. The first two digits are a lightness band from 11 at the lightest to 19 at the deepest, and the next four locate the colour by hue family and chroma. So a supplier reading 19-4052 already knows it is a deep blue. That readability is also useful when you are choosing between the candidates this tool returns — the codes tell you how they relate.',
        'This conversion is a nearest-neighbour search, not a calculation. TCX is a finite library of physical standards, so your screen colour will rarely land exactly on one, and every result here carries a ΔE figure telling you how far away it is. Highly saturated screen colours will match poorly for a real reason: dye on cotton cannot reach the intensity a backlit display can.',
      ]}

      comparisonRows={[
        ['What it is', 'A screen colour — light emitted by a display', 'A physical colour standard on dyed cotton'],
        ['Who can work from it', 'Anyone doing digital design', 'Mills, dye houses, garment and textile manufacturers'],
        ['Consistency', 'Varies with every monitor and its calibration', 'Manufactured to a tolerance and physically comparable'],
        ['Code format', 'Six hex digits — #0F4C81', 'Six digits plus a format suffix — 19-4052 TCX'],
        ['Does the code mean anything?', 'Yes, but as RGB channel values', 'Yes — lightness band, then hue family and chroma'],
        ['Range', 'Continuous — 16.7 million values', 'Finite — around 2,625 physical standards'],
        ['Use for', 'Web, ecommerce, design software, presentation', 'Tech packs, lab dips, bulk dyeing, production approval'],
        ['Conversion type', 'The source in this direction', 'A nearest match, reported with a ΔE difference'],
      ]}

      codeAnatomy={PMS_VS_TCX}

      useCasesIntro="This direction is the designer-to-manufacturer handoff: a colour was chosen on screen and now has to become something a mill can dye."
      useCases={[
        { title: 'Building a tech pack', body: 'Every colourway on a tech pack needs a TCX reference. Designers picking colours in Illustrator or Figma have to convert before the pack goes to the factory.' },
        { title: 'Briefing a mill or dye house', body: 'A supplier cannot lab-dip to a HEX value. Giving them a TCX code they already stock removes an entire round of back-and-forth.' },
        { title: 'Extending a digital brand into apparel', body: 'A brand whose identity was designed on screen needs TCX equivalents before it can produce merchandise or uniforms.' },
        { title: 'Matching garments to existing print', body: 'Where a garment has to sit alongside printed packaging or signage, the printed colour is the starting point and TCX the destination.' },
        { title: 'Home textiles and interiors specification', body: 'Cushions, upholstery and soft furnishings are specified in TCX, so an interior scheme built on screen has to be translated.' },
        { title: 'Checking whether a colour is dyeable', body: 'A high ΔE against the whole TCX library is an early warning that a vivid screen colour will not survive as dye on cotton.' },
      ]}

      howToIntro="Say a designer picked a brand teal in Figma as #0F4C81 and the factory needs a colour reference for the tech pack. Paste the HEX here, take the top TCX code, and put that on the pack — then order the physical cotton swatch and send it with the pack, because the mill will lab-dip against the fabric, not the number."
      howToSteps={[
        'Paste or type your HEX value into the field. Three- and six-digit forms both work, with or without the hash.',
        'Read the five closest Pantone TCX codes, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge: under 2 is a commercial match, 2–5 is visible side by side, above 5 means no TCX standard is genuinely close.',
        'Read the code itself to compare candidates — the lightness band tells you which of two near matches is the deeper one.',
        'Copy the TCX code onto your tech pack, written in full including the TCX suffix so the supplier knows which format to match.',
        'Order the physical cotton swatch and send it with the pack. The mill lab-dips against fabric, and a number alone leaves room for argument.',
      ]}

      accuracyNote="Two limits, and both matter before you commit a code to a tech pack. A screen emits light while dyed cotton reflects it off a textured surface, so the two can never look identical and no conversion closes that gap. And the TCX values matched against here are curated public sRGB approximations covering 213 of roughly 2,625 colours, not Pantone's own measurements — so a closer standard may exist outside this set. Always confirm against a physical Pantone cotton swatch before production."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000), computed in CIELAB. Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Expect higher figures for saturated screen colours — dye on cotton simply cannot reach the intensity of a backlit display, so a poor result there is a genuine warning about the material rather than a shortcoming of the search."

      trademark={{
        system: 'PANTONE',
        owner: 'Pantone LLC',
        extra: 'Pantone Fashion, Home + Interiors® and TCX are Pantone LLC products. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical cotton standards.',
      }}

      faqs={[
        {
          q: 'Why can I not just send my supplier a HEX code?',
          a: 'Because a HEX value has no physical existence. It describes light emitted by a display, and every monitor renders it slightly differently. A dye house needs something it can lay next to a lab dip in a light box and judge. A TCX code points at a physical cotton standard that Pantone manufactures to a tolerance, which both you and the mill can hold and compare — that is what makes a colour approvable rather than arguable.',
        },
        {
          q: 'Is TCX the same as the Pantone codes used for printing?',
          a: 'No. Printing uses the Pantone Matching System, where codes look like "186 C" and refer to pre-mixed inks on paper. Fashion and interiors use Fashion, Home + Interiors, where codes look like "19-4052 TCX" and refer to dyed cotton. They are separate libraries for separate industries. Sending a PMS number to a mill, or a TCX number to a commercial printer, will get you a query at best and a wrong sample at worst.',
        },
        {
          q: 'What ΔE should I accept for a textile colour?',
          a: 'It depends on the programme and should be agreed with your supplier in writing before sampling. ΔE*00 under 1 is imperceptible and typical of a tightly controlled colour, 1–2 is a normal commercial tolerance, and above 2 starts to be visible when two garments hang together on a rail. Textile tolerances are usually specified against a measured lab dip rather than against a screen conversion like this one.',
        },
        {
          q: 'Why does my bright screen colour have no close TCX match?',
          a: 'Because dye on cotton cannot reach the saturation a backlit display can. Electric cyans, vivid magentas and fluorescent greens exist happily on a monitor and have no dyed equivalent in a standard cotton library. A high ΔE here is telling you something true about manufacturing: the colour will need a speciality dye, a different fibre, or a rethink — not a different code.',
        },
        {
          q: 'Should I specify TCX or TPG on my tech pack?',
          a: 'TCX where the colour will be dyed onto fabric, which is most apparel and home textile work — it is the cotton standard and the one dye houses match against. TPG is the printed paper version of the same colours, used where a physical fabric swatch is impractical or where the colour is being printed rather than dyed. If in doubt, ask the supplier which format they hold, and see the TCX vs TPX vs TPG guide for the full comparison.',
        },
        {
          q: 'Do I need to buy the physical Pantone swatch?',
          a: 'For production, effectively yes. The number identifies the standard, but the mill dyes to a physical reference and both sides need to be looking at the same object when a sample is approved or rejected. Pantone sells TCX cotton passports, chip sets and individual swatch cards for this purpose. For early design and moodboard work the digital value is fine; for anything that gets manufactured, it is not.',
        },
      ]}

      relatedLinks={relatedFor('/hex-to-tcx/', [
        '/tcx-to-hex/',
        '/pantone-c-to-tcx/',
        '/tcx-vs-tpx-vs-tpg/',
        '/pantone-textile-to-cmyk/',
      ], TEXTILE_EVERGREEN)}
    />
  );
}
