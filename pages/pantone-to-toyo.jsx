import { Stamp } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import toyo from '../data/toyo.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToToyoPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-toyo/"
      pageTitle="Pantone to TOYO Converter | TOYO Color Finder Code Match"
      metaDescription="Convert Pantone PMS colours to the closest TOYO Color Finder code. Free ΔE-ranked matching for Japanese offset printing, packaging and Asian print production."
      h1="Pantone to TOYO Converter"
      breadcrumbLabel="Pantone to TOYO"
      heroLead="Search any Pantone spot colour and get the closest TOYO Color Finder codes, ranked by ΔE*00. TOYO is the spot-colour standard of Japanese offset printing and appears in Illustrator and InDesign as a built-in swatch library."
      icon={<Stamp size={20} color="#be123c" />}
      iconBg="#fff1f2"
      accentColor="#be123c"

      appName="Pantone to TOYO Converter"
      appDescription="Free browser-based tool that finds the closest TOYO Color Finder spot colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five TOYO Color Finder codes for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={toyo}
      systemLabel="TOYO Color Finder"
      sourceLabel="Pantone"
      targetLabel="TOYO"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 300, Orange 021, Black 6…"
      searchHint="Both systems are offset spot inks, so a good Pantone colour usually finds a workable TOYO neighbour."
      presets={[
        'Pantone 186-C',
        'Pantone 300-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone ORANGE-021-C',
        'Pantone VIOLET-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 300-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone ORANGE-021-C', 'Pantone VIOLET-C']}

      aboutH2="What is the TOYO Color Finder?"
      aboutParagraphs={[
        'The TOYO Color Finder is the spot-colour system published by TOYO INK, one of Japan’s largest ink manufacturers. It plays the role in Japanese commercial printing that Pantone plays in the West: a shared library of pre-mixed offset inks, published as a fan deck, that lets a designer, a prepress operator and a press operator all mean the same colour when they quote a code.',
        'Colours are identified with a CF prefix and a four-digit number — CF0001 through roughly CF1050 in the main Color Finder deck. TOYO INK also publishes companion systems, most notably the TOYO 94 Color Finder and the Pantone-independent TOYO Color Collection, along with specialist ranges for packaging and metallic inks. The Color Finder deck is the one built into Adobe Illustrator, Photoshop and InDesign as a standard swatch library, which is how most designers outside Japan first encounter it.',
        'TOYO matters commercially because so much consumer packaging and printed matter is produced in Japan and across east Asia. A brand printing cartons, labels or literature with a Japanese converter will frequently find that TOYO inks are what the press actually runs, and that specifying a TOYO code removes a custom-mix charge and a lead-time risk from the job.',
        'Like HKS, TOYO is a direct functional analogue of Pantone rather than a different kind of standard: both are pre-mixed offset inks printed on paper. That shared physical basis is why cross-matching between them behaves better than matching Pantone to a paint or coating standard, where the colourants and substrates have nothing in common.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'TOYO INK, Japan'],
        ['Both are', 'Pre-mixed spot inks for offset printing', 'Pre-mixed spot inks for offset printing'],
        ['Code format', 'Number plus deck suffix — “Pantone 186 C”', 'CF prefix plus four digits — “TOYO CF0322”'],
        ['Deck size', '1,341 coated colours, over 3,200 in total', 'Around 1,050 colours in the main Color Finder deck'],
        ['Primary market', 'Global, strongest in Western print and branding', 'Japan and east Asia — packaging, publishing, commercial print'],
        ['Software support', 'Built into all major Adobe applications', 'Built into Adobe Illustrator, Photoshop and InDesign as standard'],
        ['Companion systems', 'Metallic, pastel, neon and skin-tone decks', 'TOYO 94 Color Finder, TOYO Color Collection, packaging ranges'],
        ['Match quality', 'Reference system for this conversion', 'Usually workable — both are offset inks on paper'],
      ]}

      useCasesIntro="Converting Pantone to TOYO is standard practice for anyone manufacturing printed goods in Japan or the wider Asian market."
      useCases={[
        { title: 'Packaging produced in Japan', body: 'Japanese carton and label converters commonly run TOYO inks. Supplying a TOYO code rather than a Pantone number avoids a custom mix, a minimum ink order and an approval round.' },
        { title: 'Asian market print production', body: 'Printers across east Asia hold TOYO libraries. A brand rolling out regional collateral gets faster quotes and fewer queries by specifying in the local system.' },
        { title: 'Localising global brand guidelines', body: 'International brand books are written in Pantone. Adding TOYO equivalents lets regional suppliers work directly from the manual.' },
        { title: 'Working from an Adobe TOYO swatch', body: 'Designers who picked a colour from Illustrator’s built-in TOYO library often need the Pantone equivalent for a Western supplier — this converter answers the reverse question too.' },
        { title: 'Publishing and editorial print', body: 'Japanese book and magazine production uses TOYO spot inks for covers and special sections, so imported designs need translating before prepress.' },
        { title: 'Supply-chain cost control', body: 'Where a converter already has a TOYO ink on press, matching to it can remove a washup and an ink charge from a multi-colour job.' },
      ]}

      howToIntro="Matching runs live in your browser as you type."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest TOYO Color Finder codes, ordered by ΔE*00 colour difference.',
        'Check the ΔE badge on each result: under 2 is a commercial match, above 5 the colours read as genuinely different.',
        'Copy the TOYO code for your specification or prepress file.',
        'Confirm the chosen code against a physical TOYO Color Finder fan deck, or ask your converter to pull an ink drawdown before the run.',
      ]}

      accuracyNote="TOYO and Pantone are independent commercial ink systems with no official cross-reference between them. Both are offset spot inks on paper, which makes this conversion more dependable than matching Pantone to a coating standard, but the base ink formulations differ and the two ranges do not cover identical colour space. The TOYO values used on this page are a curated sRGB approximation of the Color Finder deck rather than a complete, colour-managed transcription, so treat every result as a starting point for a physical check."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000), the metric used in print quality control. Below 1 is imperceptible, 1–2 counts as a commercial match, 2–5 is visible when the colours are placed side by side, and above 5 most viewers call them different colours. For packaging work, ask your converter what ΔE tolerance they hold on press — it is usually tighter than the difference between two adjacent codes in either deck."

      trademark={{
        system: 'TOYO',
        owner: 'TOYO INK SC HOLDINGS CO., LTD.',
        extra: 'TOYO Color Finder® is a product of TOYO INK. Values shown here are sRGB approximations for on-screen reference, not colour-managed reproductions of the physical fan deck.',
      }}

      faqs={[
        {
          q: 'What is the TOYO Color Finder used for?',
          a: 'It is the spot-colour ink library of Japanese commercial printing — the reference a designer, prepress operator and press operator share so that a specified colour reproduces consistently. It covers around 1,050 pre-mixed offset inks identified by CF codes, and is used across Japanese and east Asian packaging, publishing and commercial print production.',
        },
        {
          q: 'Is TOYO available in Adobe Illustrator?',
          a: 'Yes. TOYO Color Finder ships as a built-in swatch library in Illustrator, Photoshop and InDesign, alongside Pantone, HKS, DIC and others. You will find it under the swatch library menu in the colour books section. That built-in availability is how most designers outside Japan first come across the system.',
        },
        {
          q: 'How does TOYO compare to Pantone?',
          a: 'They are functional equivalents built for different markets. Both publish pre-mixed offset spot inks as numbered fan decks. Pantone is the global standard with a larger range and near-universal recognition; TOYO is dominant in Japan and widely stocked across east Asia. Which one to specify is a question of where the job is being printed, not which system is technically superior.',
        },
        {
          q: 'What is the difference between TOYO and DIC?',
          a: 'They are two competing Japanese spot-colour systems. TOYO Color Finder is published by TOYO INK; the DIC Color Guide is published by DIC Corporation, formerly Dainippon Ink and Chemicals. Both are widely used in Japanese printing and both ship as built-in Adobe swatch libraries. Japanese printers typically hold one or the other as their house system, so it is worth asking your converter which they run before specifying.',
        },
        {
          q: 'Can I convert TOYO back to Pantone?',
          a: 'Yes, the same colour-difference logic works in either direction. Because the Pantone coated deck is larger than the TOYO Color Finder, going from TOYO to Pantone generally lands closer than the reverse. If you picked a colour from Illustrator’s TOYO library and need a Pantone number for a Western printer, take the TOYO HEX value and run it through the HEX to Pantone converter.',
        },
        {
          q: 'Do I need TOYO if I am printing outside Japan?',
          a: 'Usually not. Printers in Europe and North America stock Pantone, and in German-speaking markets often HKS as well. TOYO becomes relevant when part of your supply chain is Japanese or east Asian — most commonly packaging production — or when you have inherited artwork that was specified in TOYO and need to bring it into a Pantone-based system.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-toyo/', [
        '/pantone-to-hks/',
        '/pantone-to-trumatch/',
        '/pantone-to-lab/',
        '/pantone-to-cmyk/',
      ])}
    />
  );
}
