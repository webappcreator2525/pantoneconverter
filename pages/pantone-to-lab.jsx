import { FlaskConical } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import { LAB_FORMULA } from '../lib/colorFormulas';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToLabPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-lab/"
      pageTitle="Pantone to LAB Converter | Get CIELAB L*a*b* Colour Values"
      metaDescription="Convert any Pantone PMS colour to CIELAB L*a*b* values instantly. Device-independent colour coordinates for quality control, ΔE calculation and colour science."
      h1="Pantone to LAB Converter"
      breadcrumbLabel="Pantone to LAB"
      heroLead="Search any Pantone spot colour and get its CIELAB coordinates — L*, a* and b* under the D65 illuminant. CIELAB is the device-independent reference colour science and quality control are built on."
      icon={<FlaskConical size={20} color="#0f766e" />}
      iconBg="#f0fdfa"
      accentColor="#0f766e"

      appName="Pantone to LAB Converter"
      appDescription="Free browser-based tool that computes CIELAB L*a*b* coordinates for any Pantone PMS colour under the D65 illuminant and 2° standard observer."
      featureList={[
        'CIELAB L*, a* and b* values for any Pantone colour',
        'D65 illuminant with the 2° standard observer',
        'HEX, RGB, CMYK and HSV values shown alongside',
        'Exact calculation rather than a nearest-neighbour match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-formula"
      formula={LAB_FORMULA}
      systemLabel="CIELAB"
      sourceLabel="Pantone"
      targetLabel="LAB"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 186 C, 286, Cool Gray 9, Black 6…"
      searchHint="Values are computed from each Pantone colour's published sRGB equivalent, converted through XYZ under D65."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone COOL-GRAY-9-C', 'Pantone BLACK-6-C']}

      aboutH2="What is CIELAB (L*a*b*)?"
      aboutParagraphs={[
        'CIELAB, usually written L*a*b*, is a mathematical description of colour published by the Commission Internationale de l’Éclairage in 1976. Unlike RGB or CMYK it is not tied to any device: it describes what a colour looks like to a standard human observer rather than what a particular monitor or press does to produce it. That independence is why it sits underneath almost every colour-management system in use today.',
        'It has three axes. L* is lightness, running from 0 at pure black to 100 at diffuse white. a* runs from negative green to positive red. b* runs from negative blue to positive yellow. The two chromatic axes are deliberately built as opponent pairs, mirroring the way the human visual system encodes colour after the retina — you can perceive a yellowish red, but never a reddish green, and CIELAB is structured to reflect that.',
        'The design goal was perceptual uniformity: a fixed numeric distance should look like a similar amount of colour change anywhere in the space. CIELAB only partly achieves this, which is precisely why the colour-difference formulas evolved. Simple Euclidean distance is ΔE*ab, or CIE76. CIE94 and then CIEDE2000 added corrections for the regions where CIELAB’s uniformity breaks down, particularly in blues and in near-neutral colours. ΔE*00 is the metric this site ranks all its industrial-system matches by.',
        'Two details always travel with a Lab value, and it is meaningless without them: the illuminant and the observer. D65 approximates average daylight at roughly 6500 K and is the standard for graphic arts and screen work; D50 is used in some print environments. The 2° standard observer models a narrow field of view, and the 10° observer a wider one. The values on this page use D65 with the 2° observer, which is the combination Pantone, RAL and NCS all publish against.',
      ]}

      comparisonRows={[
        ['Type of system', 'A catalogue of physical ink formulas', 'A mathematical colour space — no physical samples'],
        ['Device dependence', 'Tied to specific inks and paper stocks', 'Device-independent by design'],
        ['What the value means', 'An index number pointing at a recipe', 'Coordinates describing appearance to a standard observer'],
        ['Range', '1,341 discrete coated colours', 'Continuous — every value in between is valid'],
        ['Interpolation', 'Not possible between catalogue numbers', 'Native — the space is continuous and measurable'],
        ['Used for', 'Specifying and reproducing brand colours in print', 'Quality control, ΔE tolerance, colour management, research'],
        ['Requires', 'A fan deck and controlled viewing conditions', 'An illuminant and observer to be stated — D65 / 2° here'],
        ['Measured by', 'Visual comparison against a printed guide', 'Spectrophotometer'],
      ]}

      useCasesIntro="Lab values are what you reach for when a colour has to be measured rather than described."
      useCases={[
        { title: 'Print quality control', body: 'Press operators measure printed sheets with a spectrophotometer and compare the Lab reading against the target. The ΔE between them decides whether the sheet passes.' },
        { title: 'Supplier colour tolerances', body: 'A contract that says “match Pantone 186 C” is ambiguous. One that says “ΔE*00 ≤ 2.0 against L* 45.6, a* 67.2, b* 32.1 under D65” is enforceable.' },
        { title: 'Cross-material brand consistency', body: 'Print, textile, plastic and coating suppliers all use different colourants. Lab gives them one shared target that does not assume any particular process.' },
        { title: 'Colour management and ICC profiles', body: 'ICC profiles use Lab as their profile connection space, so every conversion between two device profiles passes through it.' },
        { title: 'Textile and plastics development', body: 'Dye houses and compounders work in Lab and ΔE because visual matching across batches is unreliable at production scale.' },
        { title: 'Colour research and academic work', body: 'Perception studies, colour-difference research and standards development all express results in Lab coordinates.' },
      ]}

      howToIntro="This conversion is a calculation, not a match — there is no approximation and no ΔE, because nothing is being substituted."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the computed L*, a* and b* values, calculated under the D65 illuminant with the 2° standard observer.',
        'Copy the full Lab string for a specification, or read the individual axis values from the breakdown grid.',
        'State the illuminant and observer whenever you pass a Lab value to a supplier — a bare triple is ambiguous and cannot be verified.',
        'For contractual work, measure the physical Pantone chip with a spectrophotometer rather than relying on values derived from an sRGB equivalent.',
      ]}

      accuracyNote="The Lab values here are computed from each Pantone colour's published sRGB equivalent, converted through CIE XYZ under D65 with the 2° standard observer. The arithmetic is exact and reversible. What it cannot do is substitute for measuring the physical chip: Pantone's own spectral data for a spot ink differs from the sRGB approximation used to display it on a screen, because sRGB cannot represent every colour a spot ink can produce. For quality control, specification tolerances or anything contractual, measure the actual printed sample with a spectrophotometer."
      deltaENote="Lab is the space colour differences are calculated in. ΔE*ab (CIE76) is simple Euclidean distance between two Lab points; CIEDE2000 (ΔE*00) corrects for the regions where CIELAB is not perceptually uniform and is the modern default — it is what this site uses to rank every industrial-system match. As a guide, ΔE*00 below 1 is imperceptible, 1–2 is a commercial match, and above 5 the colours read as clearly different."

      trademark={{
        system: 'CIELAB',
        owner: 'the Commission Internationale de l’Éclairage (CIE)',
        extra: 'CIELAB is an open published standard rather than a proprietary system; the CIE reference is given for attribution. No affiliation with the CIE is implied.',
      }}

      faqs={[
        {
          q: 'What do L*, a* and b* mean?',
          a: 'L* is lightness on a 0–100 scale, where 0 is pure black and 100 is diffuse white. a* is the green-to-red axis, negative toward green and positive toward red. b* is the blue-to-yellow axis, negative toward blue and positive toward yellow. The two chromatic axes are opponent pairs, which mirrors how human vision encodes colour after the retina.',
        },
        {
          q: 'Why does a Lab value need an illuminant?',
          a: 'Because colour appearance depends on the light falling on it. The same ink measured under daylight and under tungsten produces different Lab coordinates. Stating the illuminant — D65 for daylight, D50 in some print workflows — makes the value reproducible. The observer matters too: the 2° standard observer models a narrow field of view and the 10° a wider one. Values on this page use D65 with the 2° observer.',
        },
        {
          q: 'Is CIELAB better than RGB or CMYK?',
          a: 'It answers a different question. RGB describes what a display emits, CMYK what a press lays down, and both change meaning between devices. CIELAB describes appearance independently of any device, which is what makes it the right space for measurement, tolerance and colour management — and the wrong one for telling a monitor or a press what to do.',
        },
        {
          q: 'What is ΔE and how does it relate to Lab?',
          a: 'ΔE is the distance between two colours in Lab space. The original ΔE*ab (CIE76) is straight Euclidean distance. CIEDE2000 (ΔE*00) adds corrections for the areas where Lab is not perceptually uniform, especially blues and near-neutrals, and is the modern standard. Rule of thumb: under 1 is imperceptible, 1–2 is a commercial match, 2–5 is visible side by side, above 5 reads as a different colour.',
        },
        {
          q: 'Can I convert LAB back to Pantone?',
          a: 'Yes, though the two directions are not symmetrical. Pantone to Lab is a calculation with one right answer. Lab to Pantone is a search for the nearest colour in a finite catalogue, so it returns a closest match with a ΔE attached. The LAB to Pantone converter on this site does exactly that, ranking the whole coated deck by CIEDE2000.',
        },
        {
          q: 'Are these the same Lab values Pantone publishes?',
          a: 'Close, but not identical, and the difference matters for measurement work. Pantone measures its physical inks spectrally; the values here are computed from the sRGB equivalent used to display each colour on screen. Since sRGB cannot represent every colour a spot ink produces, saturated colours in particular will differ. Use these figures for design and comparison work, and measured spectral data for quality control.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-lab/', [
        '/lab-to-pantone/',
        '/pantone-to-hsv/',
        '/pantone-to-ncs/',
        '/compare/',
      ])}
    />
  );
}
