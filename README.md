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

Plus Jakarta Sans TTFs are downloaded on first run and cached in
`scripts/.fontcache/` (gitignored), so `npm run assets` needs network access.

## Layout

```
pages/            routes (Pages Router); each page owns its own <Head>
components/       shared UI; ogMeta.jsx emits the social tags
lib/              colour maths, favourites context, OG card config
content/learn/    MDX articles with SEO frontmatter
data/             Pantone library, brand palettes, colour-of-the-year data
scripts/          asset generators (dev-only, not bundled)
public/           static assets, including generated icons and OG cards
```
