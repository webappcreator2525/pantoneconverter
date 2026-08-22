import { SlidersHorizontal } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import { HSV_FORMULA } from '../lib/colorFormulas';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToHsvPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-hsv/"
      pageTitle="Pantone to HSV Converter | HSB Values for Any PMS Colour"
      metaDescription="Convert any Pantone PMS colour to HSV / HSB values instantly. Get hue, saturation and brightness for Photoshop, Figma and Illustrator colour pickers — free."
      h1="Pantone to HSV Converter"
      breadcrumbLabel="Pantone to HSV"
      heroLead="Search any Pantone spot colour and get its HSV values — hue, saturation and value. HSV is the model behind the colour pickers in Photoshop, Figma, Illustrator and Sketch, where it is usually labelled HSB."
      icon={<SlidersHorizontal size={20} color="#9333ea" />}
      iconBg="#faf5ff"
      accentColor="#9333ea"

      appName="Pantone to HSV Converter"
      appDescription="Free browser-based tool that computes HSV / HSB values — hue, saturation and value — for any Pantone PMS colour."
      featureList={[
        'HSV hue, saturation and value for any Pantone colour',
        'Identical to the HSB values shown in Adobe and Figma pickers',
        'HEX, RGB, CMYK and CIELAB values shown alongside',
        'Exact calculation rather than a nearest-neighbour match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-formula"
      formula={HSV_FORMULA}
      systemLabel="HSV"
      sourceLabel="Pantone"
      targetLabel="HSV"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Cool Gray 9, Black 6…"
      searchHint="HSV and HSB are the same model — Adobe calls the third axis Brightness, most code calls it Value."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone VIOLET-C',
        'Pantone COOL-GRAY-9-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone VIOLET-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is HSV (and how does it relate to HSB)?"
      aboutParagraphs={[
        'HSV describes a colour with three intuitive numbers instead of three channel intensities. Hue is the position on the colour wheel from 0 to 360 degrees — red at 0, green at 120, blue at 240. Saturation, 0 to 100 per cent, is how much colour is present, running from grey to fully vivid. Value, also 0 to 100 per cent, is how bright it is, from black up to the fullest version of that hue.',
        'HSV and HSB are the same model under two names. Adobe labels the third axis Brightness, so Photoshop and Illustrator show HSB; most programming languages, CSS tooling and design software outside Adobe call it Value and write HSV. The numbers are identical, and this page uses them interchangeably. Both are distinct from HSL, which is a different model — HSL’s lightness axis puts pure white at the top, whereas HSV’s value axis tops out at the fully saturated hue.',
        'The model was formalised in 1978 by Alvy Ray Smith, a founder of what became Pixar, specifically to make colour selection tractable for artists. Asking someone to build orange from red, green and blue channel values is unnatural; asking them to pick a hue and then adjust how vivid and how bright it is matches how people actually think about colour. That is why nearly every colour picker in every design tool is built on it.',
        'What HSV is not is perceptually uniform. Full-value, full-saturation yellow and full-value, full-saturation blue have identical HSV coordinates on two axes but look nothing alike in brightness — yellow is dramatically lighter. For anything involving measurement, tolerance or accessibility contrast, CIELAB is the right space. HSV is a convenience for picking and adjusting colour, not for evaluating it.',
      ]}

      comparisonRows={[
        ['Type of system', 'A catalogue of physical ink formulas', 'A mathematical re-parameterisation of RGB'],
        ['Where you meet it', 'Fan decks, brand guidelines, print specifications', 'The colour picker in Photoshop, Figma, Illustrator, Sketch'],
        ['Axes', 'None — a number points at a recipe', 'Hue 0–360°, Saturation 0–100%, Value 0–100%'],
        ['Device dependence', 'Tied to specific inks and paper stocks', 'Inherits whatever RGB space it sits on — usually sRGB'],
        ['Perceptual uniformity', 'Not applicable', 'No — equal numeric steps are not equal visual steps'],
        ['Best for', 'Reproducing an exact colour across suppliers', 'Picking colours and generating tints, shades and variations'],
        ['Conversion type', 'The source in this direction', 'An exact calculation — nothing is approximated'],
        ['Naming', 'Pantone, PMS', 'HSV in most tools, HSB in Adobe — the same thing'],
      ]}

      useCasesIntro="HSV values are what you need when a brand colour has to be worked with rather than simply reproduced."
      useCases={[
        { title: 'Entering a brand colour in a design tool', body: 'Photoshop, Illustrator and Figma pickers accept HSB directly, so having the values saves converting from HEX and hunting for the exact shade.' },
        { title: 'Building tints and shades systematically', body: 'Hold the hue, drop the saturation for a tint or the value for a shade, and you get a coherent family from a single brand colour.' },
        { title: 'Generating UI colour scales', body: 'Design-system ramps are usually built by stepping saturation and value at a fixed hue, which is far more controllable than nudging HEX codes.' },
        { title: 'Constructing colour harmonies', body: 'Complementary, triadic and analogous schemes are simple hue rotations — 180 degrees, 120 degrees, or a few degrees either side.' },
        { title: 'Colour correction and grading', body: 'Photo and video tools expose hue, saturation and brightness controls directly, so knowing the target HSV makes matching footage to a brand colour straightforward.' },
        { title: 'Understanding a palette’s structure', body: 'Reading a set of brand colours as HSV quickly reveals whether they share a hue family, a saturation level, or nothing at all.' },
      ]}

      howToIntro="This conversion is arithmetic, not a match — there is no approximation and no ΔE."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the computed hue, saturation and value from the breakdown grid.',
        'Copy the full HSV string, or type the three numbers straight into your design tool — Adobe’s HSB fields take the same values.',
        'To build a tint, keep the hue and reduce saturation; to build a shade, keep the hue and reduce value.',
        'Use CIELAB rather than HSV if you need to measure a difference or check accessibility contrast — HSV is not perceptually uniform.',
      ]}

      accuracyNote="The HSV conversion itself is exact and fully reversible: HSV is a direct re-parameterisation of RGB, so no information is lost in either direction. The approximation sits one step earlier, in the sRGB value used to represent each Pantone colour on screen. Pantone spot inks can reach colours outside the sRGB gamut, and for those the on-screen equivalent — and therefore the HSV values derived from it — is already a compromise. Highly saturated Pantone colours are where this shows up most."
      deltaENote="HSV is not a measurement space and no ΔE is reported on this page, because nothing is being substituted. Be careful not to treat HSV distance as perceptual distance: two colours ten degrees apart in hue can look nearly identical in one part of the wheel and clearly different in another, and equal value numbers do not mean equal apparent brightness. When you need to quantify a colour difference, convert to CIELAB and use ΔE*00 instead."

      trademark={{
        system: 'HSV',
        owner: 'no single organisation — it is an open model, formalised by Alvy Ray Smith in 1978',
        extra: 'HSB is Adobe’s naming for the same model. Adobe, Photoshop, Illustrator and Figma are trademarks of their respective owners and are referenced here for identification only.',
      }}

      faqs={[
        {
          q: 'Is HSV the same as HSB?',
          a: 'Yes. They are two names for one model. Adobe calls the third axis Brightness and shows HSB in Photoshop and Illustrator; most other software and programming languages call it Value and write HSV. The numbers are identical, so an HSB reading from Photoshop can be used anywhere HSV is expected without conversion.',
        },
        {
          q: 'What is the difference between HSV and HSL?',
          a: 'They share a hue axis but treat the third dimension differently. In HSV, value 100% gives you the most vivid version of the hue. In HSL, lightness 100% always gives pure white and the most vivid colour sits at 50%. HSL is common in CSS, HSV in design tools. The saturation numbers also differ between the two, so the models are not interchangeable even though they look similar.',
        },
        {
          q: 'Can I enter HSV values directly into Photoshop?',
          a: 'Yes. Open the colour picker and use the H, S and B fields — Photoshop’s HSB is HSV. Enter the hue in degrees and saturation and brightness as percentages. Figma, Illustrator, Sketch and most other design tools offer the same fields, sometimes labelled HSV rather than HSB.',
        },
        {
          q: 'How do I make a lighter or darker version of a Pantone colour in HSV?',
          a: 'Keep the hue fixed. For a lighter tint, reduce the saturation — that moves the colour toward white while holding the hue. For a darker shade, reduce the value, which moves it toward black. Changing one axis at a time is what keeps a generated palette coherent, and it is far more predictable than editing HEX digits.',
        },
        {
          q: 'Why is HSV not good for measuring colour differences?',
          a: 'Because equal numeric steps do not correspond to equal visual steps. A ten-degree hue shift is very noticeable in the greens and barely visible in the blues, and full-value yellow looks far brighter than full-value blue despite identical value numbers. For measurement, tolerance or accessibility contrast, convert to CIELAB and use ΔE*00, which was designed for exactly that.',
        },
        {
          q: 'Can I convert HSV back to Pantone?',
          a: 'Yes, and the two directions behave differently. Pantone to HSV is a calculation with one answer. HSV to Pantone is a search through a finite catalogue of 1,341 coated colours, so it returns the nearest matches with a ΔE attached. The HSV to Pantone converter on this site does that, ranking the whole deck by CIEDE2000.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-hsv/', [
        '/hsv-to-pantone/',
        '/pantone-to-lab/',
        '/hex-to-pantone/',
        '/pantone-to-cmyk/',
      ])}
    />
  );
}
