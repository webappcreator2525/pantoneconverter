import Link from 'next/link';
import { CONVERTER_GROUPS, groupLinks } from '../lib/converterLinks';

const FOOTER_LINK_STYLE = {
  color: '#9ca3af', textDecoration: 'none', fontSize: '0.82rem',
};

function FooterColumn({ heading, links }) {
  return (
    <div>
      <div style={{
        color: '#d1d5db', fontWeight: 700, fontSize: '0.7rem',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem',
      }}>
        {heading}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              style={FOOTER_LINK_STYLE}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Footer columns mirror the navigation groups exactly, so every converter on the
// site has a crawlable link from every page. Labels are shortened where the nav
// label would wrap awkwardly in a narrow footer column.
const SHORT_LABEL = {
  '/pantone-to-federal-standard-595/': 'Pantone → FS 595',
  '/pantone-to-sherwin-williams/': 'Pantone → Sherwin',
  '/pantone-to-benjamin-moore/': 'Pantone → Ben Moore',
  '/pantone-to-farrow-and-ball/': 'Pantone → Farrow & Ball',
  '/pantone-textile-to-cmyk/': 'Textile → CMYK',
  '/image-to-pantone/': 'Image → Pantone',
  '/pantone-finder/': 'Pantone Finder',
  '/compare/': 'Compare Colours',
};

const CONVERTER_COLUMNS = CONVERTER_GROUPS.map((group) => ({
  heading: group.title,
  links: groupLinks(group).map(({ href, label }) => [href, SHORT_LABEL[href] || label]),
}));

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', padding: '3rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>

          {/* Brand blurb */}
          <div>
            <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: '0.75rem' }} className="gradient-text">
              PantoneConverter
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
              Free instant Pantone color conversion tools for designers, printers,
              manufacturers and makers.
            </p>
          </div>

          {CONVERTER_COLUMNS.map((col) => (
            <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}

          <FooterColumn heading="Colour Families" links={[
            ['/pantone-red/',    'Pantone Red'    ],
            ['/pantone-blue/',   'Pantone Blue'   ],
            ['/pantone-green/',  'Pantone Green'  ],
            ['/pantone-yellow/', 'Pantone Yellow' ],
            ['/pantone-orange/', 'Pantone Orange' ],
            ['/pantone-pink/',   'Pantone Pink'   ],
            ['/pantone-purple/', 'Pantone Purple' ],
            ['/pantone-gold/',   'Pantone Gold'   ],
            ['/pantone-black/',  'Pantone Black'  ],
            ['/pantone-white/',  'Pantone White'  ],
          ]} />

          <FooterColumn heading="Learn" links={[
            ['/learn',                               'All Articles'         ],
            ['/learn/what-is-pantone',               'What is Pantone?'     ],
            ['/learn/pantone-for-beginners',         'Pantone for Beginners'],
            ['/learn/coated-vs-uncoated',            'Coated vs Uncoated'   ],
            ['/learn/cmyk-vs-rgb',                   'CMYK vs RGB'          ],
            ['/brands',                              'Brand Colours'        ],
            ['/pantone-color-of-the-year',           'Colour of the Year'   ],
          ]} />

          <FooterColumn heading="Site" links={[
            ['/',        'Home'          ],
            ['/saved',   'Saved Colors'  ],
            ['/about',   'About'         ],
            ['/privacy', 'Privacy Policy'],
          ]} />
        </div>

        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} PantoneConverter.com — Free color tools for designers.{' '}
          Pantone® is a registered trademark of Pantone LLC. All other colour system names and
          codes are trademarks of their respective owners.
        </div>
      </div>
    </footer>
  );
}
