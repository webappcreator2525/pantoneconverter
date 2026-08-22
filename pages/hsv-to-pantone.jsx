import { SlidersHorizontal } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import { HSV_FORMULA } from '../lib/colorFormulas';
import { relatedFor } from '../lib/converterLinks';

export default function HsvToPantonePage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/hsv-to-pantone/"
      pageTitle="HSV to Pantone Converter | Match HSB Values to PMS Colour"
      metaDescription="Enter hue, saturation and value and find the closest Pantone PMS colour, ranked by ΔE*00. Free HSB to Pantone tool for Photoshop, Figma and Illustrator users."
      h1="HSV to Pantone Converter"
      breadcrumbLabel="HSV to Pantone"
      heroLead="Enter hue, saturation and value — the same numbers Photoshop and Figma show as HSB — and get the closest Pantone colours ranked by ΔE*00 colour difference."
      icon={<SlidersHorizontal size={20} color="#c026d3" />}
      iconBg="#fdf4ff"
      accentColor="#c026d3"

      appName="HSV to Pantone Converter"
      appDescription="Free browser-based tool that finds the closest Pantone PMS colour for any HSV or HSB value, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Pantone colours for any HSV / HSB value',
        'ΔE*00 colour difference and match quality for every result',
        'Sliders and numeric entry for hue, saturation and value',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'Save any Pantone result to your colour library',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="formula-to-pantone"
      formula={HSV_FORMULA}
      systemLabel="HSV"
      sourceLabel="HSV"
      targetLabel="Pantone"
      searchLabel="Enter HSV / HSB values"
      searchHint="These are the same numbers Photoshop and Illustrator show in their H, S and B fields — copy them straight across."
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone VIOLET-C', 'Pantone COOL-GRAY-9-C']}

      aboutH2="What is HSV, and why match it to Pantone?"
      aboutParagraphs={[
        'HSV describes colour with three numbers built around how people actually think about it. Hue is a position on the colour wheel from 0 to 360 degrees. Saturation, 0 to 100 per cent, is how vivid the colour is. Value, also 0 to 100 per cent, is how bright. Adobe calls the third axis Brightness and labels the model HSB, but the numbers are identical — an HSB reading from Photoshop is an HSV value.',
        'The conversion to Pantone is the moment a screen decision meets a printed one. A designer picks a colour in Figma or Photoshop by dragging around the picker, arrives at something that works, and then has to hand a printer a spot-ink specification. HSV is where the colour was chosen; Pantone is what the press needs. Bridging the two is one of the most common jobs in a print-adjacent design workflow.',
        'It also comes up when adapting a digital-first brand for physical output. Plenty of identities are designed entirely on screen, with colours defined in HEX or picked visually, and only later need packaging, signage or merchandise. Working back from the HSV coordinates to the nearest PMS colour is the first step in producing a brand book a print supplier can actually use.',
        'The important limitation is that HSV carries no information about printability. It is a re-parameterisation of RGB, so it can describe screen colours far more saturated than any ink can reproduce. When a vivid on-screen colour returns a poor match here, that is not a failure of the tool — it is the gamut boundary between an emissive display and pigment on paper, showing up as a number.',
      ]}

      comparisonRows={[
        ['Type of system', 'A finite catalogue of 1,341 coated ink colours', 'A continuous mathematical model over RGB'],
        ['Where it comes from', 'A fan deck or a brand specification', 'A colour picker in Photoshop, Figma or Illustrator'],
        ['Axes', 'None — a number points at a recipe', 'Hue 0–360°, Saturation 0–100%, Value 0–100%'],
        ['Physical realisability', 'Every colour is a real, mixable ink', 'Can describe screen colours no ink can reproduce'],
        ['Precision of the match', 'Discrete — you get the nearest catalogue entry', 'Continuous — any value between two points is valid'],
        ['Result of conversion', 'A closest match plus a ΔE difference', 'An exact calculation in the other direction'],
        ['Best for', 'Specifying colour a printer can reproduce', 'Choosing colour and generating tints and shades'],
        ['Also known as', 'PMS', 'HSB in Adobe applications — the same model'],
      ]}

      useCasesIntro="This direction turns a screen-side colour decision into something a print supplier can quote against."
      useCases={[
        { title: 'Taking a design-tool colour to print', body: 'A colour chosen by eye in Figma or Photoshop needs a PMS number before it can be printed as a spot. The HSB values from the picker go straight into the fields above.' },
        { title: 'Adapting a digital-first brand for physical output', body: 'Identities designed on screen often have no print specification. Converting the picker values gives a defensible starting point for packaging and signage.' },
        { title: 'Checking whether a screen colour is printable', body: 'A poor ΔE on a vivid colour is an early warning that the shade lives outside print gamut and will need rethinking rather than reproducing.' },
        { title: 'Merchandise and apparel production', body: 'Garment printers and embroiderers work in Pantone. Converting the brand’s on-screen colour avoids a mismatch discovered at sampling stage.' },
        { title: 'Building a print palette from a UI scale', body: 'Design-system ramps are usually generated by stepping saturation and value. Converting each step finds the Pantone equivalents for printed collateral.' },
        { title: 'Briefing a print supplier quickly', body: 'Handing over a PMS number rather than a screenshot removes an entire round of colour queries from the start of a job.' },
      ]}

      howToIntro="Drag the sliders to explore or type exact values into the number fields — the match updates as you go."
      howToSteps={[
        'Enter the hue in degrees, from 0 to 360 — red sits at 0, green at 120 and blue at 240.',
        'Enter saturation as a percentage, from 0 for grey to 100 for fully vivid.',
        'Enter value (brightness) as a percentage, from 0 for black to 100 for the brightest version of that hue.',
        'Read the five closest Pantone coated colours, ordered by ΔE*00 difference from your input.',
        'Check the ΔE on the top result: under 2 is a commercial match, above 5 means the colour you picked has no close printable equivalent.',
        'Confirm the chosen PMS number against a physical Pantone guide — screens are backlit and paper is not, so a monitor comparison will mislead you.',
      ]}

      accuracyNote="HSV describes colour on a screen, and Pantone describes ink on paper. A display emits light while print reflects it, so the two can never look identical under any conditions, and a display can produce saturated colours that no spot ink reaches. Matching here runs against each Pantone colour's sRGB equivalent, which is itself an approximation for the most saturated inks. Treat a good result as a strong starting point and confirm it on a physical guide before specifying."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000), computed in CIELAB rather than in HSV — HSV distance is not perceptual, so ranking by it would produce misleading results. Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, and above 5 the colours read as different. Expect larger figures for highly saturated inputs: that gap is the boundary between screen gamut and print gamut, not a shortcoming of the matching."

      trademark={{
        system: 'HSV',
        owner: 'no single organisation — it is an open model, formalised by Alvy Ray Smith in 1978',
        extra: 'HSB is Adobe’s naming for the same model. Adobe, Photoshop, Illustrator and Figma are trademarks of their respective owners and are referenced here for identification only.',
      }}

      faqs={[
        {
          q: 'Where do I find HSV values in Photoshop or Figma?',
          a: 'Open the colour picker. In Photoshop and Illustrator the H, S and B fields are HSB, which is the same model as HSV — copy those three numbers straight into the fields above. Figma shows an HSB or HSL toggle in its picker; make sure it is set to HSB before reading the numbers, since HSL uses a different third axis and will give the wrong result.',
        },
        {
          q: 'Is HSB the same as HSV?',
          a: 'Yes, exactly. Adobe named the third axis Brightness and everyone else named it Value, but the model and the numbers are identical. There is no conversion needed between HSB and HSV. HSL is a genuinely different model and should not be substituted.',
        },
        {
          q: 'Why does my bright screen colour match Pantone poorly?',
          a: 'Because displays emit light and ink reflects it. A monitor can show colours far more saturated than any pigment can produce, so intensely vivid greens, oranges, cyans and magentas have no close spot-ink equivalent. A high ΔE here is an accurate warning that the colour will disappoint in print — the answer is to choose a printable colour rather than to hunt for a better match.',
        },
        {
          q: 'Should I use HSV or HEX to find a Pantone match?',
          a: 'They give the same answer, since both describe the same sRGB colour and this tool converts to CIELAB before matching. Use whichever you have to hand: HSV if you are reading numbers off a picker, HEX if you have a code from a style sheet or brand document. The HEX to Pantone converter on this site handles the other route.',
        },
        {
          q: 'Why is the match ranked by ΔE instead of HSV distance?',
          a: 'Because HSV distance does not correspond to how different two colours look. Ten degrees of hue is obvious in the greens and nearly invisible in the blues, and equal value numbers do not mean equal apparent brightness. Ranking by ΔE*00 in CIELAB — a space built for measuring perceptual difference — gives results that actually reflect what the eye sees.',
        },
        {
          q: 'Does this match against coated or uncoated Pantone?',
          a: 'Coated, which is the more common reference and the deck most brand specifications cite. If your printed piece is going onto uncoated stock, take the PMS number returned here and check its uncoated counterpart — the same ink soaks into uncoated paper and reads softer and slightly darker than the coated version.',
        },
      ]}

      relatedLinks={relatedFor('/hsv-to-pantone/', [
        '/pantone-to-hsv/',
        '/lab-to-pantone/',
        '/hex-to-pantone/',
        '/rgb-to-pantone/',
      ])}
    />
  );
}
