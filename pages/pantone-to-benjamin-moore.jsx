import { Paintbrush } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import benjamin from '../data/benjamin.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToBenjaminMoorePage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-benjamin-moore/"
      pageTitle="Pantone to Benjamin Moore | Find Closest Paint Colour Match"
      metaDescription="Convert any Pantone PMS colour to the closest Benjamin Moore paint colour. Free ΔE-ranked matching across HC, OC, AF and Classic collections for interiors."
      h1="Pantone to Benjamin Moore Converter"
      breadcrumbLabel="Pantone to Benjamin Moore"
      heroLead="Search any Pantone spot colour and get the closest Benjamin Moore paint colours, ranked by ΔE*00. Covers the Historical, Off-White, Affinity and Classic collections used across premium US interiors."
      icon={<Paintbrush size={20} color="#15803d" />}
      iconBg="#f0fdf4"
      accentColor="#15803d"

      appName="Pantone to Benjamin Moore Converter"
      appDescription="Free browser-based tool that finds the closest Benjamin Moore paint colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Benjamin Moore colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers HC, OC, AF, CC and Classic collection codes',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour code',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={benjamin}
      systemLabel="Benjamin Moore"
      sourceLabel="Pantone"
      targetLabel="Benjamin Moore"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 7686 C, Cool Gray 9, 5535, Black 6…"
      searchHint="The collection prefix tells you where a colour comes from — HC Historical, OC Off-White, AF Affinity, CC Color Preview."
      presets={[
        'Pantone COOL-GRAY-9-C',
        'Pantone WARM-GRAY-3-C',
        'Pantone 7686-C',
        'Pantone 5535-C',
        'Pantone 448-C',
        'Pantone 186-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 7686-C', 'Pantone COOL-GRAY-9-C', 'Pantone WARM-GRAY-3-C', 'Pantone 5535-C', 'Pantone 448-C', 'Pantone BLACK-6-C']}

      aboutH2="What is Benjamin Moore?"
      aboutParagraphs={[
        'Benjamin Moore has been making paint in the United States since 1883 and occupies the premium end of the North American architectural market. It sells almost entirely through independent dealers rather than big-box retail, which is a deliberate positioning: the company competes on colour depth, pigment quality and the advice that comes with an independent paint store, rather than on shelf price.',
        'Its catalogue runs to roughly 3,500 colours, organised into named collections whose prefix appears in the code. HC is Historical Color, a curated set drawn from American architectural precedent and the source of some of its best-known colours. OC is Off-White, an unusually deep run of near-neutrals. AF is Affinity, a collection designed so that any two colours in it work together. CC is Color Preview, the saturated end of the range. Plain four-digit numbers such as 2062-10 belong to the Classic Colors system.',
        'A handful of its colours have become genuinely canonical in interior design. OC-17 White Dove and OC-65 Chantilly Lace are among the most specified whites in North America; HC-172 Revere Pewter defined a decade of warm-grey interiors; HC-154 Hale Navy is the reference deep navy for cabinetry and joinery. This converter is weighted toward those widely specified collection colours rather than attempting the entire 3,500.',
        'As with any house paint, the gap between a Pantone chip and a painted wall is real and unavoidable. Printing ink is formulated to hit one colour on paper under controlled light; wall paint is formulated to cover, to wash, and to hold up across the entire range of light a room actually sees. Benjamin Moore’s reputation rests partly on how well its colours behave under changing light, but no paint colour is a fixed value the way a printed chip is.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Tinted architectural paint on wall, trim or cabinetry'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Benjamin Moore & Co., United States, 1883'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 3,500 colours; a curated subset here'],
        ['Code structure', 'A number plus a deck suffix — 186 C', 'A collection prefix plus a number — HC-172, OC-17, AF-100'],
        ['Sold through', 'Fan decks and licensed digital libraries', 'Independent dealers rather than big-box retail'],
        ['Colour bias', 'Full spectrum including saturated brand colours', 'Deep in neutrals and off-whites; saturated colours are thinner'],
        ['What changes the look', 'Paper stock and coating', 'Sheen, room light, orientation, adjacent colours'],
        ['Bought as', 'A fan deck', 'A sample pot first, then gallons — always sample first'],
      ]}

      useCasesIntro="Converting Pantone to Benjamin Moore is the step between a brand or design reference and a paint a dealer can actually tint."
      useCases={[
        { title: 'Premium residential interiors', body: 'Designers working from a fabric, artwork or brand reference held in Pantone need the BM code before the finishes schedule can be issued.' },
        { title: 'Hospitality and boutique retail', body: 'Hotels and independent retail specify Benjamin Moore frequently. Brand colours have to be translated into codes local painters can order.' },
        { title: 'Millwork and cabinetry colour', body: 'Deep BM colours such as Hale Navy dominate painted cabinetry. Matching to a brand or scheme colour starts from the Pantone reference.' },
        { title: 'Historic and period-appropriate schemes', body: 'The HC Historical Color collection exists for exactly this work, and matching from a documented reference colour is the usual route in.' },
        { title: 'Coordinating paint with printed material', body: 'Where a painted wall sits beside printed graphics or wallpaper, working from the printed spec keeps both reading as one colour.' },
        { title: 'Writing architectural finish schedules', body: 'Specifications quote manufacturer and code. A Pantone-only reference has to be converted before it can be issued to contractors.' },
      ]}

      howToIntro="Say you are painting kitchen cabinetry to match a client’s brand navy, specified as Pantone 7686 C. Search 7686, take the top Benjamin Moore code, and get a sample pot brushed onto a spare door rather than a card — cabinetry is usually finished in a higher sheen than walls, and the same colour in semi-gloss on a vertical door reads noticeably different from a matte patch on a wall."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Benjamin Moore colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Note the collection prefix on each result — HC, OC, AF, CC or a Classic number — since dealers organise their fan decks by collection.',
        'Copy the full code including the prefix. "172" is ambiguous; "HC-172" is not.',
        'Buy sample pots of your top two candidates and paint a large test area — on a spare door or board for joinery, directly on the wall for wall colour.',
        'Assess in daylight and under the room’s actual evening lighting, in the sheen you intend to use.',
      ]}

      accuracyNote="Two limits apply. First, the material: printed ink and tinted paint are engineered for different jobs, and a painted surface shifts with room light, orientation, sheen and the colours around it in a way a printed chip never does. Second, coverage: Benjamin Moore publishes around 3,500 colours and this tool matches against a curated subset of the widely specified ones, weighted toward the HC, OC and AF collections. For a saturated brand colour there may well be a closer match in the full deck — and a dealer can often custom-tint to a physical sample, which beats any stock match."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Neutrals and muted colours will match well here; saturated brand colours will not, because that is not what an interior paint collection is built to contain. Treat the number as a filter for which sample pots to buy, never as a substitute for looking at paint on the actual surface."

      trademark={{
        system: 'Benjamin Moore',
        owner: 'Benjamin Moore & Co.',
        extra: 'Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical paint chips. Always confirm against an official Benjamin Moore colour chip or sample.',
      }}

      faqs={[
        {
          q: 'What do the Benjamin Moore code prefixes mean?',
          a: 'They identify the collection a colour belongs to. HC is Historical Color, drawn from American architectural precedent. OC is Off-White, an unusually deep run of near-neutrals. AF is Affinity, designed so any two colours in the collection coordinate. CC is Color Preview, covering the saturated end. Plain four-digit codes such as 2062-10 are Classic Colors. The prefix matters when ordering, because dealers organise fan decks by collection.',
        },
        {
          q: 'Can Benjamin Moore colour-match a Pantone chip?',
          a: 'Independent Benjamin Moore dealers can generally custom-tint to a physical sample you bring in, and for a brand colour that is usually the better route than accepting the nearest stock colour. Bring an actual Pantone chip rather than a printout, since a home or office printer will not reproduce the colour accurately. Use this tool when you need a standard code any dealer can supply without a custom mix.',
        },
        {
          q: 'Why do saturated Pantone colours match so poorly?',
          a: 'Because interior paint collections are not built to contain them. Benjamin Moore sells paint for walls, trim and cabinetry in homes and businesses, so the range is deep in neutrals, off-whites and liveable mid-tones and comparatively thin in the vivid, high-chroma colours that brand identities favour. A high ΔE here is genuine information: it means you should ask a dealer about custom tinting.',
        },
        {
          q: 'Which Benjamin Moore colours are the most popular?',
          a: 'OC-17 White Dove and OC-65 Chantilly Lace are among the most specified whites in North America — White Dove being the softer, warmer of the two. HC-172 Revere Pewter defined the warm-grey interior trend. HC-154 Hale Navy is the reference deep navy for cabinetry and built-ins, and OC-45 Swiss Coffee is a perennial warm off-white for ceilings and trim.',
        },
        {
          q: 'How is Benjamin Moore different from Sherwin-Williams?',
          a: 'Mostly distribution and positioning. Benjamin Moore sells through independent dealers and positions itself at the premium end on pigment quality and colour depth; Sherwin-Williams operates its own large store network and serves both trade and retail at scale. Both publish extensive colour collections and both can custom-tint. Which you use often comes down to which store your painter buys from.',
        },
        {
          q: 'Does the sheen change how the colour looks?',
          a: 'Yes, substantially. Matte and flat finishes scatter light and read deeper and richer; eggshell, satin and semi-gloss reflect more and read slightly lighter and cooler. This matters most on cabinetry and trim, which are usually finished in a higher sheen than the walls beside them — the same code in two sheens will not look like one colour. Always sample in the finish you intend to use.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-benjamin-moore/', [
        '/pantone-to-sherwin-williams/',
        '/pantone-to-behr/',
        '/pantone-to-farrow-and-ball/',
        '/pantone-to-ncs/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
