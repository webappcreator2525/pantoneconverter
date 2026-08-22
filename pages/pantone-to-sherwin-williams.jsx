import { PaintRoller } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import sherwin from '../data/sherwin.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToSherwinPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-sherwin-williams/"
      pageTitle="Pantone to Sherwin-Williams | Find Closest Paint Colour"
      metaDescription="Convert any Pantone PMS colour to the closest Sherwin-Williams paint colour. Free ΔE-ranked matching for interior design, retail fit-out and brand environments."
      h1="Pantone to Sherwin-Williams Converter"
      breadcrumbLabel="Pantone to Sherwin-Williams"
      heroLead="Search any Pantone spot colour and get the closest Sherwin-Williams paint colours, ranked by ΔE*00. For interior designers, retail fit-out teams and anyone taking a brand colour onto a wall."
      icon={<PaintRoller size={20} color="#1d4ed8" />}
      iconBg="#eff6ff"
      accentColor="#1d4ed8"

      appName="Pantone to Sherwin-Williams Converter"
      appDescription="Free browser-based tool that finds the closest Sherwin-Williams paint colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Sherwin-Williams colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'SW numbers and colour names for every match',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every SW number',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={sherwin}
      systemLabel="Sherwin-Williams"
      sourceLabel="Pantone"
      targetLabel="Sherwin-Williams"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, Cool Gray 9, Warm Gray 3, Black 6…"
      searchHint="House paint decks are weighted toward liveable neutrals, so muted Pantone colours match far better than saturated ones."
      presets={[
        'Pantone COOL-GRAY-9-C',
        'Pantone WARM-GRAY-3-C',
        'Pantone 7686-C',
        'Pantone 5535-C',
        'Pantone 186-C',
        'Pantone 448-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone COOL-GRAY-9-C', 'Pantone WARM-GRAY-3-C', 'Pantone 7686-C', 'Pantone 5535-C', 'Pantone 448-C', 'Pantone 186-C']}

      aboutH2="What is Sherwin-Williams?"
      aboutParagraphs={[
        'Sherwin-Williams is one of the largest coatings manufacturers in the world, founded in Cleveland in 1866 and now operating thousands of company-owned stores across North America alongside a substantial industrial and marine coatings business. For interior and architectural work in the United States it is a default specification: if a designer names a paint colour on a US project, there is a good chance it carries an SW number.',
        'Its consumer-facing Color Collection runs to roughly 1,700 colours, each with a four-digit SW number and a name — SW 7008 Alabaster, SW 7015 Repose Gray, SW 6258 Tricorn Black. The numbers are catalogue positions rather than a systematic code, so you cannot read a colour from its number; the name and the chip do the work. Sherwin-Williams also publishes curated groupings, most visibly its annual Color of the Year and the Colormix forecast palettes, which drive a lot of what actually gets specified.',
        'The company is unusually influential over what American interiors look like, largely through a small number of enormously popular neutrals. SW 7008 Alabaster, SW 7015 Repose Gray, SW 7029 Agreeable Gray and SW 7036 Accessible Beige between them cover a startling proportion of painted walls in recent US residential work. This converter is weighted toward those heavily specified neutrals, greys and off-whites rather than attempting the entire deck.',
        'The thing to understand before matching is that house paint and printing ink are built for different jobs. A Pantone ink is engineered to reproduce one exact colour on paper under controlled viewing conditions. Wall paint is engineered to cover, to scrub clean, and to look acceptable across the wildly varying light of a real room — north-facing daylight, warm evening lamps, and everything between. That difference is why a wall never quite looks like the swatch.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Tinted architectural paint on wall, trim or ceiling'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Sherwin-Williams, Cleveland, United States, 1866'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 1,700 in the Color Collection; a curated subset here'],
        ['Code meaning', 'A catalogue index — 186 C tells you nothing alone', 'Also a catalogue index — SW 7015 is a position, not a description'],
        ['Colour bias', 'Full spectrum including saturated brand colours', 'Weighted heavily toward liveable neutrals and off-whites'],
        ['Mixed to order?', 'Yes — the printer mixes ink to the formula', 'Yes — tinted at the store from a base plus colourant'],
        ['What changes the look', 'Paper stock and coating', 'Sheen, room light, wall orientation, surrounding colours'],
        ['Bought as', 'A fan deck', 'A sample pot first, then gallons — always sample first'],
      ]}

      useCasesIntro="Pantone-to-Sherwin-Williams conversion comes up whenever a brand identity has to be built rather than printed."
      useCases={[
        { title: 'Retail and hospitality fit-out', body: 'A brand rolling out stores or restaurants needs its Pantone identity translated into a paint colour every regional contractor can buy from a local SW store.' },
        { title: 'Office and workplace branding', body: 'Accent walls, meeting rooms and reception areas built to a corporate palette need SW numbers on the finishes schedule, not PMS numbers.' },
        { title: 'Trade show and exhibition builds', body: 'Stand walls are painted while the graphics are printed. Both have to read as the same brand colour under exhibition lighting.' },
        { title: 'Matching paint to printed material', body: 'When wall colour has to sit beside printed signage, packaging or wallpaper, converting from the printed spec is the reliable starting point.' },
        { title: 'Residential design from a fabric or artwork', body: 'Designers frequently work from a textile or print whose colour is known in Pantone and need the paint equivalent for the walls.' },
        { title: 'Writing a specification document', body: 'Architectural finish schedules quote manufacturer and colour number. A Pantone-only brand book has to be translated before it can be issued.' },
      ]}

      howToIntro="Say a café brand specifies Pantone 5535 C for its interior walls and the contractor works exclusively with Sherwin-Williams. Search 5535, take the top two SW numbers, and buy sample pots of both — paint a large square on the actual wall and look at it in morning light and under the evening lighting the room will really use, because a deep green that reads perfectly at noon can go flat and grey under warm bulbs."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Sherwin-Williams colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge, and expect larger figures for saturated brand colours — the deck is built around liveable neutrals.',
        'Copy the SW number and name. Stores work from the number, so quote it rather than the name alone.',
        'Buy sample pots of your top two candidates and paint a large test patch — at least two feet square — on the actual wall.',
        'Look at the patch in daylight and under the room’s evening lighting before committing. Sheen matters too: the same colour reads deeper in matte than in eggshell or satin.',
      ]}

      accuracyNote="Two limits apply here. First, the material: printing ink on paper and tinted paint on a wall are engineered for different purposes and never look identical, and a wall colour shifts substantially with room light, orientation, sheen level and the colours around it. Second, coverage: Sherwin-Williams publishes around 1,700 colours and this tool matches against a curated subset of the widely specified ones, weighted toward the neutrals, greys and off-whites that dominate real specification. A saturated brand colour may well have a closer match somewhere in the full deck than anything shown here."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Expect high figures for saturated Pantone colours and low ones for neutrals — that pattern reflects what house paint decks actually contain. Whatever the number says, a physical sample on the actual wall is the only test that counts, because ΔE cannot model what a north-facing room does to a colour at four in the afternoon."

      trademark={{
        system: 'Sherwin-Williams',
        owner: 'The Sherwin-Williams Company',
        extra: 'SW colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical paint chips. Always confirm against an official Sherwin-Williams colour chip or sample.',
      }}

      faqs={[
        {
          q: 'Can Sherwin-Williams match a Pantone colour exactly?',
          a: 'Sherwin-Williams stores can often tint a custom colour to a sample you bring in, which is a different and better route than picking the nearest stock colour. Ask about custom colour matching and bring a physical Pantone chip rather than a printout. This tool finds the closest colour in the standard collection, which is the right answer when you need something orderable from any store without a custom mix.',
        },
        {
          q: 'Why is the ΔE so high for my brand colour?',
          a: 'Because house paint decks are not built to contain saturated brand colours. Sherwin-Williams sells paint for rooms people live and work in, so the collection is weighted heavily toward neutrals, off-whites, greys and muted mid-tones. A vivid Pantone red or electric blue has few near neighbours in that space. A high ΔE is a genuine signal that you should ask about a custom tint rather than accept a stock colour.',
        },
        {
          q: 'What do the SW numbers mean?',
          a: 'They are catalogue positions rather than a descriptive code. SW numbers in the current Color Collection run roughly from 6000 to 9000, but the number tells you nothing about hue, lightness or saturation — SW 7015 Repose Gray and SW 7016 Mindful Gray are adjacent numbers and related colours, but that adjacency is not guaranteed across the deck. The name and the physical chip carry the meaning.',
        },
        {
          q: 'Does paint sheen change the colour?',
          a: 'Noticeably. The same tint reads deeper and richer in a flat or matte finish, which scatters light, and lighter and slightly washed out in satin or semi-gloss, which reflects it. Trim painted in semi-gloss beside a wall in matte using the identical colour will not look identical. Always sample in the sheen you actually intend to use.',
        },
        {
          q: 'How big should my paint sample patch be?',
          a: 'At least two feet square, and ideally painted directly on the wall rather than on a small card. Colour perception is strongly affected by surrounding context and by scale — a chip held against a white wall reads completely differently from the same colour covering that wall. Paint patches on more than one wall in the room, since orientation changes the light falling on each.',
        },
        {
          q: 'Which Sherwin-Williams colours are most commonly specified?',
          a: 'A handful of neutrals dominate US residential work: SW 7008 Alabaster and SW 7005 Pure White among the whites, SW 7015 Repose Gray and SW 7029 Agreeable Gray among the greys, SW 7036 Accessible Beige in the warmer neutrals, and SW 6258 Tricorn Black for doors, trim and cabinetry. Between them they account for a remarkable share of specified interior paint.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-sherwin-williams/', [
        '/pantone-to-benjamin-moore/',
        '/pantone-to-behr/',
        '/pantone-to-dulux/',
        '/pantone-to-ral/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
