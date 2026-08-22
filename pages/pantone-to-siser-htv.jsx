import { Shirt } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import siser from '../data/siser.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToSiserPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-siser-htv/"
      pageTitle="Pantone to Siser HTV Converter | Heat Transfer Vinyl Match"
      metaDescription="Convert any Pantone PMS colour to the closest Siser EasyWeed HTV colour. Free ΔE-ranked matching for t-shirt printing, Cricut and garment decoration projects."
      h1="Pantone to Siser HTV Converter"
      breadcrumbLabel="Pantone to Siser HTV"
      heroLead="Search any Pantone spot colour and get the closest Siser EasyWeed heat transfer vinyl colours, ranked by ΔE*00. For t-shirt printing, team apparel and anyone pressing garments at home or in a shop."
      icon={<Shirt size={20} color="#c2410c" />}
      iconBg="#fff7ed"
      accentColor="#c2410c"

      appName="Pantone to Siser HTV Converter"
      appDescription="Free browser-based tool that finds the closest Siser EasyWeed heat transfer vinyl colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Siser EasyWeed colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers the EasyWeed stock garment range',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour name',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={siser}
      systemLabel="Siser EasyWeed"
      sourceLabel="Pantone"
      targetLabel="Siser HTV"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Orange 021, Black 6…"
      searchHint="EasyWeed is a stock range of around 50 garment colours, so expect looser matches than a printed-ink conversion."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone ORANGE-021-C',
        'Pantone VIOLET-C',
        'Pantone COOL-GRAY-9-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone ORANGE-021-C', 'Pantone VIOLET-C']}

      aboutH2="What is Siser heat transfer vinyl?"
      aboutParagraphs={[
        'Siser is an Italian manufacturer of heat transfer vinyl — the material that gets cut, weeded and pressed onto garments to produce printed t-shirts, team apparel and personalised clothing. Its EasyWeed line is the reference product in the category: named for how easily the excess film weeds away after cutting, it presses at 305°F for around 15 seconds and has become the default HTV in both commercial garment shops and the home Cricut market.',
        'HTV works differently from adhesive vinyl. It is a coloured polyurethane film on a clear carrier sheet, cut in mirror image, weeded, then heat-pressed so the film bonds into the fabric fibres rather than sticking to a surface. Once pressed it becomes part of the garment and survives washing — Siser rates EasyWeed for machine washing after 24 hours — which is why it is used for anything that has to last a season of wear.',
        'Siser identifies EasyWeed colours by name rather than number: Brilliant Blue, Cardinal, Passion Pink, Old Gold. That is worth knowing before you order, because names vary between HTV manufacturers in a way numbers would not, and a "Royal Blue" from one brand is not necessarily the same film as another brand’s. Beyond the standard range Siser makes EasyWeed Stretch, EasyWeed Electric, HTV glitter, holographic and patterned films, all pressed the same way.',
        'The stock range runs to roughly fifty colours, which is the central constraint on matching. Against Pantone’s 1,341 coated inks that is a coarse grid, so brand colours land close only sometimes. Where they do not, the alternatives are printable HTV — where the design is printed to your colour and then cut — or screen printing, which mixes ink to a Pantone formula properly.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Polyurethane film heat-bonded into fabric'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Siser S.r.l., Italy'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 50 stock EasyWeed colours'],
        ['Identified by', 'A number plus a deck suffix', 'A colour name only — no numeric code'],
        ['Mixed to order?', 'Yes — the printer mixes ink to the formula', 'No — the film comes in fixed stock colours'],
        ['Applied by', 'Printing press', 'Cutter, then heat press at around 305°F for 15 seconds'],
        ['Durability', 'As durable as the printed substrate', 'Machine washable; rated for the life of the garment'],
        ['Used for', 'Packaging, literature, brand identity', 'T-shirts, hoodies, team kit, bags, personalised apparel'],
      ]}

      useCasesIntro="Pantone-to-Siser conversion is the step between a brand specification and a roll of film you can actually press."
      useCases={[
        { title: 'Team and club apparel', body: 'Sports kit is specified in the club’s Pantone colours. Matching those to stock HTV decides whether the order can be pressed or needs screen printing.' },
        { title: 'Corporate workwear and uniforms', body: 'Branded polos and tees have to carry the company colour. Converting first avoids a rejected sample after the garments are already pressed.' },
        { title: 'Cricut and home garment projects', body: 'Home crafters buying EasyWeed by the sheet need to know which colour to order rather than guessing from a screen thumbnail.' },
        { title: 'Small-run merchandise', body: 'Below the minimums that make screen printing economic, HTV is the practical route — provided the brand colour exists in stock film.' },
        { title: 'Event and promotional shirts', body: 'One-off runs for conferences, races and fundraisers need fast turnaround from a stock colour rather than a custom ink mix.' },
        { title: 'Deciding HTV versus screen printing', body: 'A poor ΔE across the whole EasyWeed range is the clearest possible signal that the job needs screen printing with a mixed Pantone ink.' },
      ]}

      howToIntro="Say a running club wants its logo — Pantone 286 C — pressed onto race shirts. Search 286, check the closest EasyWeed colours, then press a test on an offcut of the actual garment: HTV on a heather grey tee reads differently from the same film on white, and that difference is easier to discover on a scrap than on 200 shirts."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Siser EasyWeed colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge closely — with only around 50 stock colours, a figure above 5 means no film is genuinely close.',
        'Order the colour by its Siser name, and confirm it is EasyWeed rather than another Siser line, since names repeat across product ranges.',
        'Press a test piece onto an offcut of the actual garment before running the job — lighter films let the shirt colour through and read differently on dark or heathered fabric.',
        'If nothing matches closely enough, quote printable HTV or screen printing instead, where the colour can be mixed to the Pantone formula.',
      ]}

      accuracyNote="Siser values here are sRGB approximations of a pigmented film, and garment decoration adds variables print does not have. The fabric underneath shows through lighter and thinner films, so the same colour reads differently on white, on black and on a heather blend. Heat pressing itself can shift some pigments slightly, and the film has a satin surface that reflects differently from paper. Always press a test on the actual garment before committing to a run."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. The median match across the whole Pantone coated deck sits near ΔE 8 here, which is simply what happens when you map 1,341 inks onto roughly 50 stock films. Treat a high number as useful information about the material, not as a failure of the search."

      trademark={{
        system: 'Siser',
        owner: 'Siser S.r.l.',
        extra: 'EasyWeed® is a registered trademark of Siser S.r.l. Cricut® is a trademark of its respective owner and is referenced here only to describe compatible equipment. Film colour values shown here are sRGB approximations for on-screen reference.',
      }}

      faqs={[
        {
          q: 'What is HTV and how is it different from adhesive vinyl?',
          a: 'HTV — heat transfer vinyl — is a polyurethane film on a clear carrier that is cut in mirror image, weeded, and then heat-pressed so it bonds into fabric fibres. Adhesive vinyl such as ORACAL 651 sticks to a hard surface with a glue backing and is not pressed. They are cut on the same machines but are not interchangeable: adhesive vinyl will not survive a wash cycle on a t-shirt, and HTV will not stick to a tumbler without heat.',
        },
        {
          q: 'Can Siser EasyWeed match a Pantone brand colour exactly?',
          a: 'Only by coincidence. EasyWeed is manufactured in roughly fifty stock colours, not mixed to order, so an exact Pantone match is luck rather than specification. Some brand colours land close and some do not. When this tool reports a high ΔE, the realistic options are printable HTV, where the design is printed to your colour and then cut, or screen printing with an ink mixed to the Pantone formula.',
        },
        {
          q: 'Does the shirt colour change how the HTV looks?',
          a: 'Yes, particularly for lighter and thinner films. White and pastel HTV on a black or navy garment will read darker than the same film on white, because some of the garment shows through. Heathered and marled fabrics compound this because the surface itself is two-tone. For critical colour on dark garments, press a white base layer first and put the coloured film on top.',
        },
        {
          q: 'What temperature and time does Siser EasyWeed need?',
          a: 'Siser specifies around 305°F for 10 to 15 seconds with medium pressure, peeling the carrier warm. Always check the current instructions for your specific product and garment, since Siser publishes different settings across its lines — EasyWeed Stretch, Electric and the glitter films differ — and fabric blends have their own tolerances. Under-pressing is the usual cause of film lifting in the wash.',
        },
        {
          q: 'Why does Siser use names instead of numbers?',
          a: 'It is simply how the company catalogues the range, and it is worth being careful about. Because names are not standardised across manufacturers, one brand’s "Royal Blue" is not necessarily another’s, so an HTV colour name only means something when you also say which brand and product line. When ordering, specify "Siser EasyWeed Brilliant Blue" rather than just "brilliant blue".',
        },
        {
          q: 'Should I use HTV or screen printing for a large order?',
          a: 'Screen printing usually wins on volume and on colour accuracy, because the ink is mixed to a Pantone formula and the per-unit cost drops sharply with quantity. HTV wins on small runs, on personalisation where every garment differs, and on fast turnaround with no screen setup. If your brand colour has no close EasyWeed equivalent, that tips the decision toward screen printing regardless of quantity.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-siser-htv/', [
        '/pantone-to-oracal/',
        '/pantone-to-dmc/',
        '/pantone-to-copic/',
        '/pantone-to-lab/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
