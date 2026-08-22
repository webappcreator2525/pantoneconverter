import { Factory } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import ral from '../data/ral.json';
import { relatedFor } from '../lib/converterLinks';

export default function RalToPantonePage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/ral-to-pantone/"
      pageTitle="RAL to Pantone Converter | Find Closest PMS Colour Match"
      metaDescription="Convert any RAL Classic code to the closest Pantone PMS colour. Free ΔE-ranked matching across 213 RAL colours and the full Pantone coated deck — no signup."
      h1="RAL to Pantone Converter"
      breadcrumbLabel="RAL to Pantone"
      heroLead="Search any RAL Classic code — by number, English name or German name — and get the closest Pantone PMS colours ranked by ΔE*00. Useful whenever a coating colour has to be carried into printed material."
      icon={<Factory size={20} color="#dc2626" />}
      iconBg="#fef2f2"
      accentColor="#dc2626"

      appName="RAL to Pantone Converter"
      appDescription="Free browser-based tool that finds the closest Pantone PMS colour for any RAL Classic paint code, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Pantone colours for any RAL Classic code',
        'Search by RAL number, English name or German name',
        'ΔE*00 colour difference and match quality for every result',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'Save any Pantone result to your colour library',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="palette-to-pantone"
      palette={ral}
      systemLabel="RAL Classic"
      sourceLabel="RAL"
      targetLabel="Pantone"
      searchLabel="Search a RAL Classic colour by code or name"
      searchPlaceholder="e.g. 7016, Anthracite, Verkehrsrot, 9010…"
      searchHint="German names work too — “Anthrazitgrau” and “7016” both find the same colour."
      presets={['RAL 9010', 'RAL 7016', 'RAL 3020', 'RAL 5010', 'RAL 6018', 'RAL 1023', 'RAL 9005']}
      exampleCodes={['RAL 3020', 'RAL 5010', 'RAL 6018', 'RAL 7016', 'RAL 1023', 'RAL 9005']}

      aboutH2="What is RAL, and why convert it to Pantone?"
      aboutParagraphs={[
        'RAL is the European colour standard for industrial coatings, published by RAL gGmbH since 1927. Its main deck, RAL Classic, holds 213 colours identified by four-digit codes in which the first digit names the colour family — 1 yellow, 2 orange, 3 red, 4 violet, 5 blue, 6 green, 7 grey, 8 brown, 9 white or black. It is the colour language of European paint, powder coating, façade systems, signage and metal fabrication.',
        'The conversion usually runs this direction when a physical object comes first. A manufacturer already coats its machinery in RAL 5010, a building already has RAL 7016 window frames, or a product line is committed to a powder that is stocked and paid for. The brochure, packaging, exhibition graphics and website then have to match what already exists, and print production speaks Pantone rather than RAL.',
        'It also comes up in reverse-engineering a brand. Plenty of European industrial companies defined their identity around a coating colour decades before they had a brand book, and never recorded a Pantone equivalent. Finding the nearest PMS colour is the first step in writing a brand guideline that print suppliers can actually work from.',
        'Because Pantone’s coated deck contains 1,341 colours against RAL Classic’s 213, this direction generally produces closer matches than going the other way. There is simply more Pantone space to land in. That does not make the match exact — ink on paper and cured coating on metal are different materials — but the numbers are usually more forgiving.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'RAL gGmbH, Germany, 1927'],
        ['Primary industry', 'Commercial printing, packaging and graphic design', 'Industrial coatings — paint, powder coating, architecture, signage'],
        ['Colour count', '1,341 in the coated PMS deck, over 3,200 across all decks', '213 in RAL Classic; ~1,800 in RAL Design System plus'],
        ['Code structure', 'A number plus a deck suffix — 186 C is coated, 186 U uncoated', 'Four digits where the first identifies the colour family'],
        ['Physical form', 'Pre-mixed printing ink on coated or uncoated paper', 'Liquid or powder coating cured onto metal, plastic or timber'],
        ['Naming', 'Numbers only, with a handful of named colours like Reflex Blue', 'Every code has an official German name and an English translation'],
        ['Match direction', 'More colours available, so RAL → Pantone lands closer', 'Fewer colours, so Pantone → RAL often has no near neighbour'],
        ['Typical deliverable', 'Brochures, packaging, exhibition graphics, brand guidelines', 'Façades, machinery, vehicle fleets, road signs, window frames'],
      ]}

      useCasesIntro="Converting RAL to Pantone matters whenever something physical already exists and printed material has to match it."
      useCases={[
        { title: 'Print collateral for coated products', body: 'Machinery, appliances or architectural hardware finished in RAL need brochures, datasheets and packaging that match. The printer needs a PMS code, not a coating reference.' },
        { title: 'Brand books for industrial companies', body: 'Manufacturers whose identity grew out of a paint colour often have no Pantone equivalent on record. Converting the RAL code is the first step to a usable brand specification.' },
        { title: 'Exhibition and trade-show graphics', body: 'Stand graphics are printed while the product on the stand is coated. Matching printed panels to the RAL-finished product keeps the display coherent.' },
        { title: 'Architectural signage and wayfinding', body: 'Buildings specify RAL for frames and cladding. Printed signage, floor graphics and vinyl need Pantone references that read as the same colour.' },
        { title: 'Vehicle livery and fleet branding', body: 'Fleet paint is RAL. Vinyl wraps, decals and printed door graphics are specified in Pantone, so the two have to be reconciled before application.' },
        { title: 'Digital and web colour palettes', body: 'A RAL code says nothing about screen colour. Converting to Pantone — and from there to HEX and RGB — gives designers a defensible starting point for digital assets.' },
      ]}

      howToIntro="The converter runs as you type, and nothing is sent to a server."
      howToSteps={[
        'Type a RAL code, English name or German name into the search box — “7016”, “Anthracite grey” and “Anthrazitgrau” all find the same colour.',
        'Select the RAL colour from the suggestions to load it as your source colour.',
        'Read the five closest Pantone coated colours, ordered from the smallest ΔE*00 difference upward.',
        'Check the ΔE badge: under 2 is a commercial match, 2–5 is visible side by side, above 5 the colours read as different.',
        'Copy the Pantone name or its HEX value, or save the colour to your library with the heart icon.',
        'Confirm the chosen PMS number against a physical Pantone guide on the paper stock you will actually print on.',
      ]}

      accuracyNote="A RAL colour is a cured coating and a Pantone colour is ink on paper. They use different pigments, different binders and different surfaces, so no exact equivalence exists between the two systems — this tool reports the closest neighbour and how far away it is. The RAL values used here are sRGB approximations of the physical standard, not colour-managed measurements, so treat the result as a starting point for a physical comparison rather than a final answer."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000), the colour-difference metric used in coatings and print quality control. Below 1 the difference is imperceptible, 1–2 counts as a commercial match, 2–5 is noticeable side by side, and above 5 most viewers call them different colours. Because the Pantone coated deck is six times larger than RAL Classic, matches in this direction are typically tighter than the reverse."

      trademark={{
        system: 'RAL',
        owner: 'RAL gGmbH',
        extra: 'RAL colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical standard.',
      }}

      faqs={[
        {
          q: 'Is there an official RAL to Pantone conversion chart?',
          a: 'No. RAL gGmbH and Pantone LLC are unrelated organisations and neither publishes an official cross-reference to the other. Every RAL-to-Pantone chart in circulation, including this tool, is a third-party approximation produced by comparing colour measurements. That is why the result here is presented with a ΔE difference rather than as a definitive equivalent.',
        },
        {
          q: 'Which direction gives better matches, RAL to Pantone or Pantone to RAL?',
          a: 'RAL to Pantone, generally. The Pantone coated deck holds 1,341 colours against RAL Classic’s 213, so there is far more Pantone colour space available to land close to a given RAL colour. Going the other way, large regions of Pantone space — particularly bright, highly saturated colours — have no close RAL counterpart at all.',
        },
        {
          q: 'Can I search RAL colours by their German names?',
          a: 'Yes. Every RAL Classic colour in this tool carries its official German name alongside the English translation, and the search box matches both. “Verkehrsrot”, “Traffic red” and “3020” all return RAL 3020. This matters in practice because European coating suppliers routinely quote the German name rather than the translation.',
        },
        {
          q: 'Why does the printed Pantone colour not look like my RAL coating?',
          a: 'Because the materials behave differently. A coating has a gloss level that changes how light reflects off it, and printed ink sits on paper that absorbs and scatters light in its own way. A high-gloss RAL finish and a matte printed sheet will never look identical even when the underlying colour measurement matches. Compare a physical Pantone chip against the actual coated part under consistent lighting.',
        },
        {
          q: 'Should I use coated or uncoated Pantone for a RAL match?',
          a: 'This tool matches against the Pantone coated deck, which is the closer analogue to a cured coating — both have a sealed surface that keeps the colourant sitting on top rather than soaking in. If your printed piece is going onto uncoated stock, take the coated PMS number the tool gives you and check its uncoated counterpart, which will read softer and slightly darker.',
        },
        {
          q: 'What are the most commonly converted RAL colours?',
          a: 'RAL 7016 Anthracite Grey is the most requested by a wide margin, because it dominates contemporary European façades, window frames and cladding. RAL 9010 Pure White and RAL 9016 Traffic White follow, driven by joinery and interior work. RAL 9005 Jet Black, RAL 3020 Traffic Red and RAL 5010 Gentian Blue round out the list of codes that appear again and again in brand and specification work.',
        },
      ]}

      relatedLinks={relatedFor('/ral-to-pantone/', [
        '/pantone-to-ral/',
        '/pantone-to-ncs/',
        '/lab-to-pantone/',
        '/cmyk-to-pantone/',
      ])}
    />
  );
}
