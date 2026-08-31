# PantoneConverter.com

Free browser-based colour conversion between CMYK, HEX, RGB, HSL and the
Pantone Matching System. All matching runs client-side — nothing is uploaded.

Live at **https://pantoneconverter.com**

## Stack

- **Next.js 16** (Pages Router) with `output: 'export'` — the build produces a
  fully static site in `out/`, deployable to any static host.
- **Tailwind CSS v4**, configured CSS-first via the `@theme` block in
  `styles/globals.css`. That block is the single source of brand colours.
- **MDX** for the `/learn` articles (`next-mdx-remote` + `gray-matter`).
- **next-sitemap** generates `sitemap.xml` and `robots.txt` after each build.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

`/robots.txt` and `/sitemap.xml` are build artefacts and are not served by the
dev server — run a build to see them.

## Build

```bash
npm run build      # next build + next-sitemap, output in out/
```

Deploy the contents of `out/`. Nothing runs server-side.

Two `postbuild` steps rewrite the export for the critical path:

- `scripts/inline-critical-css.mjs` inlines each page's above-the-fold CSS and
  turns the Tailwind chunk into a `preload`/`onload` swap, so first paint no
  longer waits on a stylesheet round trip. (`experimental.inlineCss` would do
  this natively, but it is App Router only.)
- `scripts/strip-legacy-polyfills.mjs` removes the shims in Next's client
  polyfill module for methods every browser in Next's support matrix ships
  natively. `URL.canParse` is deliberately kept — Safari only got it in 17.

Serve `public/fonts/` and `_next/static/` with long, immutable cache headers;
both are content-stable.

## Generated assets

Favicons and Open Graph cards are generated from the design tokens rather than
hand-drawn, so they cannot drift from the site's palette and typography.

```bash
npm run assets           # icons + OG cards
npm run assets:icons     # favicon.ico, PNG icons, apple-touch-icon, webmanifest
npm run assets:og        # 32 Open Graph cards at 1200x630
npm run assets:verify    # measures rendered contrast + checks for text overflow
```

Outputs land in `public/` and are committed, so a normal build never needs to
run them. Re-run `npm run assets` after changing brand colours in
`styles/globals.css` (mirrored in `scripts/brand.mjs`) or after adding a card
to `lib/ogCards.mjs`.

`lib/ogCards.mjs` is the single source of truth for OG cards: adding an entry
there gives a page both its image and its `og:image` / `twitter:image` tags,
since `components/ogMeta.jsx` looks the page up by path.

The OG generator needs real TTFs on disk (resvg has no webfont support); Plus
Jakarta Sans TTFs are downloaded on first run and cached in
`scripts/.fontcache/` (gitignored), so `npm run assets` needs network access.

## Fonts

Plus Jakarta Sans is self-hosted from `public/fonts/` — variable woff2, weight
axis 200–800, latin and latin-ext subsets in both roman and italic. Serving it
ourselves removes the `fonts.googleapis.com` → `fonts.gstatic.com` DNS + TLS +
CSS chain from the critical path, which was the site's largest render-blocking
delay and its main source of layout shift.

The `@font-face` rules live in `styles/globals.css`; the latin subset is
preloaded and the metric-matched `Plus Jakarta Fallback` face is declared inline
in `pages/_document.jsx`, where the browser sees it before first paint.

```bash
npm run assets:webfonts   # re-download the subsets + licence from Google Fonts
```

Licence: **SIL Open Font License 1.1** — full text in `public/fonts/OFL.txt`.
Copyright 2020 The Plus Jakarta Sans Project Authors
(https://github.com/tokotype/PlusJakartaSans).

## Colour system data

The cross-system converters match against palettes in `data/*.json`, generated
from the tables in `scripts/`:

```bash
npm run data              # regenerate every palette
npm run data:industrial   # RAL, NCS, HKS, TOYO, Trumatch, FS 595
npm run data:brands       # DMC, Copic, Oracal, Siser + five paint brands
npm run data:tcx          # Pantone Fashion, Home + Interiors (TCX)
```

The JSON is committed, so a normal build never runs these — they exist so the
data can be regenerated or replaced. Each file records an `accuracy` field
(`high`, `medium`, `low`, `derived`) because these are sRGB approximations of
physical standards, not licensed colour data; the provenance notes at the top of
each generator explain what that means per system. Swapping in licensed data is
a drop-in: keep the `[code, name, localName, hex]` row shape and re-run.

`scripts/` is dev-only tooling. Nothing under `pages/`, `components/` or `lib/`
imports from it, so it is never bundled and never reaches `out/`.

## Layout

```
pages/            routes (Pages Router); each page owns its own <Head>
components/       shared UI; ConverterPage.jsx is the cross-system page shell
lib/              colour maths, favourites context, OG cards, converter taxonomy
content/learn/    MDX articles with SEO frontmatter
data/             Pantone library, colour-system palettes, brand and CotY data
scripts/          asset and palette generators (dev-only, not bundled)
public/           static assets, including generated icons and OG cards
```
