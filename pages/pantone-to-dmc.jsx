import { Scissors } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import dmc from '../data/dmc.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToDmcPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-dmc/"
      pageTitle="Pantone to DMC Converter | Find the Closest Floss Colour"
      metaDescription="Convert any Pantone PMS colour to the closest DMC embroidery floss number. Free ΔE-ranked matching across 440+ DMC threads for cross-stitch and embroidery."
      h1="Pantone to DMC Converter"
      breadcrumbLabel="Pantone to DMC"
      heroLead="Search any Pantone spot colour and get the closest DMC stranded cotton numbers, ranked by ΔE*00. Built for cross-stitch, embroidery and any project that has to turn a brand colour into thread."
      icon={<Scissors size={20} color="#be185d" />}
      iconBg="#fdf2f8"
      accentColor="#be185d"

      appName="Pantone to DMC Converter"
      appDescription="Free browser-based tool that finds the closest DMC embroidery floss number for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five DMC floss numbers for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Over 440 DMC stranded cotton colours with their shade names',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every floss number',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={dmc}
      systemLabel="DMC"
      sourceLabel="Pantone"
      targetLabel="DMC"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 3272, Cool Gray 9, Black 6…"
      searchHint="DMC is the densest palette on this site after Pantone itself, so most colours find a close thread."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone VIOLET-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is DMC embroidery floss?"
      aboutParagraphs={[
        'DMC is the reference thread of hand embroidery. The company has been making cotton thread in Mulhouse, France since 1746, and its six-strand stranded cotton — the divisible skein every cross-stitch pattern assumes — is stocked in craft shops on every continent. When a chart says “416”, it means a DMC number, and it means the same colour whether you buy the skein in Ohio or Osaka.',
        'The range runs to roughly 500 solid colours identified by number, plus White, Ecru, B5200 Snow White and a set of variegated and speciality threads. The numbering is historical rather than systematic: DMC has added and retired colours over nearly three centuries, which is why the sequence has gaps and why 310 (Black) sits nowhere near 3371 (Black Brown). You cannot infer a colour from its number the way you can with RAL or NCS — the number is a catalogue position, exactly like a Pantone number.',
        'What makes DMC particularly forgiving to match against is sheer density. With more than 440 numbered colours in this tool, the palette covers most of the visible spectrum at close intervals, including long graded runs — the greens alone step through dozens of numbered shades. That density is why Pantone-to-DMC matches land tighter than almost any other cross-reference on this site.',
        'The catch is that thread is not ink or paint. Mercerised cotton has a sheen that shifts with the light and with the direction the stitch is laid, six strands read darker than two, and the fabric colour underneath shows through the gaps. A DMC number is a reliable way to buy the right skein; it is not a promise that the finished stitching will read exactly like a printed swatch.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Mercerised six-strand cotton thread'],
        ['Origin', 'Pantone Inc., United States, 1963', 'DMC, Mulhouse, France — thread since 1746'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 500 solid numbers, 440+ covered here'],
        ['Code meaning', 'A catalogue index — 186 C tells you nothing alone', 'Also a catalogue index — the numbering is historical'],
        ['Bought as', 'A fan deck; ink is mixed to formula by the printer', 'A skein, off the peg, from any craft retailer'],
        ['What changes the look', 'Paper stock and coating', 'Strand count, stitch direction, fabric colour, thread sheen'],
        ['Used by', 'Designers, printers, brand managers', 'Cross-stitchers, embroiderers, needlepoint and craft makers'],
        ['Match quality', 'Reference system for this conversion', 'Usually close — the palette is dense and finely graded'],
      ]}

      useCasesIntro="Pantone-to-DMC conversion comes up whenever a colour that was specified on screen has to be bought as thread."
      useCases={[
        { title: 'Stitching a logo or brand mark', body: 'Corporate gifts, club badges and team merchandise start from a Pantone brand colour. Converting to DMC tells you which skeins to buy before you chart the design.' },
        { title: 'Turning a digital design into a chart', body: 'Pattern designers working in Illustrator or Procreate pick colours on screen, then need floss numbers to publish a usable chart.' },
        { title: 'Matching an existing printed item', body: 'Stitching something to sit alongside printed packaging, a book cover or a poster means matching the thread to the print, not the other way round.' },
        { title: 'Wedding and event needlework', body: 'Invitations and stationery are specified in Pantone; embroidered favours, ring pillows and keepsakes have to match them.' },
        { title: 'Selling patterns commercially', body: 'A published pattern has to list floss numbers a buyer can actually order. Screen colours alone are not a shopping list.' },
        { title: 'Substituting a discontinued colour', body: 'When a chart calls for a retired DMC number, converting through its nearest Pantone equivalent is one way to find a current replacement.' },
      ]}

      howToIntro="Say you want to stitch a company logo specified as Pantone 186 C onto a set of embroidered patches. Search 186, read the closest DMC numbers, buy the top one — and buy a second skein of the runner-up, because thread is cheap and comparing two candidates against your actual fabric under daylight is the only reliable test."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest DMC numbers, ordered from the smallest ΔE*00 colour difference upward.',
        'Check the ΔE badge: under 2 is a commercial match, 2–5 is visible side by side, above 5 the two colours read as genuinely different.',
        'Copy the DMC number for your shopping list, and note the shade name alongside it — some retailers list by name rather than number.',
        'Buy the top two or three candidates and compare the skeins against your fabric in daylight before committing to a large piece.',
        'Remember that strand count changes the result: two strands read lighter and more open than six, so test at the strand count you will actually stitch.',
      ]}

      accuracyNote="DMC values here are sRGB approximations of dyed cotton thread, and thread behaves nothing like ink on paper. Mercerised cotton has a directional sheen, so the same skein looks lighter or darker depending on how the stitch is laid and where the light falls. Strand count matters too — two strands over 14-count Aida let far more fabric colour through than six strands packed solid. Treat the number this tool gives you as the right skein to buy first, then confirm against the physical thread."
      deltaENote="Every result is ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, and above 5 the colours read as different. Across the whole Pantone coated deck the median closest-DMC match lands near ΔE 4, which is the tightest of any cross-reference on this site — the DMC range is dense enough that a close thread usually exists."

      trademark={{
        system: 'DMC',
        owner: 'DMC Corporation',
        extra: 'Floss colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical thread.',
      }}

      faqs={[
        {
          q: 'How accurate is a Pantone to DMC conversion?',
          a: 'Closer than most cross-references on this site, because the DMC range is dense — over 440 numbered colours at fine intervals — so a near neighbour usually exists. The median closest match across the whole Pantone coated deck lands around ΔE 4. What the number cannot account for is thread behaviour: sheen, strand count and the fabric showing through all shift the finished appearance, so always confirm against the physical skein.',
        },
        {
          q: 'Do DMC numbers mean anything, or are they arbitrary?',
          a: 'They are effectively arbitrary. The numbering grew over nearly three centuries as colours were added and retired, so it carries no systematic meaning — 310 is Black and 3371 is Black Brown despite sitting far apart. In that respect DMC works exactly like Pantone: the number is a catalogue position, not a description. Systems like RAL and NCS are the opposite, where the code tells you something about the colour.',
        },
        {
          q: 'How many colours does DMC make?',
          a: 'Around 500 solid stranded cotton colours, plus White, Ecru and B5200 Snow White, and a further range of variegated, satin and metallic threads that are not part of the numbered solid series. This converter matches against 440+ of the solid numbers, which covers the range that patterns and charts actually call for.',
        },
        {
          q: 'Will my finished stitching look like the Pantone swatch?',
          a: 'Close, but not identical, and that is a property of the materials rather than a matching failure. Printed ink sits flat on paper; embroidery is a three-dimensional surface of twisted, mercerised cotton that catches light differently in every direction. Add the fabric colour showing through between stitches and the effect of strand count, and the finished piece will always read slightly differently from a printed chip.',
        },
        {
          q: 'Can I convert DMC to Anchor or other thread brands?',
          a: 'Not directly with this tool, which matches Pantone against DMC. Anchor, Madeira and Cosmo all publish or have community-maintained conversion charts to DMC, so the usual route is to find the DMC number here and then cross-reference to your preferred brand. Be aware that thread-to-thread conversions carry their own approximation on top of this one.',
        },
        {
          q: 'Does the strand count change which DMC number I should pick?',
          a: 'It can. Fewer strands let more fabric colour through and read lighter and softer; six strands packed solid read closest to the skein colour. If you are stitching two strands over a dark fabric, the finished area will look noticeably deeper than the swatch suggests, so it is worth testing your top two candidates on a scrap of the actual fabric before buying in quantity.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-dmc/', [
        '/pantone-to-copic/',
        '/pantone-to-siser-htv/',
        '/pantone-to-oracal/',
        '/pantone-to-lab/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
