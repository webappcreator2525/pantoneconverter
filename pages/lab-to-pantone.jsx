import { FlaskConical } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import { LAB_FORMULA } from '../lib/colorFormulas';
import { relatedFor } from '../lib/converterLinks';

export default function LabToPantonePage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/lab-to-pantone/"
      pageTitle="LAB to Pantone Converter | Match L*a*b* Values to PMS Colour"
      metaDescription="Enter CIELAB L*a*b* values and find the closest Pantone PMS colour, ranked by ΔE*00. Free tool for spectrophotometer readings and colour quality control."
      h1="LAB to Pantone Converter"
      breadcrumbLabel="LAB to Pantone"
      heroLead="Enter L*, a* and b* coordinates — straight from a spectrophotometer or a supplier specification — and get the closest Pantone colours ranked by ΔE*00 colour difference."
      icon={<FlaskConical size={20} color="#0891b2" />}
      iconBg="#ecfeff"
      accentColor="#0891b2"

      appName="LAB to Pantone Converter"
      appDescription="Free browser-based tool that finds the closest Pantone PMS colour for any CIELAB L*a*b* value, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Pantone colours for any L*a*b* value',
        'ΔE*00 colour difference and match quality for every result',
        'Sliders and numeric entry for each Lab axis',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'Save any Pantone result to your colour library',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="formula-to-pantone"
      formula={LAB_FORMULA}
      systemLabel="CIELAB"
      sourceLabel="LAB"
      targetLabel="Pantone"
      searchLabel="Enter CIELAB values (D65 / 2° observer)"
      searchHint="Lab values outside the sRGB gamut are clipped to the nearest displayable colour before matching, so extreme a* and b* inputs will plateau."
      exampleCodes={['Pantone 186-C', 'Pantone 286-C', 'Pantone 355-C', 'Pantone 116-C', 'Pantone COOL-GRAY-9-C', 'Pantone BLACK-6-C']}

      aboutH2="What is CIELAB, and why match it to Pantone?"
      aboutParagraphs={[
        'CIELAB — L*a*b* — is the device-independent colour space published by the Commission Internationale de l’Éclairage in 1976. L* is lightness from 0 to 100, a* runs from green to red, and b* runs from blue to yellow. Because it describes appearance to a standard observer rather than the behaviour of a particular device, it is the space colour is measured in across print, textiles, coatings and plastics.',
        'Matching Lab to Pantone is the everyday task of turning a measurement into a specification. A spectrophotometer reads a physical sample — a competitor’s packaging, a fabric swatch, an existing painted panel, a press sheet — and returns Lab coordinates. Those numbers are precise but not actionable: no printer stocks an ink called “L* 45.6 a* 67.2 b* 32.1”. Finding the nearest PMS colour converts a measurement into something that can be ordered and reproduced.',
        'It is also how colour disputes get settled. When a supplier delivers work that looks wrong, measuring both the delivery and the reference gives a ΔE figure that either is or is not inside the agreed tolerance. Working back to a Pantone number then tells you what was actually produced versus what was specified.',
        'The two directions are not symmetrical, which is worth understanding. Pantone to Lab is a calculation with exactly one correct answer. Lab to Pantone is a search: the coated deck holds 1,341 discrete colours, and your measurement will almost never land exactly on one of them. That is why every result here carries a ΔE — it tells you how much you are giving up by substituting the catalogue colour for the measurement.',
      ]}

      comparisonRows={[
        ['Type of system', 'A finite catalogue of 1,341 coated ink colours', 'A continuous mathematical space'],
        ['Direction of conversion', 'The destination — a specifiable, orderable colour', 'The source — a measurement from an instrument'],
        ['Precision', 'Discrete: you get the nearest catalogue entry', 'Continuous: any value between two points is valid'],
        ['Device dependence', 'Tied to specific inks and paper stocks', 'Device-independent by design'],
        ['How it is obtained', 'Chosen from a fan deck or a brand guideline', 'Measured with a spectrophotometer'],
        ['What it is good for', 'Ordering ink and specifying reproducible colour', 'Measuring, comparing and setting tolerances'],
        ['Result of conversion', 'A closest match plus a ΔE difference', 'An exact calculation in the other direction'],
        ['Needs stating', 'Which deck — coated, uncoated, metallic', 'Which illuminant and observer — D65 / 2° here'],
      ]}

      useCasesIntro="This direction is measurement-driven work: something physical exists, it has been read with an instrument, and now it needs a name."
      useCases={[
        { title: 'Reverse-engineering an existing colour', body: 'Measure a competitor’s packaging, a legacy product finish or an unlabelled sample, and find the Pantone number that reproduces it.' },
        { title: 'Resolving supplier colour disputes', body: 'Measure the delivered goods and the reference, compute the ΔE, and identify which Pantone colour was actually produced rather than the one specified.' },
        { title: 'Recovering a lost brand specification', body: 'Older brands often have printed artefacts but no colour documentation. Measuring the original gives Lab values that map back to a modern PMS number.' },
        { title: 'Textile and dye matching', body: 'Dye houses work natively in Lab. Converting a lab-dip reading to Pantone lets the design and print sides of a project speak the same language.' },
        { title: 'Incoming quality inspection', body: 'Check delivered material against a Pantone target by measuring it and confirming the nearest match is the specified colour within tolerance.' },
        { title: 'Working from a supplier data sheet', body: 'Coating, plastic and laminate suppliers often publish Lab values rather than PMS numbers, so the conversion is needed before design work can start.' },
      ]}

      howToIntro="Use the sliders for exploration or type exact values into the number fields — the match updates as you go."
      howToSteps={[
        'Enter your L* value (0–100) from the measurement or specification.',
        'Enter a* (green to red) and b* (blue to yellow), including the minus sign where the value is negative.',
        'Read the five closest Pantone coated colours, ordered by ΔE*00 difference from your input.',
        'Check the ΔE on the top result: under 2 means the Pantone colour is a commercial substitute for your measurement, above 5 means no Pantone colour is genuinely close.',
        'Confirm your measurement was taken under D65 with the 2° observer — a Lab triple from a different illuminant will land somewhere else entirely.',
        'Verify the chosen PMS number against a physical Pantone guide before committing it to a specification.',
      ]}

      accuracyNote="Two limits apply here. First, matching runs against each Pantone colour's sRGB equivalent rather than its measured spectral data, so results for highly saturated colours are less reliable than for muted ones — sRGB simply cannot represent everything a spot ink can produce. Second, Lab values outside the sRGB gamut are clipped to the nearest displayable colour before matching, which means extreme a* and b* inputs will stop changing the result. For quality-control work, compare spectral measurements directly rather than routing them through a screen colour space."
      deltaENote="Every result is ranked by ΔE*00 (CIEDE2000), computed between your input Lab values and each Pantone colour. Below 1 the difference is imperceptible, 1–2 is a commercial match, 2–5 is visible when the colours sit side by side, and above 5 they read as different colours. Because the coated deck holds only 1,341 discrete colours, a measurement will rarely land below ΔE 1 — a top result of 2 to 3 is a normal, usable outcome."

      trademark={{
        system: 'CIELAB',
        owner: 'the Commission Internationale de l’Éclairage (CIE)',
        extra: 'CIELAB is an open published standard rather than a proprietary system; the CIE reference is given for attribution. No affiliation with the CIE is implied.',
      }}

      faqs={[
        {
          q: 'How do I get L*a*b* values for a colour I want to match?',
          a: 'You measure it with a spectrophotometer — a handheld instrument such as an X-Rite or Konica Minolta device. Many print shops, packaging converters and paint suppliers have one and will take a reading for you. Some suppliers also publish Lab values directly on technical data sheets for coatings, plastics and laminates, which removes the need to measure at all.',
        },
        {
          q: 'Why does my Lab value not return an exact Pantone match?',
          a: 'Because the Pantone coated deck is a finite catalogue of 1,341 discrete colours and Lab is a continuous space. Your measurement will almost never coincide exactly with a catalogue entry, so the tool returns the nearest ones with the ΔE difference attached. A top result in the 2 to 3 range is a normal and perfectly usable outcome.',
        },
        {
          q: 'What illuminant should I use?',
          a: 'D65 with the 2° standard observer, which is what this tool assumes and what Pantone, RAL and NCS publish against. If your instrument is set to D50 — still common in some print workflows — the Lab values will differ and the match will be wrong. Check the instrument setting before entering numbers, because the same physical sample genuinely produces different coordinates under different illuminants.',
        },
        {
          q: 'Can negative a* and b* values be entered?',
          a: 'Yes. Negative a* means the colour sits toward green and negative b* toward blue, so a deep blue might read as something like L* 32, a* 79, b* −108. Both fields accept the full range from −128 to 127 by slider or direct entry. Values that fall outside what sRGB can display are clipped to the nearest displayable colour before matching.',
        },
        {
          q: 'Should I match against coated or uncoated Pantone?',
          a: 'This tool matches against the coated deck, which is the more common reference and the one most brand specifications cite. If your measurement came from an uncoated printed surface, expect the coated match to read slightly more saturated than your sample — take the PMS number returned here and check its uncoated counterpart, which will look softer and marginally darker.',
        },
        {
          q: 'Is ΔE 2 a good enough match?',
          a: 'For most commercial work, yes — ΔE*00 under 2 is the conventional threshold for a commercial match, perceptible only under close side-by-side inspection. Tighter tolerances apply where colour carries brand weight: major packaging programmes often specify ΔE ≤ 1 on press. What counts as acceptable is ultimately a contractual question, so agree the tolerance with your supplier before production rather than after.',
        },
      ]}

      relatedLinks={relatedFor('/lab-to-pantone/', [
        '/pantone-to-lab/',
        '/hsv-to-pantone/',
        '/ral-to-pantone/',
        '/compare/',
      ])}
    />
  );
}
