import { PaintBucket } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import dulux from '../data/dulux.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToDuluxPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-dulux/"
      pageTitle="Pantone to Dulux Converter | Find the Closest Paint Colour"
      metaDescription="Convert any Pantone PMS colour to the closest Dulux paint colour. Free ΔE-ranked matching for UK and Australian interior, exterior and trade paint work."
      h1="Pantone to Dulux Converter"
      breadcrumbLabel="Pantone to Dulux"
      heroLead="Search any Pantone spot colour and get the closest Dulux paint colours, ranked by ΔE*00. For UK and Australian projects where the decorator buys Dulux and the brand book speaks Pantone."
      icon={<PaintBucket size={20} color="#7e22ce" />}
      iconBg="#faf5ff"
      accentColor="#7e22ce"

      appName="Pantone to Dulux Converter"
      appDescription="Free browser-based tool that finds the closest Dulux paint colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Dulux colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers widely specified UK and Australian Dulux colours',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'One-click copy for every colour name',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={dulux}
      systemLabel="Dulux"
      sourceLabel="Pantone"
      targetLabel="Dulux"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 7686 C, Cool Gray 9, 5535, Black 6…"
      searchHint="Dulux colour names differ between the UK and Australian ranges, so confirm the name exists in your local market."
      presets={[
        'Pantone COOL-GRAY-9-C',
        'Pantone WARM-GRAY-3-C',
        'Pantone 7686-C',
        'Pantone 5535-C',
        'Pantone 448-C',
        'Pantone 186-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone COOL-GRAY-9-C', 'Pantone 7686-C', 'Pantone WARM-GRAY-3-C', 'Pantone 5535-C', 'Pantone 448-C', 'Pantone 186-C']}

      aboutH2="What is Dulux?"
      aboutParagraphs={[
        'Dulux is one of the best-known paint brands in the world, owned by AkzoNobel and dominant across the United Kingdom, Ireland, Australia, New Zealand and much of Asia. In Britain it is close to a generic term for household emulsion, helped along by decades of advertising built around an Old English Sheepdog. Alongside the consumer range, Dulux Trade supplies the professional decorating market and Dulux is a substantial presence in commercial and specification work.',
        'The brand publishes an annual Colour of the Year — Bright Skies, Tranquil Dawn, Heart Wood, Denim Drift — which drives a great deal of what actually gets sold and specified in the following year. Its consumer ranges are organised by colour family and identified by name rather than by a systematic code, which is convenient in a shop and less convenient when you are trying to specify precisely.',
        'One complication is genuinely worth flagging before you use any conversion: Dulux is not one global colour range. The UK and Australian collections overlap but are not identical, colour names appear in one market and not the other, and Dulux in North America is a separate business operating under different ownership arrangements with its own palette. A name that exists in Sydney may not exist in Manchester. The colours in this tool are drawn from the UK and Australian consumer ranges.',
        'For specification work, Dulux stores in most markets will tint to an RAL or BS number, and many will colour-match a physical sample. If your project needs a precise brand colour rather than a stock shade, ask about that route — it is usually more accurate than accepting the nearest name from a consumer chart.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'Tinted architectural paint for walls, woodwork and exteriors'],
        ['Origin', 'Pantone Inc., United States, 1963', 'AkzoNobel — dominant in UK, Ireland, Australia and NZ'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Thousands across ranges; a curated subset here'],
        ['Identified by', 'A number plus a deck suffix — 186 C', 'A colour name, with no systematic numeric code'],
        ['Consistency', 'Global — 186 C is 186 C everywhere', 'Varies by market — UK, AU and NA ranges differ'],
        ['Also tints to', 'Not applicable', 'RAL and BS numbers at most trade counters'],
        ['What changes the look', 'Paper stock and coating', 'Sheen, room light, orientation, adjacent colours'],
        ['Bought as', 'A fan deck', 'A tester pot first, then tins — always sample first'],
      ]}

      useCasesIntro="Pantone-to-Dulux conversion comes up wherever a brand identity has to be painted in a market where Dulux is the default tin on the shelf."
      useCases={[
        { title: 'UK and Irish commercial fit-out', body: 'Retail units, offices and hospitality interiors are almost always decorated in Dulux Trade. The brand colour has to be translated before the decorator can order.' },
        { title: 'Australian and New Zealand projects', body: 'Dulux is the dominant specification in both markets, so a global brand rolling out locally needs the equivalent colour name.' },
        { title: 'Residential interior design', body: 'Designers working from a fabric, wallpaper or artwork reference held in Pantone need a Dulux name clients can buy from any DIY shed.' },
        { title: 'Small business and shopfront branding', body: 'Independent retailers painting a shopfront to match printed signage need the two to read as one colour.' },
        { title: 'Coordinating with printed collateral', body: 'Where painted walls sit alongside printed graphics, working from the print specification keeps the scheme coherent.' },
        { title: 'Deciding whether to custom-tint', body: 'A poor ΔE against the standard range is the signal to ask a Dulux trade counter about matching to a physical sample or an RAL number instead.' },
      ]}

      howToIntro="Say you are painting a shopfront to match printed signage specified as Pantone 7686 C. Search 7686, take the closest Dulux name, then buy a tester pot and paint a board you can hold up against the actual sign outdoors — exterior colour under overcast British daylight behaves very differently from the same colour on a screen indoors."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Dulux colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Confirm the colour name exists in your local range before ordering — UK and Australian collections differ, and some names appear in only one.',
        'Copy the colour name for your order or specification.',
        'Buy a tester pot and paint a large board or patch. For exterior work, view it outdoors at the actual orientation the wall will face.',
        'If nothing is close, ask a Dulux trade counter about tinting to an RAL number or colour-matching a physical sample — usually more accurate than a stock name.',
      ]}

      accuracyNote="Three limits apply here. The material: printed ink and tinted paint are engineered for different jobs and shift differently under changing light. The coverage: Dulux publishes thousands of colours and this tool matches against a curated subset of widely specified ones. And the market: Dulux ranges are not consistent internationally, so a name returned here may not exist at your local supplier — always confirm before ordering, and treat the swatch as a starting point for a physical tester rather than a decision."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. As with every house paint conversion, neutrals match well and saturated brand colours do not, because consumer paint ranges are built around colours people want to live with. For precise brand work, tinting to RAL or matching a physical sample at a trade counter will beat any stock name."

      trademark={{
        system: 'Dulux',
        owner: 'AkzoNobel N.V.',
        extra: 'Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical paint. Dulux ranges vary by market; always confirm availability and appearance with your local supplier.',
      }}

      faqs={[
        {
          q: 'Are Dulux colours the same in the UK and Australia?',
          a: 'No, and this trips people up regularly. The UK and Australian ranges overlap but are not identical — some colour names exist in one market only, and a shared name is not a guarantee of an identical colour. Dulux in North America is a separate business again with its own palette. Always confirm a colour name against your local supplier before ordering rather than assuming a name travels.',
        },
        {
          q: 'Can Dulux match a Pantone colour exactly?',
          a: 'Not from the standard consumer range, which is a fixed catalogue of named colours. However, most Dulux trade counters will tint to an RAL or BS number, and many will colour-match a physical sample you bring in. For brand-critical work that route is far more accurate than picking the nearest stock name — bring an actual Pantone chip, not a printout.',
        },
        {
          q: 'What is Dulux Trade and how does it differ from the retail range?',
          a: 'Dulux Trade is the professional line, sold through trade counters rather than DIY sheds. The products are formulated for durability, coverage and application by professional decorators, and the colour ranges are geared to specification work including tinting to RAL and BS references. The retail range is aimed at consumers and organised around named colours and seasonal collections.',
        },
        {
          q: 'What is the Dulux Colour of the Year?',
          a: 'An annual colour announced by AkzoNobel’s global aesthetic centre, promoted heavily and usually accompanied by a coordinating palette. Recent examples include Bright Skies, Tranquil Dawn, Heart Wood and Denim Drift. It has a real effect on what gets sold and specified in the following year, so it is worth knowing about when a client asks for something current.',
        },
        {
          q: 'Why does the paint look different from the colour card?',
          a: 'Because a small printed card under shop lighting is a poor predictor of a whole wall under your own. Room light, wall orientation, sheen level and the colours already in the room all shift how paint reads, and the effect is much stronger at scale than on a chip. That is why the standard advice is a tester pot on a large patch, viewed at different times of day, rather than a decision made from a card.',
        },
        {
          q: 'Should I specify Dulux by name or by RAL?',
          a: 'By RAL where precision matters, because RAL is an international standard with a fixed definition and a physical fan deck any supplier can check against. Dulux names are market-specific and can change between range refreshes. For a brand rolling out across multiple countries, specifying RAL and letting each local supplier tint to it is generally more robust than chasing equivalent Dulux names in each market.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-dulux/', [
        '/pantone-to-farrow-and-ball/',
        '/pantone-to-sherwin-williams/',
        '/pantone-to-ral/',
        '/pantone-to-ncs/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
