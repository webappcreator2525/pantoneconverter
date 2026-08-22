import { Layers } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import oracal from '../data/oracal.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToOracalPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-oracal/"
      pageTitle="Pantone to Oracal 651 Converter | Find Closest Vinyl Colour"
      metaDescription="Convert any Pantone PMS colour to the closest ORACAL 651 vinyl colour. Free ΔE-ranked matching for Cricut, Silhouette, sign making and vehicle lettering."
      h1="Pantone to Oracal 651 Vinyl Converter"
      breadcrumbLabel="Pantone to Oracal 651"
      heroLead="Search any Pantone spot colour and get the closest ORACAL 651 permanent vinyl colours, ranked by ΔE*00. For sign makers, decal producers and anyone cutting on a Cricut or Silhouette."
      icon={<Layers size={20} color="#0d9488" />}
      iconBg="#f0fdfa"
      accentColor="#0d9488"

      appName="Pantone to Oracal 651 Converter"
      appDescription="Free browser-based tool that finds the closest ORACAL 651 adhesive vinyl colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five ORACAL 651 vinyl colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers the ORACAL 651 gloss range with its colour numbers',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour reference',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={oracal}
      systemLabel="ORACAL 651"
      sourceLabel="Pantone"
      targetLabel="Oracal 651"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Orange 021, Black 6…"
      searchHint="ORACAL 651 is a stock range of around 60 colours, so expect larger ΔE figures than a printed-ink conversion."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone ORANGE-021-C',
        'Pantone VIOLET-C',
        'Pantone COOL-GRAY-9-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone ORANGE-021-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is ORACAL 651?"
      aboutParagraphs={[
        'ORACAL 651 Intermediate Cal is a calendered self-adhesive vinyl film made by ORAFOL in Germany. It is the workhorse permanent vinyl of the sign trade and, since the arrival of home cutting machines, of the entire craft market: if a tutorial says “use permanent vinyl”, it almost certainly means 651 or an equivalent. ORAFOL rates it for around six years outdoors, with a solvent-based permanent adhesive that is meant to stay put.',
        'The range is a stock catalogue of roughly sixty gloss colours identified by number — 010 White, 070 Black, 031 Red, 090 Silver Grey and so on — plus matt variants of the two neutrals. Unlike ink or paint, these are not mixed to order: the film is manufactured in fixed colours and you buy whichever roll is closest to what you want. That is the single most important thing to understand about matching to it.',
        'It matters to compare 651 with its sibling 631, which is the removable matt film used for wall decals and temporary signage, and with 751 and 951, the cast films used for vehicle wraps and long-term outdoor work. They are different products with different adhesives and lifespans; 651 is the intermediate permanent option, and the one Cricut and Silhouette users buy by default for mugs, tumblers, decals and outdoor lettering.',
        'Because the palette is a fixed stock range of around sixty colours against Pantone’s 1,341 coated inks, matches here are looser than a print-to-print conversion by definition. That is not a limitation of the tool — it is the actual constraint of the material. If a brand colour has no close 651 equivalent, the honest options are printed vinyl, a different film range, or accepting the nearest stock colour.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Calendered self-adhesive PVC film'],
        ['Origin', 'Pantone Inc., United States, 1963', 'ORAFOL Europe GmbH, Germany'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 60 stock gloss colours plus matt neutrals'],
        ['Mixed to order?', 'Yes — the printer mixes ink to the formula', 'No — the film is manufactured in fixed colours only'],
        ['Applied by', 'Printing press', 'Cutting plotter or craft machine, then transfer tape'],
        ['Durability', 'As durable as the substrate it is printed on', 'Rated around six years outdoors'],
        ['Used for', 'Packaging, literature, brand identity', 'Signage, decals, vehicle lettering, mugs, tumblers'],
        ['Match quality', 'Reference system for this conversion', 'Coarser by nature — a small fixed palette'],
      ]}

      useCasesIntro="Pantone-to-Oracal conversion is about finding out which roll to order when the design is already locked to a brand colour."
      useCases={[
        { title: 'Sign making and shopfronts', body: 'Fascia lettering and window graphics are cut from vinyl. The brand colour is specified in Pantone, so the sign maker needs the closest stock film before ordering.' },
        { title: 'Vehicle lettering and fleet decals', body: 'Van and trailer lettering is cut vinyl. Matching the company colour to a stock 651 roll avoids paying for printed film on a simple job.' },
        { title: 'Cricut and Silhouette projects', body: 'Home cutters work from 651 by default for permanent projects. Converting a brand or design colour tells you exactly which sheet to buy.' },
        { title: 'Tumblers, mugs and drinkware', body: 'Personalised drinkware is one of the highest-volume 651 uses. Colour matching matters when the design has to align with an existing brand.' },
        { title: 'Small-business merchandise', body: 'Etsy and market sellers producing branded decals need repeatable colours across batches, which means buying by film number rather than by eye.' },
        { title: 'Deciding between cut and printed vinyl', body: 'A poor ΔE against the whole 651 range is a clear signal the job needs printed vinyl rather than a stock cut colour.' },
      ]}

      howToIntro="Say a client wants their logo — specified as Pantone 186 C — cut as decals for a shop window. Search 186, check the closest 651 numbers, and look hard at the ΔE: if the best match is above about 5, tell the client honestly that stock vinyl will not hit their brand red and quote printed film instead."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest ORACAL 651 colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge carefully. This palette is small, so a result above 5 genuinely means no stock film is close.',
        'Copy the ORACAL colour number and name — suppliers list by both, and the numbers are consistent between them.',
        'Order a sample or a small offcut before buying a full roll, and check it against a physical Pantone chip in daylight.',
        'If nothing is close enough, switch to printed vinyl: the design is printed to your exact colour and then cut, rather than cut from a stock film.',
      ]}

      accuracyNote="ORACAL 651 values here are sRGB approximations of a pigmented plastic film, not colour-managed measurements. Vinyl adds variables print does not have: gloss film reflects strongly at a glancing angle, the substrate underneath shows through lighter colours, and outdoor exposure fades some pigments faster than others over the rated six-year life. Crucially, the film is manufactured in fixed colours and cannot be mixed to order — so if the ΔE is poor, no amount of searching will improve it."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Expect higher figures here than on the print converters: matching 1,341 Pantone inks against roughly 60 stock films means the median lands around ΔE 7. That number is telling you something real about the material, not about the matching."

      trademark={{
        system: 'ORACAL',
        owner: 'ORAFOL Europe GmbH',
        extra: 'Cricut® and Silhouette® are trademarks of their respective owners and are referenced here only to describe compatible equipment. Film colour values shown here are sRGB approximations for on-screen reference.',
      }}

      faqs={[
        {
          q: 'What is the difference between Oracal 651 and 631?',
          a: 'Adhesive and finish. ORACAL 651 is glossy with a permanent solvent adhesive rated around six years outdoors — the choice for signage, decals, tumblers and anything that needs to stay put. ORACAL 631 is matt with a removable adhesive designed to come off cleanly, which makes it the wall-decal and temporary-signage film. They are not interchangeable: 631 on a car will not last, and 651 on a painted wall will take the paint with it.',
        },
        {
          q: 'Can Oracal 651 be colour matched to any Pantone colour?',
          a: 'No. The range is a fixed stock catalogue of roughly sixty colours manufactured in bulk, not an ink mixed to order. Some Pantone colours land close, many do not. When this tool reports a high ΔE it is telling you the material genuinely cannot hit that colour — at which point the answer is printed vinyl, where the design is printed to your exact colour and then cut.',
        },
        {
          q: 'Is Oracal 651 the same as Cricut permanent vinyl?',
          a: 'Not the same product, but the same category and broadly comparable. Cricut sells its own branded permanent vinyl; ORACAL 651 is the industry-standard equivalent, generally cheaper by the roll and available in more colours. Both cut and weed on the same machines with the same settings, and many crafters use 651 precisely because it is the sign-trade original.',
        },
        {
          q: 'How long does Oracal 651 last outdoors?',
          a: 'ORAFOL rates it at around six years of outdoor durability, which assumes a properly cleaned substrate and normal exposure. Real life varies: intense UV, coastal salt air and darker or more saturated pigments all shorten it. For vehicle wraps or long-term architectural work, cast films such as ORACAL 751 or 951 are the appropriate products rather than 651.',
        },
        {
          q: 'Should I use gloss or matt vinyl for my project?',
          a: 'Gloss is the default in the 651 range and reads more saturated, which usually gets you closer to a Pantone chip. Matt scatters light, so colours look slightly lighter and flatter, but it avoids glare — useful for interior signage and anything photographed. Only a couple of the neutrals are offered in matt within 651; if you need matt across a range of colours, look at 631 or a cast matt film.',
        },
        {
          q: 'Why does my cut vinyl look different from the swatch on screen?',
          a: 'Three reasons. Glossy film reflects the room, so it looks different at every viewing angle in a way a matt printed chip does not. Lighter and more translucent colours let the substrate show through, so the same white reads differently on glass, on a black tumbler and on a painted wall. And your monitor is emitting light while the vinyl is reflecting it, which never produces an identical impression.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-oracal/', [
        '/pantone-to-siser-htv/',
        '/pantone-to-dmc/',
        '/pantone-to-copic/',
        '/pantone-to-ral/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
