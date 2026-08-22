import { Shield } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import fs595 from '../data/fs595.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToFs595Page() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-federal-standard-595/"
      pageTitle="Pantone to Federal Standard 595 Converter | FS 595 Match"
      metaDescription="Convert Pantone PMS colours to the closest Federal Standard 595 chip. Free ΔE-ranked matching for US military, aerospace and defence contractor paint work."
      h1="Pantone to Federal Standard 595 Converter"
      breadcrumbLabel="Pantone to FS 595"
      heroLead="Search any Pantone spot colour and get the closest Federal Standard 595 chips, ranked by ΔE*00. FS 595 is the US government paint standard used across military aircraft, vehicles, vessels and equipment."
      icon={<Shield size={20} color="#4d7c0f" />}
      iconBg="#f7fee7"
      accentColor="#4d7c0f"

      appName="Pantone to Federal Standard 595 Converter"
      appDescription="Free browser-based tool that finds the closest FED-STD-595 colour chip for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Federal Standard 595 chips for any Pantone colour',
        'Gloss, semi-gloss and flat chips identified by their leading digit',
        'ΔE*00 colour difference and match quality for every result',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={fs595}
      systemLabel="Federal Standard 595"
      sourceLabel="Pantone"
      targetLabel="FS 595"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 448, Cool Gray 9, Black 6…"
      searchHint="FS 595 is heavily weighted toward greys, greens and tans — bright Pantone colours will show a large ΔE."
      presets={[
        'Pantone 186-C',
        'Pantone 448-C',
        'Pantone 5535-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone 7686-C',
        'Pantone BLACK-6-C',
        'Pantone 116-C',
      ]}
      exampleCodes={['Pantone 448-C', 'Pantone 5535-C', 'Pantone COOL-GRAY-9-C', 'Pantone 186-C', 'Pantone 7686-C', 'Pantone BLACK-6-C']}

      aboutH2="What is Federal Standard 595?"
      aboutParagraphs={[
        'Federal Standard 595 is the colour standard of the United States government. Introduced in 1956 to replace a patchwork of separate service specifications, it gave every federal agency and contractor one shared set of physical colour chips, so that a paint ordered for an aircraft in one state matched the same paint ordered for a vehicle in another. Its current revision is FED-STD-595C, and it holds roughly 650 colours.',
        'The five-digit code is genuinely informative once you know the rule. The first digit encodes the sheen: 1 is gloss, 2 is semi-gloss, and 3 is flat or lustreless. The second digit places the colour in a family — browns, reds, yellows, greens, blues, greys, and white or black. The final three digits identify the specific chip. That is why FS 14087, FS 24087 and FS 34087 are the same colour at gloss, semi-gloss and flat respectively, and why swapping the leading digit is how you change finish without changing colour.',
        'Some of its chips are among the most recognisable colours in the world within their field. FS 34087 is the olive drab of US military vehicles. FS 36375 Light Ghost Grey and FS 36320 Dark Compass Grey form the two-tone scheme worn by F-16 and F/A-18 fighters. FS 34031 and the tan range cover desert camouflage. Scale modellers, restorers and aviation historians use these codes as everyday vocabulary.',
        'Formally the standard has been superseded by SAE AMS-STD-595, after the US government moved several standards to industry-body stewardship. In practice the numbers did not change, contractors and suppliers still say "FS 595" or just quote the five digits, and paint is still sold against those codes. The distinction matters mainly on contract paperwork.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'US federal government, 1956; now SAE AMS-STD-595'],
        ['Purpose', 'Consistent colour in printing and brand identity', 'Consistent paint colour across government and defence procurement'],
        ['Physical form', 'Pre-mixed printing ink on paper', 'Paint chips — gloss, semi-gloss and flat coatings'],
        ['Colour count', '1,341 coated colours, over 3,200 in total', 'Around 650 chips in FED-STD-595C'],
        ['Code meaning', 'A catalogue index with a deck suffix', 'Five digits: sheen, colour family, then the specific chip'],
        ['Colour range', 'Full spectrum, including bright and fluorescent inks', 'Weighted toward greys, greens, tans and browns for camouflage'],
        ['Sheen handling', 'Coated vs uncoated paper changes appearance', 'Sheen is built into the code — 1 gloss, 2 semi-gloss, 3 flat'],
        ['Who specifies it', 'Brands, designers, printers', 'Defence contractors, aerospace, government agencies, restorers'],
      ]}

      useCasesIntro="Pantone-to-FS 595 conversion is a specialist need, but a sharply defined one."
      useCases={[
        { title: 'Defence contract deliverables', body: 'US government contracts specify paint by FS 595 number. A supplier working from a corporate Pantone palette must convert before the finish can be approved.' },
        { title: 'Aerospace and aviation liveries', body: 'Military and government aircraft schemes are defined in FS 595. Matching a commercial brand colour into that system is required for support aircraft and contractor fleets.' },
        { title: 'Ground vehicles and equipment', body: 'Military vehicles, trailers, generators and shelters are painted to FS 595 codes, often with a specified sheen for infrared signature reasons.' },
        { title: 'Scale modelling and restoration', body: 'Model paint ranges are sold against FS 595 numbers, and restorers of historic military vehicles and aircraft work from them to get period-correct finishes.' },
        { title: 'Government facility and infrastructure work', body: 'Federal buildings, marker posts and safety equipment carry FS 595 specifications for both colour and gloss level.' },
        { title: 'Camouflage and signature management', body: 'Sheen is not cosmetic in defence work — flat finishes reduce visual and infrared signature, which is why the leading digit is part of the specification.' },
      ]}

      howToIntro="Matching runs live in your browser as you type."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest FS 595 chips, ordered by ΔE*00 colour difference.',
        'Check the leading digit of the code to confirm the sheen — 1 gloss, 2 semi-gloss, 3 flat. Change that digit to keep the colour and switch finish.',
        'Watch the ΔE badge: FS 595 is dense in greys, greens and tans but sparse in bright colours, so vivid Pantone colours will report large differences.',
        'Copy the FS number, and verify it against a physical FED-STD-595 chip set before submitting it on a contract deliverable.',
      ]}

      accuracyNote="Federal Standard 595 defines physical paint chips at specific sheen levels; Pantone defines printing inks on paper. Matching between them crosses both a colourant boundary and a surface-finish boundary, and gloss level alone can shift perceived colour more than the difference between two neighbouring chips. FS 595 is also deliberately unbalanced — it is rich in the greys, greens, browns and tans that military finishing needs and thin everywhere else — so bright Pantone colours will consistently report poor matches."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 is visible side by side, above 5 reads as a different colour. Defence and aerospace paint specifications normally carry their own contractual ΔE tolerance measured against the physical chip under specified illumination — this tool's figures are a screen-based approximation and carry no contractual weight. The chip subset used here covers common FED-STD-595C colours rather than all 650."

      trademark={{
        system: 'FED-STD-595',
        owner: 'the US General Services Administration',
        extra: 'Federal Standard 595 is a US government standard, now maintained as SAE AMS-STD-595 by SAE International. Values shown here are sRGB approximations for on-screen reference and have no contractual standing.',
      }}

      faqs={[
        {
          q: 'What do the five digits in an FS 595 code mean?',
          a: 'The first digit is the sheen: 1 gloss, 2 semi-gloss, 3 flat or lustreless. The second digit identifies the colour family — browns, reds, yellows, greens, blues, greys, and white or black. The last three digits identify the specific chip. This is why FS 14087, FS 24087 and FS 34087 are the same colour at three different finishes: only the leading digit changes.',
        },
        {
          q: 'Is Federal Standard 595 still current?',
          a: 'The colours are, the document number is not, strictly speaking. FED-STD-595C was superseded by SAE AMS-STD-595 when the US government transferred stewardship to SAE International. The chip numbers and colours carried over unchanged, and contractors, paint suppliers and modellers all still refer to "FS 595" and quote the five-digit codes. The distinction matters mainly when citing a standard on contract paperwork.',
        },
        {
          q: 'How many colours are in FS 595?',
          a: 'FED-STD-595C contains roughly 650 colour chips. The distribution is deliberately skewed toward operational need — greys, greens, browns, tans and olive drabs are represented in fine gradations because that is what camouflage and military finishing require, while bright and saturated colours are sparse. This converter matches against a curated subset of the commonly specified chips.',
        },
        {
          q: 'What is FS 34087?',
          a: 'FS 34087 is olive drab in a flat finish — the classic US military vehicle green. The leading 3 marks it as lustreless. Its semi-gloss counterpart is FS 24087 and its gloss counterpart FS 14087. It is one of the most widely recognised codes in the standard and a staple of both military vehicle finishing and scale modelling.',
        },
        {
          q: 'Why do bright Pantone colours match FS 595 so poorly?',
          a: 'Because the standard was never built to contain them. FS 595 exists to specify military and government finishes, where the working range is greys, greens, tans and browns, plus a limited set of safety and marking colours. A vivid Pantone orange or magenta has no near neighbour anywhere in the deck, and the large ΔE the tool reports is an accurate description of that gap rather than a matching failure.',
        },
        {
          q: 'Can I buy paint in FS 595 colours?',
          a: 'Yes. Coatings manufacturers serving defence and aerospace supply paint certified against FS 595 numbers at specified sheens, and model paint ranges from several brands are sold explicitly against the codes. For contract work the paint must usually be certified to the relevant military specification as well as the colour number, since the specification governs durability, chemical resistance and infrared behaviour, not just appearance.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-federal-standard-595/', [
        '/pantone-to-ral/',
        '/ral-to-pantone/',
        '/pantone-to-ncs/',
        '/pantone-to-lab/',
      ])}
    />
  );
}
