import { Grid3x3 } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import trumatch from '../data/trumatch.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToTrumatchPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-trumatch/"
      pageTitle="Pantone to Trumatch Converter | Closest CMYK Deck Match"
      metaDescription="Convert Pantone spot colours to the closest Trumatch code. Free ΔE-ranked matching against the systematic four-colour CMYK deck built for process printing."
      h1="Pantone to Trumatch Converter"
      breadcrumbLabel="Pantone to Trumatch"
      heroLead="Search any Pantone spot colour and get the closest Trumatch codes, ranked by ΔE*00. Trumatch is a systematic four-colour deck, so every match comes with a printable CMYK build rather than a spot-ink formula."
      icon={<Grid3x3 size={20} color="#059669" />}
      iconBg="#ecfdf5"
      accentColor="#059669"

      appName="Pantone to Trumatch Converter"
      appDescription="Free browser-based tool that finds the closest Trumatch four-colour code for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Trumatch codes for any Pantone colour',
        'CMYK build shown alongside every match',
        'ΔE*00 colour difference and match quality for every result',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={trumatch}
      systemLabel="Trumatch"
      sourceLabel="Pantone"
      targetLabel="Trumatch"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 300, Orange 021, Cool Gray 9…"
      searchHint="Trumatch is a CMYK system, so saturated Pantone spot colours will show a larger ΔE — that gap is the process-gamut limit, not a matching error."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone 485-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is Trumatch?"
      aboutParagraphs={[
        'Trumatch is an American colour-matching system built for four-colour process printing rather than spot inks. It appeared in the late 1980s to solve a specific problem of the early desktop-publishing era: designers were choosing colours on screen and being disappointed by what came off the press, because nothing connected the on-screen choice to a predictable CMYK build.',
        'Its answer was to make the deck systematic. Trumatch arranges roughly 2,000 achievable process colours on a regular grid — around 50 hues stepped evenly around the colour wheel, each running through a ladder of tints and shades. A code such as 18-c identifies a hue and a position on that ladder, and every swatch corresponds to a specific, printable CMYK percentage build. There is no guesswork and no ink to mix; the number tells the press exactly what to lay down.',
        'That systematic construction is the real distinction from Pantone. A Pantone number is a catalogue position pointing at a pre-mixed ink recipe, and you cannot reason about the colour from the number alone. A Trumatch code describes a location on a grid, so adjacent codes are predictably related and you can move through the deck in even perceptual steps — genuinely useful when building a tonal palette or a set of related tints.',
        'Trumatch also ships as a built-in swatch library in Adobe Illustrator, Photoshop and InDesign, which keeps it in circulation long after the desktop-publishing transition that created it. It is most useful today when a job must print in process CMYK — no fifth spot unit available, or a budget that will not carry one — and the designer wants a colour they know the press can actually hit.',
      ]}

      comparisonRows={[
        ['Colour model', 'Spot inks, pre-mixed before they reach the press', 'Four-colour process — every colour is a CMYK build'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Trumatch Inc., United States, late 1980s'],
        ['Code meaning', 'A catalogue index — 186 C tells you nothing on its own', 'A grid position — hue number plus a tint/shade step'],
        ['Deck size', '1,341 coated colours, over 3,200 in total', 'Around 2,000 systematically arranged process colours'],
        ['Press requirement', 'A dedicated ink unit per spot colour', 'None — prints on any standard four-colour press'],
        ['Gamut', 'Wider — spot inks reach colours CMYK cannot', 'Limited to what four process inks can reproduce'],
        ['Consistency', 'Highly repeatable; the ink is mixed to formula', 'Depends on press calibration and paper stock'],
        ['Best for', 'Brand colours that must be exact across suppliers', 'Process jobs where the colour must be printable without a spot unit'],
      ]}

      useCasesIntro="Converting Pantone to Trumatch is about turning a spot-colour specification into something a four-colour press can deliver."
      useCases={[
        { title: 'Process-only print jobs', body: 'When the budget or the press cannot carry a fifth spot unit, a Trumatch code gives you a colour chosen from what CMYK can actually reproduce rather than a disappointing spot simulation.' },
        { title: 'Short-run and digital printing', body: 'Digital presses print process colour. Selecting from a systematic CMYK deck sets realistic expectations before the file goes to output.' },
        { title: 'Building tonal palettes', body: 'Because Trumatch steps evenly through tints and shades, it is far easier to construct a coherent range of related tones than by picking scattered Pantone numbers.' },
        { title: 'Editorial and publication design', body: 'Magazines and books print in process. Choosing section colours from a Trumatch deck guarantees the palette survives the press.' },
        { title: 'Checking whether a brand colour is printable', body: 'A large ΔE between a Pantone brand colour and its nearest Trumatch neighbour is a clear signal that the colour will not survive CMYK reproduction.' },
        { title: 'Working from an Adobe Trumatch swatch', body: 'Designers who selected from Illustrator’s built-in Trumatch library often need the Pantone equivalent when the job later moves to spot printing.' },
      ]}

      howToIntro="Matching runs live in your browser as you type."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Trumatch codes, ordered by ΔE*00 colour difference.',
        'Note the CMYK build shown with each match — that is what you enter in your layout application, and what the press will actually run.',
        'Watch the ΔE badge closely on saturated colours: a large difference means the Pantone colour falls outside process gamut and cannot be reproduced faithfully in CMYK.',
        'Copy the CMYK values into your document, then confirm against a printed proof on your production stock rather than judging from screen.',
      ]}

      accuracyNote="Trumatch is a process-colour system and Pantone is largely a spot-colour system, so this conversion crosses a real physical boundary. Spot inks reach colours — bright oranges, deep blues, vivid greens — that four process inks simply cannot mix, and when that happens the tool will report a large ΔE. That number is telling you something true and useful: the colour is not printable in CMYK, and no code in any process deck will fix it."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, and above 5 the colours read as different. Expect higher figures here than on the spot-ink converters — that gap is the process-gamut limit rather than a shortcoming of the matching. Note also that the Trumatch values on this page are a systematic reconstruction of the deck’s CMYK ladder, not a transcription of the licensed fan deck, so verify any production colour against the physical Trumatch Colorfinder."

      trademark={{
        system: 'TRUMATCH',
        owner: 'Trumatch Inc.',
        extra: 'Trumatch values shown here are generated from a systematic reconstruction of the deck’s CMYK progression for reference purposes and are not a reproduction of the licensed Trumatch Colorfinder.',
      }}

      faqs={[
        {
          q: 'What is Trumatch used for?',
          a: 'Trumatch is a colour-matching system for four-colour process printing. Every one of its roughly 2,000 swatches corresponds to a specific CMYK percentage build, so a designer can pick a colour knowing the press can reproduce it without a spot ink. It was created in the late 1980s to close the gap between what designers chose on screen and what actually came off press.',
        },
        {
          q: 'How is Trumatch different from Pantone?',
          a: 'Pantone is primarily a spot-colour system: each number points at a pre-mixed ink that requires its own unit on press. Trumatch is a process system: each code is a CMYK build that any four-colour press can produce. Pantone reaches a wider gamut and is more repeatable across suppliers; Trumatch is cheaper to print and systematically arranged, so you can move through it in even steps.',
        },
        {
          q: 'How do you read a Trumatch code?',
          a: 'A code such as 18-c has two parts. The number identifies the hue — the deck steps evenly around the colour wheel — and the letter identifies the position on that hue’s tint and shade ladder. Because the arrangement is regular, adjacent codes are predictably related, which is what makes the deck useful for building tonal palettes.',
        },
        {
          q: 'Is Trumatch still used today?',
          a: 'Less than at its peak, but it remains available as a built-in swatch library in Adobe Illustrator, Photoshop and InDesign, and it is still genuinely useful whenever a job must print in process CMYK. Much of what it originally solved is now handled by colour management and soft proofing, but the underlying idea — choose from colours you know are printable — has not gone away.',
        },
        {
          q: 'Why is the ΔE so large for my bright Pantone colour?',
          a: 'Because the colour is outside CMYK gamut. Pantone spot inks are single pre-mixed colourants that can be far more saturated than anything four process inks can build together. Bright oranges, vivid greens, deep blues and anything fluorescent are the usual offenders. A large ΔE here is a genuine warning that the colour will not survive process printing — the fix is a spot ink, not a different process code.',
        },
        {
          q: 'Should I use Trumatch or just convert Pantone to CMYK?',
          a: 'They answer different questions. Converting a Pantone colour to CMYK gives you the closest process approximation of that specific colour, gamut limits included. Choosing from Trumatch means picking a colour that was printable in the first place. If the brand colour is fixed, convert it and accept the compromise. If you are still choosing, selecting from a process deck avoids the disappointment entirely.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-trumatch/', [
        '/pantone-to-hks/',
        '/pantone-to-toyo/',
        '/pantone-to-cmyk/',
        '/cmyk-to-pantone/',
      ])}
    />
  );
}
