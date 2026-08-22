import { Highlighter } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import copic from '../data/copic.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToCopicPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-copic/"
      pageTitle="Pantone to Copic Converter | Find the Closest Marker Code"
      metaDescription="Convert any Pantone PMS colour to the closest Copic marker code. Free ΔE-ranked matching across 280+ Copic alcohol markers for illustration and manga art."
      h1="Pantone to Copic Converter"
      breadcrumbLabel="Pantone to Copic"
      heroLead="Search any Pantone spot colour and get the closest Copic marker codes, ranked by ΔE*00. For illustrators, manga artists and designers who need to render a brand colour by hand."
      icon={<Highlighter size={20} color="#4338ca" />}
      iconBg="#eef2ff"
      accentColor="#4338ca"

      appName="Pantone to Copic Converter"
      appDescription="Free browser-based tool that finds the closest Copic alcohol marker code for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Copic marker codes for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Over 280 Copic colours across every letter family',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every marker code',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={copic}
      systemLabel="Copic"
      sourceLabel="Pantone"
      targetLabel="Copic"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Warm Gray 5, Black 6…"
      searchHint="Copic codes are readable: the letters name the family, the first digit the blending group, the second the brightness."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone ORANGE-021-C',
        'Pantone VIOLET-C',
        'Pantone COOL-GRAY-9-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone VIOLET-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What are Copic markers?"
      aboutParagraphs={[
        'Copic is a range of refillable alcohol-based markers made by Too Marker Products in Japan, launched in 1987 and originally aimed at manga artists working to deadline. They became the default professional illustration marker because of two properties: the alcohol ink blends wet-into-wet on the page, letting you build smooth gradients by hand, and the markers are refillable with replaceable nibs, so a set is a long-term investment rather than a consumable.',
        'The coding system is genuinely readable once you know the scheme, which is unusual for a colour catalogue. A letter or letter pair names the hue family — R red, B blue, G green, Y yellow, V violet, BG blue-green, YR yellow-red, E earth, and the neutral runs C for cool grey, N for neutral grey, W for warm grey. The first digit is the blending group, indicating saturation, and the second is the brightness value, where higher is darker. So R21 and R29 are the same family, with R29 far deeper — and two colours sharing a blending-group digit are designed to blend cleanly.',
        'The full range runs to 358 colours across the Sketch, Ciao and Classic marker bodies, all drawing on the same ink numbering. This converter covers 280+ of them, spanning every letter family including the three grey runs, which matter disproportionately in illustration work because shading is where most of the marker time goes.',
        'What Copic will not do is reproduce a Pantone colour exactly. Alcohol ink is transparent and builds by layering, so a single pass reads lighter than the cap and a second pass reads deeper. The paper matters enormously — the same marker on smooth marker paper and on sketchbook stock produces visibly different colours — and overlapping strokes darken where they meet. The code tells you which marker to reach for; the rendering is still down to technique.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Refillable alcohol-based marker ink'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Too Marker Products, Japan, 1987'],
        ['Range size', '1,341 coated colours, over 3,200 in total', '358 colours; 280+ covered here'],
        ['Code meaning', 'A catalogue index with no internal logic', 'Readable — family letter, blending group, brightness'],
        ['Opacity', 'Opaque ink laid at a fixed density', 'Transparent — builds darker with each layer'],
        ['What changes the look', 'Paper stock and coating', 'Paper type, number of passes, stroke overlap, blending'],
        ['Used by', 'Designers, printers, brand managers', 'Illustrators, manga and comic artists, concept designers'],
        ['Bought as', 'A fan deck; ink mixed to formula by the printer', 'Individual markers or sets, refillable indefinitely'],
      ]}

      useCasesIntro="Converting Pantone to Copic is about rendering a specified colour by hand rather than reproducing it mechanically."
      useCases={[
        { title: 'Hand-rendering a brand colour', body: 'Concept boards, storyboards and pitch artwork often need to show the client’s actual brand colour drawn by hand rather than printed.' },
        { title: 'Character and costume design', body: 'A character sheet locked to specific brand or production colours needs marker codes the whole art team can work from consistently.' },
        { title: 'Comic and manga production', body: 'Series with recurring colour schemes need every artist reaching for the same marker, which means agreeing codes up front.' },
        { title: 'Product and packaging sketching', body: 'Industrial and packaging designers marker-render concepts in the colour the product will actually be manufactured in.' },
        { title: 'Buying markers for a project', body: 'Markers are expensive and sold individually. Knowing the three codes a project actually needs beats guessing from a wall display.' },
        { title: 'Matching artwork to printed material', body: 'Original marker art destined to sit alongside printed collateral has to be drawn in colours that will not clash with the press sheet.' },
      ]}

      howToIntro="Say you are hand-rendering a concept board and the client’s brand colour is Pantone 286 C. Search 286, take the top Copic code, and swatch it on the exact paper you will use for the final board — alcohol markers shift enough between paper stocks that a swatch on the wrong sheet will mislead you."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Copic codes, ordered from the smallest ΔE*00 colour difference upward.',
        'Read the code itself to sanity-check: the letters give the family, the second digit the brightness, so R29 will always be darker than R21.',
        'Swatch your chosen marker on the paper you will actually use, at one pass and at two, because a second layer darkens the result noticeably.',
        'If the single-pass swatch reads too light, step one brightness value darker in the same family rather than switching families.',
        'For shading, pick a marker from the same blending group — matching first digits blend cleanly into one another.',
      ]}

      accuracyNote="Copic values here are sRGB approximations of alcohol ink on paper, and marker ink is transparent rather than opaque. One pass reads lighter than the marker cap, two passes read deeper, and overlapping strokes darken where they meet — so a single code does not describe a single fixed colour the way a printed Pantone chip does. Paper is the other variable: smooth marker paper, cartridge paper and sketchbook stock will each produce a visibly different result from the same marker."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Expect mid-single-digit figures for saturated Pantone colours: the Copic range is broad but far smaller than the Pantone deck, and it is weighted toward the mid-tones and skin tones illustration actually uses rather than toward brand-saturated primaries."

      trademark={{
        system: 'Copic',
        owner: 'Too Marker Products Inc.',
        extra: 'Marker colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical ink.',
      }}

      faqs={[
        {
          q: 'How do you read a Copic marker code?',
          a: 'Take BG09. The letters are the hue family — BG is blue-green; others include R red, B blue, G green, Y yellow, V violet, YR yellow-red, E earth, and C, N and W for cool, neutral and warm greys. The first digit is the blending group, which relates to saturation, and the second is the brightness value, where a higher number is darker. So R21 and R29 sit in the same family with R29 much deeper.',
        },
        {
          q: 'How many Copic colours are there?',
          a: 'The current range is 358 colours. They are sold in three marker bodies — Sketch, Ciao and Classic — but the ink numbering is shared, so R29 is the same colour whichever body it comes in. Ciao carries a smaller subset of the range at a lower price; Sketch carries the full range. This converter matches against 280+ colours spanning every letter family.',
        },
        {
          q: 'Why does my Copic marker look different from the swatch on screen?',
          a: 'Because alcohol ink is transparent and layers. A single pass sits lighter than the marker cap suggests, a second pass builds noticeably deeper, and strokes darken where they overlap. Paper compounds it — the same marker on marker paper versus sketchbook stock gives visibly different colours, because absorbent paper pulls ink in while coated marker paper holds it on the surface.',
        },
        {
          q: 'Which Copic greys should I use — C, N or W?',
          a: 'They are three parallel grey runs with different temperatures. C is cool grey with a blue cast, N is neutral grey, and W is warm grey with a slight brown cast. Which to choose depends on the colour you are shading: cool greys sit naturally under blues and greens, warm greys under reds, oranges and skin tones. Mixing runs within one drawing usually looks wrong.',
        },
        {
          q: 'Can Copic markers reproduce a Pantone colour exactly?',
          a: 'No, and no marker system can. Pantone specifies a pre-mixed opaque printing ink laid at a controlled density; Copic is transparent ink applied by hand at whatever density your technique produces. This tool finds the marker whose colour sits closest and reports the ΔE difference so you can judge whether it is close enough for the job.',
        },
        {
          q: 'What is the difference between Copic Sketch, Ciao and Classic?',
          a: 'They differ in body and nib rather than ink. Sketch has an oval barrel with a brush nib and carries the full 358-colour range. Ciao is round-barrelled, cheaper, aimed at beginners, and carries a reduced selection. Classic is the original square barrel with a fine and a broad nib. All three are refillable and use the same numbered inks, so a code from this tool applies to whichever you own.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-copic/', [
        '/pantone-to-dmc/',
        '/pantone-to-oracal/',
        '/pantone-to-hsv/',
        '/pantone-to-lab/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
