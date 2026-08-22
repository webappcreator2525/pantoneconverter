import { Printer } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import hks from '../data/hks.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToHksPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-hks/"
      pageTitle="Pantone to HKS Converter | Find Closest HKS Spot Colour"
      metaDescription="Convert Pantone PMS colours to the closest HKS spot colour. Free ΔE-ranked matching across the HKS K, N, E and Z decks used in German offset printing."
      h1="Pantone to HKS Converter"
      breadcrumbLabel="Pantone to HKS"
      heroLead="Search any Pantone spot colour and get the closest HKS numbers, ranked by ΔE*00. HKS is the spot-ink standard of German-language offset printing and sits alongside Pantone in most European print specifications."
      icon={<Printer size={20} color="#6d28d9" />}
      iconBg="#f5f3ff"
      accentColor="#6d28d9"

      appName="Pantone to HKS Converter"
      appDescription="Free browser-based tool that finds the closest HKS spot colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five HKS colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers the 88 HKS base numbers shared across the K, N, E and Z decks',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={hks}
      systemLabel="HKS"
      sourceLabel="Pantone"
      targetLabel="HKS"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 300, Rhodamine Red, Black 6…"
      searchHint="Both systems are spot inks for offset printing, so matches here are usually tighter than paint-standard conversions."
      presets={[
        'Pantone 186-C',
        'Pantone 300-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone RHODAMINE-RED-C',
        'Pantone ORANGE-021-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 300-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone RHODAMINE-RED-C', 'Pantone 2685-C']}

      aboutH2="What is HKS?"
      aboutParagraphs={[
        'HKS is a spot-colour ink system created in Germany in 1976 and named after its three founding ink manufacturers — Hostmann-Steinberg, Kast + Ehinger and H. Schmincke & Co. It was built to do for German-language offset printing exactly what Pantone does elsewhere: give designers, printers and ink suppliers one agreed reference so a brand colour reproduces identically regardless of who runs the job.',
        'The system is organised around 88 base colours, numbered HKS 1 through HKS 88, published across four decks matched to different paper types. HKS K is for gloss art paper, HKS N for natural and uncoated stock, HKS E for continuous stationery, and HKS Z for newsprint. A specification is therefore always written with its deck letter — HKS 43 K and HKS 43 N are the same ink formulation printed on very different surfaces, and they do not look the same.',
        'Alongside the 88 base colours, HKS publishes several thousand tonal variations in its 3000-series fan decks, which extend the base inks into tints and shades. In practice most brand work references a base number, and this converter matches against the 88 base colours because they are the ones that appear in specifications and that ink suppliers stock as standard.',
        'HKS remains genuinely dominant in Germany, Austria and Switzerland, where a printer is as likely to stock HKS inks as Pantone ones, and public-sector and institutional identities frequently specify HKS exclusively. Elsewhere in Europe it appears as a secondary reference alongside Pantone. Because both systems are pre-mixed offset inks made for coated and uncoated paper, converting between them generally produces closer matches than converting Pantone to a coating standard such as RAL.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'Germany, 1976 — Hostmann-Steinberg, Kast + Ehinger, H. Schmincke'],
        ['Both are', 'Pre-mixed spot inks for offset printing', 'Pre-mixed spot inks for offset printing'],
        ['Colour count', '1,341 in the coated deck, over 3,200 in total', '88 base colours, plus several thousand tonal variations'],
        ['Deck structure', 'C for coated, U for uncoated, plus metallic and neon decks', 'K gloss art, N natural/uncoated, E stationery, Z newsprint'],
        ['Code format', 'Number plus suffix — “Pantone 186 C”', 'Number plus deck letter — “HKS 43 K”'],
        ['Geography', 'Global standard', 'Dominant in Germany, Austria and Switzerland'],
        ['Typical specification', 'Brand guidelines worldwide', 'German-language brand books, public-sector identities'],
        ['Match quality', 'Reference system for this conversion', 'Usually a close match — both are offset inks on paper'],
      ]}

      useCasesIntro="Pantone-to-HKS conversion is routine work for anyone printing in the German-speaking market."
      useCases={[
        { title: 'Printing in Germany, Austria or Switzerland', body: 'A local printer may stock HKS inks rather than Pantone. Supplying the nearest HKS number avoids a custom ink mix and its associated cost and lead time.' },
        { title: 'German public-sector and institutional work', body: 'Government departments, universities and public broadcasters in the DACH region frequently specify HKS exclusively in their corporate design manuals.' },
        { title: 'Localising an international brand book', body: 'Global brand guidelines are written in Pantone. Adding HKS equivalents lets regional print suppliers work from the manual without querying every job.' },
        { title: 'Packaging production in central Europe', body: 'Packaging converters in the region often run HKS as their standard spot-ink library, so an HKS reference speeds up prepress approval.' },
        { title: 'Cost control on two-colour print', body: 'Where a printer already has an HKS ink on press, matching to it rather than ordering a Pantone mix can remove a washup and an ink charge from the job.' },
        { title: 'Reconciling legacy specifications', body: 'Older German brand assets exist only as HKS numbers. Converting in either direction lets a modern, Pantone-based system absorb them without losing the original colour.' },
      ]}

      howToIntro="Matching runs live in your browser — nothing is uploaded and there is no button to press."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest HKS base numbers, ordered by ΔE*00 colour difference.',
        'Add the correct deck letter to whichever number you choose — K for gloss art paper, N for natural or uncoated stock, E for continuous stationery, Z for newsprint.',
        'Check the ΔE badge: under 2 is a commercial match, 2–5 is visible side by side, above 5 the colours read as different.',
        'Copy the HKS number and confirm it against a physical HKS fan deck for the paper type you are printing on.',
      ]}

      accuracyNote="HKS and Pantone are separate, competing ink systems with no official cross-reference between them. Both are pre-mixed offset inks, which makes this conversion more reliable than matching Pantone to a coating standard, but the ink formulations are genuinely different and the two ranges do not cover identical colour space. HKS also has far fewer base colours than Pantone, so some Pantone colours have no close HKS counterpart."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000), the difference metric used in print quality control. Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Remember that the deck letter matters as much as the number here: the same HKS ink on gloss art paper (K) and on uncoated stock (N) can differ by more than the ΔE between two adjacent HKS numbers."

      trademark={{
        system: 'HKS',
        owner: 'HKS Warenzeichenverband e.V.',
        extra: 'HKS values shown here are sRGB approximations for on-screen reference, not colour-managed reproductions of the physical fan decks.',
      }}

      faqs={[
        {
          q: 'What does HKS stand for?',
          a: 'HKS is an abbreviation of the three German ink manufacturers that founded the system in 1976: Hostmann-Steinberg, Kast + Ehinger, and H. Schmincke & Co. The trademark is held by HKS Warenzeichenverband e.V., the association those companies formed to maintain the standard.',
        },
        {
          q: 'What is the difference between HKS K, N, E and Z?',
          a: 'They are four decks of the same 88 base inks, each printed on a different paper type. K is gloss art paper, N is natural and uncoated stock, E is continuous stationery, and Z is newsprint. The ink is the same; the paper changes how it looks. This is the same distinction Pantone draws between its C and U decks, but with four surfaces rather than two, which is why an HKS specification always includes the deck letter.',
        },
        {
          q: 'Is HKS better than Pantone?',
          a: 'Neither is better — they serve different markets. Pantone is the global standard with far more colours and near-universal recognition. HKS is smaller but genuinely dominant in Germany, Austria and Switzerland, where printers stock the inks and public-sector design manuals often specify it exclusively. The practical answer is to use whichever your printer stocks, because that is what removes cost and risk from the job.',
        },
        {
          q: 'How many colours does HKS have?',
          a: 'The core system has 88 base colours numbered HKS 1 to HKS 88. HKS also publishes 3000-series fan decks containing several thousand tonal variations derived from those base inks. This converter matches against the 88 base colours, since those are the ones written into specifications and stocked as standard by ink suppliers.',
        },
        {
          q: 'Can I print HKS colours using CMYK?',
          a: 'You can simulate them, with the same caveats as simulating Pantone in CMYK. A spot ink is a single pre-mixed colourant; a CMYK simulation builds an approximation from four process inks. Bright, saturated HKS colours — particularly the oranges and the blues — fall outside the CMYK gamut and will visibly disappoint. If the colour carries brand weight, print it as a spot.',
        },
        {
          q: 'Do Pantone and HKS numbers ever match exactly?',
          a: 'Occasionally a pair lands within ΔE 1 and is effectively indistinguishable, but this is coincidence rather than design. The two systems were developed independently by unrelated companies with different base inks, and neither publishes an official conversion to the other. Always treat a cross-reference as an approximation and confirm against physical fan decks before committing a brand colour.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-hks/', [
        '/pantone-to-toyo/',
        '/pantone-to-trumatch/',
        '/pantone-to-ral/',
        '/pantone-to-cmyk/',
      ])}
    />
  );
}
