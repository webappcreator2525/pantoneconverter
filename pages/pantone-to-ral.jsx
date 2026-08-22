import { Factory } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import ral from '../data/ral.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToRalPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-ral/"
      pageTitle="Pantone to RAL Converter | Find Closest RAL Classic Code"
      metaDescription="Convert any Pantone PMS colour to the closest RAL Classic code. Free ΔE-ranked matching across all 213 RAL colours for paint, powder coating and signage."
      h1="Pantone to RAL Converter"
      breadcrumbLabel="Pantone to RAL"
      heroLead="Search any Pantone spot colour and get the closest RAL Classic codes, ranked by ΔE*00 colour difference. Built for paint, powder-coating and architectural specification work — everything runs in your browser."
      icon={<Factory size={20} color="#b91c1c" />}
      iconBg="#fef2f2"
      accentColor="#b91c1c"

      appName="Pantone to RAL Converter"
      appDescription="Free browser-based tool that finds the closest RAL Classic paint code for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five RAL Classic codes for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'All 213 RAL Classic colours with German and English names',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={ral}
      systemLabel="RAL Classic"
      sourceLabel="Pantone"
      targetLabel="RAL"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Black 6, Cool Gray 9…"
      searchHint="Try “186” for the classic Coca-Cola red, “286” for a deep corporate blue, or paste a HEX value."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone ORANGE-021-C',
        'Pantone BLACK-6-C',
        'Pantone COOL-GRAY-9-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone BLACK-6-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is RAL?"
      aboutParagraphs={[
        'RAL is the European colour standard for industrial coatings. It began in 1927, when the German Reichs-Ausschuß für Lieferbedingungen — the state committee for delivery terms that gives the standard its initials — published forty colours so that suppliers and buyers could agree on a shade without posting physical samples back and forth. That original list grew into RAL Classic, which today holds 213 colours and remains the default colour language of European paint, powder coating and metal fabrication.',
        'Every RAL Classic colour carries a four-digit code, and the first digit is not arbitrary: 1 is yellow, 2 orange, 3 red, 4 violet, 5 blue, 6 green, 7 grey, 8 brown and 9 white or black. RAL 5010 is therefore a blue before you have looked it up, and RAL 7016 — Anthrazitgrau, the anthracite grey that covers a great deal of modern European window and façade hardware — is unmistakably a grey. The remaining three digits simply place the colour within its family; they carry no further meaning.',
        'RAL Classic is one deck among several published by RAL gGmbH. RAL Design System plus organises roughly 1,800 colours on a systematic hue-lightness-chroma grid for architects, RAL Effect covers waterborne paints including metallics, and RAL Plastics carries the standard into moulded polymer. Classic is the one quoted on the overwhelming majority of powder-coating, signage and joinery orders, which is why it is the deck this converter matches against.',
        'The practical difference from Pantone is what the standard is made of. A Pantone colour is a printing ink formula, mixed from base inks and laid on paper. A RAL colour is a coating — sprayed, baked or powder-cured onto metal, plastic or timber — and its appearance depends on the gloss level and the substrate underneath. The two systems were built for different industries and never intended to map onto each other, which is why a conversion between them is always an approximation rather than a lookup.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'RAL gGmbH, Germany, 1927'],
        ['Primary industry', 'Commercial printing, packaging and graphic design', 'Industrial coatings — paint, powder coating, architecture, signage'],
        ['Colour count', 'Over 3,200 across all decks; 1,341 in the coated PMS deck', '213 in RAL Classic; ~1,800 in RAL Design System plus'],
        ['Code structure', 'A number plus a deck suffix — 186 C is coated, 186 U uncoated', 'Four digits where the first identifies the colour family — 3020 is a red'],
        ['Physical form', 'Pre-mixed printing ink on coated or uncoated paper', 'Liquid or powder coating cured onto metal, plastic or timber'],
        ['What varies', 'Paper stock and coating — the same ink shifts between C and U', 'Gloss level and substrate — the same code differs matte vs gloss'],
        ['Typical use', 'Logos, packaging, brand guidelines, print production', 'Façades, machinery, vehicle fleets, road signs, window frames'],
        ['Geography', 'Global, strongest in print and consumer branding', 'Dominant across Europe, widely recognised worldwide'],
      ]}

      useCasesIntro="A Pantone-to-RAL conversion comes up whenever a brand colour defined for print has to be reproduced as a physical coating."
      useCases={[
        { title: 'Architectural and façade work', body: 'A brand specifies its colour in Pantone, but window frames, cladding and balustrades are quoted in RAL. Specifying the nearest RAL code lets the fabricator order coating powder without guesswork.' },
        { title: 'Powder coating and metal finishing', body: 'Powder coaters stock RAL colours as standard. Converting a Pantone brand colour to RAL is usually the difference between a stock powder and an expensive custom batch with a minimum order quantity.' },
        { title: 'Signage and wayfinding', body: 'Sign systems mix printed panels with coated metal frames. The printed elements are specified in Pantone and the metalwork in RAL, so the two must be reconciled before manufacture.' },
        { title: 'Vehicle fleet and machinery livery', body: 'Fleet paint, plant machinery and agricultural equipment are ordered in RAL. Converting the corporate Pantone colour gives the paint shop a code it can actually mix.' },
        { title: 'Industrial product design', body: 'Enclosures, brackets and housings are finished in RAL. Designers working from a Pantone-based brand palette need the RAL equivalent before releasing manufacturing drawings.' },
        { title: 'Tender and specification documents', body: 'European construction and infrastructure tenders quote colour in RAL almost exclusively. A Pantone-only brand book has to be translated before it can be written into a specification.' },
      ]}

      howToIntro="The converter runs as you type — there is no button to press and nothing is sent to a server."
      howToSteps={[
        'Type a Pantone number or name into the search box — “186”, “286 C” and “Cool Gray 9” all work — then pick the colour from the suggestions.',
        'Read the five closest RAL Classic codes, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge on each result: under 2 is a commercial match, 2–5 is visible side by side, and above 5 the two colours read as genuinely different.',
        'Copy the RAL code or its HEX value with the copy buttons, and quote the German name alongside it if you are ordering from a European supplier.',
        'Confirm the chosen code against a physical RAL fan deck at the correct gloss level before releasing it to production.',
      ]}

      accuracyNote="RAL colours are coatings and Pantone colours are printing inks. They use different pigments, sit on different substrates and cover different colour gamuts, so there is no exact mapping between the two systems — only a nearest neighbour. RAL Classic holds 213 colours against 1,341 in the Pantone coated deck, which means large regions of Pantone space simply have no close RAL equivalent, and the tool will honestly report a poor match when that is the case."
      deltaENote="Every result is ranked by ΔE*00 (CIEDE2000), the colour-difference metric the coatings industry writes tolerances in. As a rule of thumb: ΔE below 1 is imperceptible, 1–2 is a commercial match, 2–5 is noticeable when the colours are placed side by side, and above 5 most people will call them different colours. Across the whole Pantone coated deck the median closest-RAL match lands around ΔE 6, so treat a single-digit result as normal rather than disappointing."

      trademark={{
        system: 'RAL',
        owner: 'RAL gGmbH',
        extra: 'RAL colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical standard.',
      }}

      faqs={[
        {
          q: 'Can Pantone be converted to RAL exactly?',
          a: 'No. Pantone is a printing-ink system and RAL is a coating system, so the two use different colourants on different substrates and cover different gamuts. A conversion finds the closest visual neighbour, not an equivalent. RAL Classic also contains only 213 colours against 1,341 in the Pantone coated deck, so many Pantone colours have no close RAL counterpart at all — this tool reports the ΔE difference so you can see when that has happened.',
        },
        {
          q: 'What do the four digits in a RAL code mean?',
          a: 'The first digit identifies the colour family: 1 yellow, 2 orange, 3 red, 4 violet, 5 blue, 6 green, 7 grey, 8 brown and 9 white or black. The remaining three digits place the colour inside that family and carry no independent meaning. So RAL 6018 is a green and RAL 9010 is a white, which you can tell before looking either of them up.',
        },
        {
          q: 'How many colours are in RAL Classic?',
          a: 'RAL Classic contains 213 colours. RAL gGmbH also publishes larger decks — RAL Design System plus holds around 1,800 colours arranged on a hue, lightness and chroma grid, and RAL Effect adds metallic and waterborne finishes. Classic remains the deck quoted on most powder-coating, signage and architectural orders, and it is the one this converter matches against.',
        },
        {
          q: 'Why does my RAL powder coating look different from the Pantone swatch?',
          a: 'Three things usually explain it. Gloss level changes perceived colour substantially, so the same RAL code looks lighter at high gloss than matte. The substrate and film thickness alter the result on metal versus plastic. And the Pantone swatch is ink on paper viewed under different conditions than a cured coating. Always compare a physical RAL chip at the intended gloss level rather than judging from a screen.',
        },
        {
          q: 'Is RAL used outside Europe?',
          a: 'Yes, though its centre of gravity is European. RAL is the default in German, Austrian, Swiss, Nordic and Benelux industrial coating, and it is widely recognised and stocked across the rest of Europe. Outside Europe it appears wherever European machinery, façade systems or architectural hardware are specified, but North American work more often uses Federal Standard 595 or a manufacturer-specific system.',
        },
        {
          q: 'Which RAL colours are most commonly specified?',
          a: 'RAL 9010 Pure White and RAL 9016 Traffic White dominate joinery and window frames. RAL 7016 Anthracite Grey has become the default for contemporary European façades, cladding and window hardware. RAL 9005 Jet Black is the standard black, RAL 3020 Traffic Red the standard signal red, and RAL 5010 Gentian Blue a common corporate blue. Between them these account for a large share of all powder-coating orders.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-ral/', [
        '/ral-to-pantone/',
        '/pantone-to-ncs/',
        '/pantone-to-federal-standard-595/',
        '/pantone-to-lab/',
      ])}
    />
  );
}
