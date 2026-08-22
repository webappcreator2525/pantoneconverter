import { Palette } from 'lucide-react';
import ConverterPage from '../components/ConverterPage';
import farrow from '../data/farrow.json';
import { relatedFor, CRAFT_EVERGREEN } from '../lib/converterLinks';

export default function PantoneToFarrowBallPage() {
  return (
    <ConverterPage
      canonical="https://pantoneconverter.com/pantone-to-farrow-and-ball/"
      pageTitle="Pantone to Farrow & Ball | Closest Designer Paint Match"
      metaDescription="Convert any Pantone PMS colour to the closest Farrow & Ball paint colour. Free ΔE-ranked matching across the full 130-colour designer palette for interiors."
      h1="Pantone to Farrow &amp; Ball Converter"
      breadcrumbLabel="Pantone to Farrow & Ball"
      heroLead="Search any Pantone spot colour and get the closest Farrow &amp; Ball colours, ranked by ΔE*00. A small, deliberately curated palette — which makes knowing the honest ΔE more useful here than anywhere else."
      icon={<Palette size={20} color="#57534e" />}
      iconBg="#fafaf9"
      accentColor="#57534e"

      appName="Pantone to Farrow &amp; Ball Converter"
      appDescription="Free browser-based tool that finds the closest Farrow &amp; Ball paint colour for any Pantone PMS colour, ranked by CIEDE2000 colour difference."
      featureList={[
        'Closest five Farrow & Ball colours for any Pantone colour',
        'ΔE*00 colour difference and match quality for every result',
        'Covers the full published palette of around 130 colours',
        'Colour names and numbers for every match',
        'HEX, RGB, CMYK and CIELAB values for each match',
        'Runs entirely client-side — nothing is uploaded',
      ]}

      mode="pantone-to-palette"
      palette={farrow}
      systemLabel="Farrow & Ball"
      sourceLabel="Pantone"
      targetLabel="Farrow & Ball"
      searchLabel="Search a Pantone colour by name or number"
      searchPlaceholder="e.g. 5535 C, Cool Gray 9, Warm Gray 3, 448…"
      searchHint="This is the smallest paint palette on the site — around 130 colours — so ΔE figures run higher by design."
      presets={[
        'Pantone COOL-GRAY-9-C',
        'Pantone WARM-GRAY-3-C',
        'Pantone 5535-C',
        'Pantone 448-C',
        'Pantone 7686-C',
        'Pantone 186-C',
        'Pantone BLACK-6-C',
      ]}
      exampleCodes={['Pantone COOL-GRAY-9-C', 'Pantone WARM-GRAY-3-C', 'Pantone 5535-C', 'Pantone 448-C', 'Pantone 7686-C', 'Pantone BLACK-6-C']}

      aboutH2="What is Farrow &amp; Ball?"
      aboutParagraphs={[
        'Farrow &amp; Ball is a British paint and wallpaper manufacturer founded in Dorset in 1946 by John Farrow and Richard Ball, who began by making paint using traditional methods for industrial and heritage clients. It occupies the designer end of the market and is unusual in almost every respect: it makes its paint in one place, sells a deliberately tiny palette, and has built a reputation on colours that behave interestingly rather than predictably.',
        'The palette is the defining choice. Where Sherwin-Williams offers around 1,700 colours and Benjamin Moore roughly 3,500, Farrow &amp; Ball publishes around 130. That constraint is the product: every colour is curated, they are designed to work together, and the company periodically retires colours to keep the collection tight. Each has a number and a name, and the names carry a great deal of the brand — Elephant’s Breath, Mouse’s Back, Dead Salmon, Hague Blue, Railings, Mole’s Breath — to the point where the name gets quoted on its own in design press and estate agent listings.',
        'The colours themselves are formulated with unusually high pigment loads and, characteristically, with complex undertones rather than clean single hues. This is why Farrow &amp; Ball colours are described as changing through the day: a grey with a green undertone will read quite differently in cool north light and warm afternoon sun. That behaviour is deliberate and much of what people are paying for, but it makes any single fixed swatch value — including the ones on this page — a rough summary of something genuinely variable.',
        'For matching purposes, the small palette is the central fact. Mapping 1,341 Pantone coated inks onto roughly 130 curated paint colours means most Pantone colours have no close neighbour, and saturated brand colours have none at all. The ΔE figures here run higher than on any other paint page on this site, and that is an accurate description of the palette rather than a shortcoming of the matching.',
      ]}

      comparisonRows={[
        ['What it is', 'Pre-mixed printing ink on paper', 'High-pigment architectural paint for walls, woodwork and exteriors'],
        ['Origin', 'Pantone Inc., United States, 1963', 'Farrow & Ball, Dorset, England, 1946'],
        ['Range size', '1,341 coated colours, over 3,200 in total', 'Around 130 colours — deliberately small'],
        ['Philosophy', 'Cover the spectrum so any colour can be specified', 'Curate tightly so every colour works with the others'],
        ['Identified by', 'A number plus a deck suffix — 186 C', 'A number and a distinctive name — No. 30 Hague Blue'],
        ['Undertones', 'Clean, engineered to a single target colour', 'Complex by design — colours shift noticeably with light'],
        ['Colour bias', 'Full spectrum including saturated brand colours', 'Muted, historic and atmospheric; almost no high-chroma colours'],
        ['Match quality', 'Reference system for this conversion', 'Coarse by nature — the smallest palette on this site'],
      ]}

      useCasesIntro="Converting Pantone to Farrow &amp; Ball is usually about placing a reference colour within a curated palette rather than reproducing it exactly."
      useCases={[
        { title: 'Designer residential interiors', body: 'Working from a fabric, artwork or wallpaper reference held in Pantone, and needing the nearest colour in a palette the client has already committed to.' },
        { title: 'Boutique hospitality and retail', body: 'Independent hotels, restaurants and shops specify Farrow & Ball for atmosphere. Brand colours have to be reconciled with what the palette actually offers.' },
        { title: 'Heritage and period property work', body: 'Conservation projects often need historically plausible colours, which is the collection’s original territory and where it is strongest.' },
        { title: 'Joinery, panelling and cabinetry', body: 'Deep colours such as Hague Blue, Railings and Studio Green dominate painted joinery. Matching from a scheme reference starts here.' },
        { title: 'Checking whether a brand colour is achievable', body: 'A high ΔE across the whole palette tells you plainly that the brand colour is not available in this range, which is useful to know early.' },
        { title: 'Building a coordinated scheme', body: 'Because the palette is curated to work together, finding your anchor colour here makes selecting the rest of the scheme straightforward.' },
      ]}

      howToIntro="Say a client has committed to Farrow &amp; Ball throughout and you need the closest colour to a deep green in their brand palette, Pantone 5535 C. Search 5535, take the top result, and order the sample pot — with this palette in particular, buy the physical sample rather than trusting a screen, because these colours are formulated to shift under changing light in a way a fixed swatch value cannot capture."
      howToSteps={[
        'Enter a Pantone number or name in the search box and select the colour from the suggestions.',
        'Read the five closest Farrow & Ball colours, ordered from the smallest ΔE*00 colour difference upward.',
        'Read the ΔE honestly. With only around 130 colours, figures above 5 are common and mean the palette simply does not contain your colour.',
        'Copy the name and number together — both are used in ordering, and the names are distinctive enough to be worth quoting.',
        'Order a sample pot or a peel-and-stick sample and place it on the actual wall, not on a desk.',
        'Look at it in morning light, in afternoon light and under the room’s evening lighting. These colours are specifically designed to change across those conditions.',
      ]}

      accuracyNote="This palette needs more caution than the others, for two reasons. It is small — around 130 colours against Pantone’s 1,341 coated inks — so most Pantone colours have no close equivalent and the ΔE figures here are honestly high. And these paints are formulated with complex undertones that shift substantially between cool daylight and warm artificial light, which means any single sRGB value, including the ones shown here, is a rough summary of a colour that genuinely moves. Sample physically, and look at the sample more than once."
      deltaENote="Results are ranked by ΔE*00 (CIEDE2000). Below 1 is imperceptible, 1–2 is a commercial match, 2–5 shows side by side, above 5 reads as a different colour. Expect the highest figures on this site here: the median closest match across the whole Pantone coated deck lands around ΔE 10. That is the arithmetic of a deliberately small, deliberately muted palette, and a high number is telling you something true — the colour you want is not in this collection."

      trademark={{
        system: 'Farrow & Ball',
        owner: 'Farrow & Ball Limited',
        extra: 'Colour names and numbers are the property of Farrow & Ball Limited. Colour values shown here are sRGB approximations for on-screen reference and are not colour-managed reproductions of the physical paint, which is specifically formulated to shift under changing light.',
      }}

      faqs={[
        {
          q: 'How many colours does Farrow & Ball make?',
          a: 'Around 130, which is a deliberate choice rather than a limitation. Where large manufacturers publish one to three thousand colours, Farrow & Ball keeps the collection tight so that every colour is curated and the palette works as a whole. The company periodically retires colours and introduces new ones to maintain that size, so a colour specified years ago may no longer be in the current range.',
        },
        {
          q: 'Why are the ΔE figures so high on this page?',
          a: 'Simple arithmetic. Mapping 1,341 Pantone coated inks onto roughly 130 paint colours means most Pantone colours land nowhere near a Farrow & Ball colour, and the palette is deliberately muted with almost no high-chroma colours. The median closest match sits around ΔE 10, the highest on this site. That number is accurate and useful — it tells you honestly when the palette cannot deliver your brand colour.',
        },
        {
          q: 'Why do Farrow & Ball colours look different at different times of day?',
          a: 'Because they are formulated that way. The paints carry high pigment loads and complex undertones rather than clean single hues, so a grey with a green undertone genuinely reads differently under cool north-facing morning light than under warm evening lamps. That responsiveness is much of what the brand is selling. It also means a single swatch value can never fully describe the colour, which is why sampling on the actual wall matters more here than usual.',
        },
        {
          q: 'Can Farrow & Ball colour-match a Pantone reference?',
          a: 'Not as a standard service — the tight curated palette is the product, and the company does not generally offer custom tinting the way a large retail manufacturer does. If you need an exact brand colour on a wall, a manufacturer that custom-tints to a physical sample is the practical route. Use this page to find the nearest colour in the collection when the palette itself is already the constraint.',
        },
        {
          q: 'What are the best-known Farrow & Ball colours?',
          a: 'Elephant’s Breath, a warm grey, is probably the most quoted. Hague Blue is the reference deep blue for joinery and panelling, Railings a near-black blue-grey for windows and ironwork, and Mole’s Breath and Mouse’s Back are the archetypal complex greys. Among the whites, Wimborne White, Pointing and All White are the ones most often specified.',
        },
        {
          q: 'Do Farrow & Ball numbers mean anything?',
          a: 'They are catalogue references rather than a descriptive system, and the sequence reflects the order in which colours entered the range rather than any relationship between them. In practice the name does most of the work — designers and clients say "Hague Blue" rather than "No. 30" — but the number is worth quoting alongside it when ordering, since some names are similar.',
        },
      ]}

      relatedLinks={relatedFor('/pantone-to-farrow-and-ball/', [
        '/pantone-to-dulux/',
        '/pantone-to-benjamin-moore/',
        '/pantone-to-ncs/',
        '/pantone-to-ral/',
      ], CRAFT_EVERGREEN)}
    />
  );
}
