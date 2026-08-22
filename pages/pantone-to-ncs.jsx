import { Compass } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import ncs from '../data/ncs.json';
import { relatedFor } from '../lib/converterLinks';

export default function PantoneToNcsPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-ncs/"
      pageTitle="Pantone to NCS Converter | Find Natural Colour System Code"
      metaDescription="Convert Pantone PMS colours to the closest NCS notation. Free ΔE-ranked matching for Scandinavian architecture, paint and interior specification work."
      h1="Pantone to NCS Converter"
      breadcrumbLabel="Pantone to NCS"
      heroLead="Search any Pantone spot colour and get the closest NCS notations, ranked by ΔE*00. NCS is the perception-based standard used across Scandinavian and European architecture, paint and interior specification."
      icon={<Compass size={20} color="#0284c7" />}
      iconBg="#f0f9ff"
      accentColor="#0284c7"

      appName="Pantone to NCS Converter"
      appDescription="Free browser-based tool that finds the closest NCS (Natural Colour System) notation for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five NCS notations for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers the NCS neutral scale and all six elementary hue families',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour value',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={ncs}
      systemLabel="NCS"
      sourceLabel="Pantone"
      targetLabel="NCS"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 286 C, 355, Cool Gray 9, Black 6…"
      searchHint="NCS covers muted architectural colour well; very bright Pantone colours will show a larger ΔE."
      presets={[
        'Pantone 186-C',
        'Pantone 286-C',
        'Pantone 355-C',
        'Pantone 116-C',
        'Pantone 485-C',
        'Pantone COOL-GRAY-9-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone 286-C', 'Pantone 355-C', 'Pantone 186-C', 'Pantone 116-C', 'Pantone COOL-GRAY-9-C', 'Pantone 7686-C']}

      aboutH2="What is NCS (Natural Colour System)?"
      aboutParagraphs={[
        'NCS, the Natural Colour System, describes colour the way people actually see it rather than by how it is manufactured. It was developed in Sweden and formalised as a national standard in 1979, building on the observation that human vision resolves every colour in terms of six elementary perceptions: white, black, and the four unique hues yellow, red, blue and green. Every NCS notation places a colour by how much it resembles each of those references.',
        'That makes the notation itself readable. In NCS S 1080-Y90R, the “S” marks it as a Standard sample, “10” is 10% blackness, “80” is 80% chromaticness — how saturated it is relative to a pure colour — and “Y90R” is the hue, 90% of the way from yellow toward red. Anyone fluent in the system can picture a strong, clean red before touching a fan deck. A code ending in “-N” is neutral, so NCS S 3000-N is a mid grey with no hue at all.',
        'The system is owned and published by NCS Colour AB in Stockholm. It is the dominant colour standard in Swedish, Norwegian and Danish architecture and paint retail, is written into building specifications across much of northern Europe, and is used widely in interior design, textiles and product development elsewhere. Its strength is describing the muted, desaturated colours that make up most built environments — precisely the range where RAL Classic is thin.',
        'Where NCS differs fundamentally from Pantone is intent. Pantone tells a printer what ink to mix; the number is a recipe. NCS tells anyone what a colour looks like; the notation is a description. This is why NCS colours can be interpolated and compared systematically while Pantone numbers cannot, and why a conversion between them is a matter of finding the nearest perceptual neighbour rather than translating a formula.',
      ]}

      comparisonRows={[
        ['Origin', 'Pantone Inc., United States, 1963', 'Sweden, standardised 1979; published by NCS Colour AB'],
        ['Underlying idea', 'A catalogue of pre-mixed ink formulas', 'A perceptual model built on six elementary colours'],
        ['Code meaning', 'An index number — 186 C tells you nothing on its own', 'Fully descriptive — S 1080-Y90R states blackness, chromaticness and hue'],
        ['Colour count', 'Over 3,200 across all decks; 1,341 coated', '1,950 standard colours; the model itself is continuous'],
        ['Primary industry', 'Print, packaging, brand identity', 'Architecture, paint retail, interiors, textiles'],
        ['Geography', 'Global, strongest in print and consumer branding', 'Standard across Scandinavia, widely used in northern Europe'],
        ['Strength', 'Exact, repeatable spot-colour reproduction in print', 'Describing and comparing muted, architectural colour systematically'],
        ['Interpolation', 'Not possible — numbers are catalogue positions', 'Native — you can specify a colour between two notations'],
      ]}

      useCasesIntro="Pantone-to-NCS conversion comes up wherever a brand colour has to enter a built environment governed by European specification norms."
      useCases={[
        { title: 'Architectural specification', body: 'Scandinavian and northern European building specifications quote NCS by default. A brand colour held in Pantone has to be converted before it can be written into a paint schedule.' },
        { title: 'Retail and hospitality interiors', body: 'Rolling out a branded interior across Nordic markets means giving local contractors NCS notations that their paint suppliers can mix on the spot.' },
        { title: 'Paint mixing at retail counters', body: 'Scandinavian paint retailers tint to NCS notation directly. Handing over an NCS code gets an exact mix; handing over a Pantone number usually does not.' },
        { title: 'Textile and soft furnishing development', body: 'Furniture and textile manufacturers in the region work in NCS. Converting the brand palette keeps upholstery, curtains and printed material coherent.' },
        { title: 'Facade and exterior colour schemes', body: 'Planning submissions in several Nordic municipalities expect NCS references for exterior colour, particularly in conservation areas.' },
        { title: 'Colour research and design education', body: 'Because NCS notation is systematic, it is the standard vocabulary in colour theory teaching and perception research — useful when documenting why a palette works.' },
      ]}

      howToIntro="Matching runs live in your browser as you type."
      howToSteps={[
        'Enter a Pantone number or name in the search box and pick the colour from the suggestions.',
        'Read the five closest NCS notations, ordered by ΔE*00 colour difference.',
        'Read the notation itself to sanity-check the result — the blackness, chromaticness and hue values tell you what the colour is before you look at the swatch.',
        'Check the ΔE badge: under 2 is a commercial match, above 5 the colours read as genuinely different.',
        'Copy the NCS notation for your specification, and verify it against a physical NCS fan deck under daylight before sign-off.',
      ]}

      accuracyNote="NCS and Pantone were built for different purposes — one describes perception, the other specifies printing ink — so no exact mapping exists between them. This tool matches the sRGB approximation of each NCS standard colour against the Pantone colour you choose and reports the nearest neighbours with their ΔE difference. NCS is strongest in muted, architectural colour, so highly saturated Pantone colours will consistently show larger differences; that is a real property of the two systems, not a fault in the matching."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 the difference is imperceptible, 1–2 is a commercial match, 2–5 becomes visible when the colours sit side by side, and above 5 they read as different colours. NCS also publishes its own tolerance conventions for architectural work, which are generally looser than print tolerances because coatings and lighting vary more in situ than on a press sheet."

      trademark={{
        system: 'NCS',
        owner: 'NCS Colour AB',
        extra: 'NCS® and Natural Colour System® are registered trademarks of NCS Colour AB. NCS values shown here are sRGB approximations for on-screen reference, not colour-managed reproductions of the physical standard.',
      }}

      faqs={[
        {
          q: 'How do you read an NCS colour code?',
          a: 'Take NCS S 1080-Y90R. The “S” means it is a Standard sample from the published NCS collection. “10” is the blackness — 10% black content. “80” is the chromaticness, meaning how saturated the colour is relative to a maximally pure colour. “Y90R” is the hue: start at yellow and move 90% of the way toward red. Together they describe a strong, clean red. A code ending “-N”, such as NCS S 3000-N, is neutral with no hue component.',
        },
        {
          q: 'What is the difference between NCS and RAL?',
          a: 'RAL is a catalogue of specific industrial coating colours identified by arbitrary four-digit codes, dominant in German-speaking and central European manufacturing. NCS is a perceptual model whose notation describes what a colour looks like, dominant in Scandinavian architecture and paint retail. RAL Classic has 213 fixed colours; NCS has 1,950 standard samples plus a continuous model you can specify between. RAL suits powder coating and metal fabrication; NCS suits architectural and interior paint.',
        },
        {
          q: 'Can Pantone be converted to NCS exactly?',
          a: 'No. Pantone specifies printing inks and NCS describes visual perception, so there is no formula linking them. A conversion finds the perceptually closest NCS standard colour and reports how far away it is. Muted and mid-tone Pantone colours convert well because that is where NCS is densest; very bright or fluorescent Pantone colours have no close NCS equivalent because those colours fall outside what the NCS standard collection covers.',
        },
        {
          q: 'Where is NCS used as the standard?',
          a: 'NCS is the national colour standard in Sweden, Norway and Spain, and is used extensively in Denmark, Finland and across northern Europe. It appears in architectural specifications, municipal planning requirements, paint retail tinting systems, interior design schemes and textile development. Outside Europe it is used in colour research and design education because its notation is systematic enough to reason with.',
        },
        {
          q: 'Do NCS colours come with paint formulas?',
          a: 'Not in the notation itself, which is the point — NCS describes the colour, not the recipe. Paint manufacturers hold their own tinting formulas that hit each NCS notation in their particular base and product line. This is why the same NCS code can be mixed by any participating manufacturer in a given market, while the actual pigment load differs between them.',
        },
        {
          q: 'Should I convert Pantone to NCS or to RAL for a building project?',
          a: 'It depends what is being coated. NCS for painted wall surfaces, interiors and facades in Scandinavian and northern European projects, where paint suppliers tint to NCS directly. RAL for powder-coated metal — window frames, cladding panels, balustrades, machinery — where coating powders are stocked by RAL code. Many projects need both, one for the painted surfaces and one for the metalwork.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-ncs/', [
        '/pantone-to-ral/',
        '/ral-to-pantone/',
        '/pantone-to-lab/',
        '/pantone-to-hks/',
      ])}
    />
  );
}
