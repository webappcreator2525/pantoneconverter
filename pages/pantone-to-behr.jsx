import { Brush } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import behr from '../data/behr.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToBehrPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-behr/"
      pageTitle="Pantone to Behr Converter | Find Closest Behr Paint Colour"
      metaDescription="Convert any Pantone PMS colour to the closest Behr paint colour. Free ΔE-ranked matching for Home Depot paint projects, DIY interiors and small fit-outs."
      h1="Pantone to Behr Converter"
      breadcrumbLabel="Pantone to Behr"
      heroLead="Search any Pantone spot colour and get the closest Behr paint colours, ranked by ΔE*00. For projects painted with what Home Depot stocks — DIY interiors, rentals, small-business fit-out and quick turnarounds."
      icon={<Brush size={20} color="#b45309" />}
      iconBg="#fffbeb"
      accentColor="#b45309"

      appName="Pantone to Behr Converter"
      appDescription="Free browser-based tool that finds the closest Behr paint colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Behr colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers widely specified Behr codes across the main collections',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour code',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={behr}
      systemLabel="Behr"
      sourceLabel="Pantone"
      targetLabel="Behr"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 448 C, Cool Gray 9, 7686, Black 6…"
      searchHint="Behr codes come in two shapes — grid references like N200-2 and prefixed codes like PPU18-06 or HDC-NT-14."
      presets={[
        'Pantone COOL-GRAY-9-C',
        'Pantone WARM-GRAY-3-C',
        'Pantone 448-C',
        'Pantone 7686-C',
        'Pantone 5535-C',
        'Pantone 186-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone COOL-GRAY-9-C', 'Pantone WARM-GRAY-3-C', 'Pantone 448-C', 'Pantone 7686-C', 'Pantone 5535-C', 'Pantone 186-C']}

      aboutH2="What is Behr?"
      aboutParagraphs={[
        'Behr is one of the largest paint brands in North America and is sold almost exclusively through The Home Depot, a distribution arrangement that shapes everything about how it is used. Founded in California in 1947 and now part of Masco, it competes primarily on availability and value: for a great many homeowners and small contractors, Behr is simply what paint is, because it is what the nearest store has on the shelf at nine on a Saturday morning.',
        'The colour range is large — several thousand colours across its collections — and codes come in a few different shapes. The main range uses a grid reference such as N200-2 or S180-7, where the letter and first number locate a colour family and the trailing digit indicates depth within it. Alongside that sit prefixed codes: PPU for the Premium Plus Ultra range, MQ for Marquee, and HDC for the Home Decorators Collection curated groupings.',
        'Behr also publishes an annual Color of the Year and a set of trend palettes, and its products are consistently well reviewed in independent testing — Marquee in particular has a strong reputation for one-coat coverage. The practical advantage for anyone doing a colour match is that Home Depot stores are everywhere and tint on site, so a Behr code is genuinely orderable almost anywhere in the United States and Canada at short notice.',
        'The usual caveat about house paint applies with full force here. A Pantone ink is engineered to hit one colour on paper under controlled viewing; wall paint is engineered to cover, to scrub, and to look acceptable across whatever light a real room happens to have. On top of that, Home Depot paint counters will colour-match a physical sample you bring in, which for a brand-critical colour is a better route than accepting the nearest stock code.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Tinted architectural paint on wall, trim or ceiling'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Behr Process Corporation, California, 1947'],
        ['Sold through', 'Fan decks and licensed digital libraries', 'The Home Depot, tinted in store'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Several thousand; a curated subset here'],
        ['Code structure', 'A number plus a deck suffix — 186 C', 'Grid references (N200-2) and prefixed codes (PPU18-06, HDC-NT-14)'],
        ['Colour bias', 'Full spectrum including saturated brand colours', 'Weighted toward liveable neutrals and mid-tones'],
        ['Availability', 'Global, through Pantone and licensees', 'Very wide across the US and Canada, tinted on demand'],
        ['Bought as', 'A fan deck', 'A sample pot first, then gallons — always sample first'],
      ]}

      useCasesIntro="Pantone-to-Behr conversion is about turning a specified colour into something buyable from the nearest Home Depot today."
      useCases={[
        { title: 'Small business and retail fit-out', body: 'Independent shops, cafés and studios painting to a brand colour on a tight budget and timeline need a code the local store can tint immediately.' },
        { title: 'DIY interior projects', body: 'Homeowners working from a fabric, rug or artwork whose colour is known in Pantone need a code they can hand to the paint counter.' },
        { title: 'Rental and property turnover', body: 'Landlords and property managers repainting between tenancies need repeatable, widely available colours rather than specialist tints.' },
        { title: 'Event and pop-up builds', body: 'Temporary retail, market stands and pop-ups are painted fast from whatever is locally stocked, so availability matters more than precision.' },
        { title: 'Matching paint to printed signage', body: 'Where a painted wall sits beside printed graphics, starting from the print specification keeps both reading as the same brand colour.' },
        { title: 'Deciding whether to custom-match', body: 'A poor ΔE against the standard range is the cue to take a physical Pantone chip to the paint counter and ask for a custom match instead.' },
      ]}

      howToIntro="Say you are painting an accent wall in a small studio to match a brand colour, Pantone 448 C, and the job has to be done this weekend from the local Home Depot. Search 448, take the closest Behr code, and buy an eight-ounce sample pot — paint a two-foot square on the wall and look at it that evening under the lights the room actually uses, because a deep olive under warm LED bulbs is a very different colour from the same olive at midday."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Behr colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Copy the full code including any prefix — PPU, MQ or HDC — since the paint counter works from the complete code.',
        'Check the ΔE badge, and expect larger figures on saturated brand colours than on neutrals.',
        'Buy a sample pot of your top candidate and paint a patch at least two feet square directly on the wall.',
        'If the ΔE is poor, take a physical Pantone chip to the Home Depot paint counter and ask for a custom colour match instead — the equipment there will beat any stock code.',
      ]}

      accuracyNote="Two limits apply. The material: printed ink and tinted wall paint are engineered for different purposes, and a painted surface shifts with room light, sheen and surrounding colours in a way a printed chip does not. And the coverage: Behr publishes several thousand colours and this tool matches against a curated subset of widely specified ones, weighted toward neutrals and mid-tones. There may be a closer colour in the full deck — and for a brand-critical colour, Home Depot's in-store colour matching from a physical sample will outperform any stock code."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Neutrals and muted colours match well here; saturated brand colours do not, which is true of every interior paint range on this site. Use the number to decide which sample pots to buy, and treat a physical patch on the actual wall as the real test."

      trademark={{
        system: 'Behr',
        owner: 'Behr Process Corporation',
        extra: 'The Home Depot® is a registered trademark of Home Depot Product Authority, LLC, referenced here only to describe where the product is sold. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical paint chips.',
      }}

      faqs={[
        {
          q: 'Can Home Depot match a Pantone colour?',
          a: 'Yes, and for a brand-critical colour that is the better route. Home Depot paint counters have colour-matching equipment that will read a physical sample and tint Behr paint to it. Bring an actual Pantone chip rather than a printout, since a desktop printer will not reproduce the colour accurately enough to match against. Use this tool when you want a standard code you can order repeatedly without carrying a sample around.',
        },
        {
          q: 'What do Behr colour codes mean?',
          a: 'The main range uses a grid reference — N200-2, S180-7 — where the letter and first number locate a colour family and the trailing digit indicates depth, so N200-4 is deeper than N200-2. Prefixed codes identify product ranges and curated collections: PPU is Premium Plus Ultra, MQ is Marquee, and HDC is the Home Decorators Collection. Always quote the full code, since the prefix is part of the identifier.',
        },
        {
          q: 'Is Behr paint only available at Home Depot?',
          a: 'In practice, yes, in North America. Behr is sold through The Home Depot as its exclusive retail channel, which is central to the brand’s position — the trade-off is very wide availability and in-store tinting against not being able to buy it anywhere else. Behr Pro serves contractors, but still through the same retail network.',
        },
        {
          q: 'Why does my brand colour match poorly?',
          a: 'Because retail interior paint collections are built around colours people want in their homes: neutrals, off-whites, greys and muted mid-tones. Saturated, high-chroma brand colours have few near neighbours in that space. A high ΔE is genuine information rather than a search failure — the practical answer is to take a physical Pantone chip to the paint counter for a custom match.',
        },
        {
          q: 'What is the difference between Behr Premium Plus, Ultra and Marquee?',
          a: 'They are product tiers rather than colour ranges. Premium Plus is the standard line, Premium Plus Ultra adds a paint-and-primer formulation, and Marquee is the top tier marketed on one-coat coverage and independently well reviewed for it. Most colours are available across the tiers, so the choice is about coverage, durability and price rather than which colours you can have.',
        },
        {
          q: 'How does Behr compare to Sherwin-Williams and Benjamin Moore?',
          a: 'Mainly on distribution and positioning. Behr is retail-first through Home Depot, competing on availability and value. Sherwin-Williams runs its own store network serving both trade and retail. Benjamin Moore sells through independent dealers at the premium end. All three publish large colour collections and all three can custom-tint; which you use usually comes down to where your painter buys and what the project budget allows.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-behr/', [
        '/pantone-to-sherwin-williams/',
        '/pantone-to-benjamin-moore/',
        '/pantone-to-dulux/',
        '/pantone-to-ral/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
