import Link from 'next/link';

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
              Free instant Pantone color conversion tools for designers and print professionals.
            </p>
          </div>

          <FooterColumn heading="To Pantone" links={[
            ['/cmyk-to-pantone', 'CMYK → Pantone'],
            ['/hex-to-pantone',  'HEX → Pantone' ],
            ['/rgb-to-pantone',  'RGB → Pantone' ],
            ['/hsl-to-pantone',  'HSL → Pantone' ],
          ]} />

          <FooterColumn heading="From Pantone" links={[
            ['/pantone-to-cmyk', 'Pantone → CMYK'],
            ['/pantone-to-hex',  'Pantone → HEX' ],
            ['/pantone-to-rgb',  'Pantone → RGB' ],
          ]} />

          <FooterColumn heading="Learn" links={[
            ['/learn',                               'All Articles'           ],
            ['/learn/what-is-pantone',               'What is Pantone?'       ],
            ['/learn/how-to-convert-hex-to-pantone', 'HEX to Pantone Guide'   ],
            ['/learn/cmyk-vs-rgb',                   'CMYK vs RGB'            ],
            ['/learn/coated-vs-uncoated',            'Coated vs Uncoated'     ],
          ]} />

          <FooterColumn heading="More" links={[
            ['/pantone-finder', 'Pantone Finder' ],
            ['/saved',          'Saved Colors'   ],
            ['/about',          'About'          ],
            ['/privacy',        'Privacy Policy' ],
            ['/',               'Home'           ],
          ]} />
        </div>

        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} PantoneConverter.com — Free color tools for designers.{' '}
          Pantone® is a registered trademark of Pantone LLC.
        </div>
      </div>
    </footer>
  );
}
