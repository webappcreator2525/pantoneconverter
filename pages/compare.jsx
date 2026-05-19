import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GitCompare, Copy, Check, X, Share2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import pantoneDb from '../data/pantone.json';
import { isLightColor } from '../lib/colorUtils';

// ─── Copy Button ──────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };
  return (
    <button
      onClick={handle}
      className={`copy-btn${copied ? ' copied' : ''}`}
      title={`Copy ${text}`}
      style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── Autocomplete search input ────────────────────────────────────
function PantoneSearch({ id, label, accentColor, value, onChange, onSelect, onClear }) {
  const [open, setOpen]           = useState(false);
  const [suggestions, setSugs]    = useState([]);
  const wrapRef                   = useRef(null);

  useEffect(() => {
    if (!value.trim()) { setSugs([]); setOpen(false); return; }
    const q    = value.toLowerCase();
    const hits = pantoneDb.filter(e => e.name.toLowerCase().includes(q)).slice(0, 10);
    setSugs(hits);
    setOpen(hits.length > 0);
  }, [value]);

  useEffect(() => {
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={wrapRef} style={{ flex: 1, minWidth: 0 }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: '0.68rem',
          fontWeight: 800,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </label>

      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className="input-field"
          placeholder="Search by name — e.g. 186 C, Cool Gray…"
          autoComplete="off"
          style={{ paddingRight: value ? '2.5rem' : '1rem' }}
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={onClear}
            aria-label="Clear selection"
            style={{
              position: 'absolute', right: '0.6rem', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6b7280', padding: '0.15rem', display: 'flex',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#374151')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            <X size={15} />
          </button>
        )}

        {/* Dropdown */}
        {open && (
          <ul style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', border: '1.5px solid #e9a8fd',
            borderRadius: '0.875rem',
            boxShadow: '0 8px 24px rgba(196,78,237,0.15)',
            zIndex: 200, listStyle: 'none', margin: 0,
            padding: '0.375rem', maxHeight: '17rem', overflowY: 'auto',
          }}>
            {suggestions.map(entry => (
              <li key={entry.name}>
                <button
                  onMouseDown={e => {
                    e.preventDefault();
                    onSelect(entry);
                    onChange(entry.name);
                    setOpen(false);
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '0.75rem', padding: '0.45rem 0.75rem',
                    border: 'none', background: 'transparent',
                    borderRadius: '0.5rem', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f3ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '0.35rem',
                    backgroundColor: entry.hex, border: '1px solid rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.83rem', color: '#111827' }}>
                      {entry.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                      {entry.hex} · {entry.collection}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Single color panel ───────────────────────────────────────────
function ColorPanel({ color, label, accentColor }) {
  if (!color) {
    return (
      <div style={{
        flex: '1 1 280px',
        border: '2px dashed #e5e7eb',
        borderRadius: '1.5rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 1.5rem',
        background: '#fafafa',
        gap: '0.75rem',
        minHeight: '22rem',
      }}>
        <div style={{
          width: '3rem', height: '3rem', borderRadius: '50%',
          border: `2px dashed ${accentColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.4,
        }}>
          <GitCompare size={18} color={accentColor} />
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, margin: 0, textAlign: 'center' }}>
          Search {label} above
        </p>
      </div>
    );
  }

  const { r, g, b }     = color.rgb;
  const { c, m, y, k }  = color.cmyk;
  const isLight          = isLightColor(color.hex);
  const textCol          = isLight ? '#1f2937' : '#ffffff';
  const subCol           = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';

  const collectionColor =
    color.collection === 'coated'   ? { bg: '#eff6ff', fg: '#1d4ed8' } :
    color.collection === 'uncoated' ? { bg: '#f0fdf4', fg: '#166534' } :
                                      { bg: '#fdf4ff', fg: '#7e22ce' };

  return (
    <div style={{
      flex: '1 1 280px',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      border: '1.5px solid #f3f4f6',
      boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadeIn 0.35s ease-out',
    }}>
      {/* Large swatch */}
      <div style={{
        backgroundColor: color.hex,
        minHeight: '14rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        gap: '0.4rem',
        transition: 'background-color 0.3s ease',
      }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 800, color: subCol,
          textTransform: 'uppercase', letterSpacing: '0.14em',
        }}>
          {label}
        </span>
        <div style={{
          fontSize: '1rem', fontWeight: 900, color: textCol,
          textAlign: 'center', lineHeight: 1.3,
        }}>
          {color.name}
        </div>
        <code style={{
          fontSize: '1.4rem', fontWeight: 800, color: textCol,
          fontFamily: 'monospace', letterSpacing: '0.04em',
        }}>
          {color.hex}
        </code>
      </div>

      {/* Data section */}
      <div style={{
        background: '#ffffff', padding: '1.25rem',
        display: 'flex', flexDirection: 'column', gap: '0.875rem',
      }}>
        {/* Collection badge */}
        <div>
          <span style={{
            display: 'inline-block',
            fontSize: '0.7rem', fontWeight: 700,
            background: collectionColor.bg, color: collectionColor.fg,
            padding: '0.2rem 0.65rem', borderRadius: '9999px',
          }}>
            {color.collection.charAt(0).toUpperCase() + color.collection.slice(1)}
          </span>
        </div>

        {/* Values */}
        {[
          { label: 'HEX',  value: color.hex, monospace: true },
          { label: 'RGB',  value: `${r}, ${g}, ${b}`, monospace: true },
          { label: 'CMYK', value: `C:${c} M:${m} Y:${y} K:${k}`, monospace: true },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, color: '#6b7280',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                width: '2.5rem', flexShrink: 0,
              }}>
                {row.label}
              </span>
              <code style={{
                fontSize: '0.78rem', fontWeight: 600, color: '#374151',
                background: '#f3f4f6', padding: '0.15rem 0.45rem',
                borderRadius: '0.3rem', fontFamily: 'monospace',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {row.value}
              </code>
            </div>
            <CopyBtn text={row.value} />
          </div>
        ))}

        {/* Copy name */}
        <div style={{
          borderTop: '1px solid #f3f4f6',
          paddingTop: '0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>
            Pantone Name
          </span>
          <CopyBtn text={color.name} />
        </div>
      </div>
    </div>
  );
}

// ─── Delta-E badge ────────────────────────────────────────────────
function DeltaEBadge({ delta }) {
  const { label, bg, fg, barColor } =
    delta < 10  ? { label: 'Very Similar',          bg: '#dcfce7', fg: '#166534', barColor: '#22c55e' } :
    delta < 30  ? { label: 'Noticeable Difference', bg: '#fef9c3', fg: '#854d0e', barColor: '#eab308' } :
    delta < 60  ? { label: 'Significant Difference',bg: '#ffedd5', fg: '#9a3412', barColor: '#f97316' } :
                  { label: 'Very Different',         bg: '#fee2e2', fg: '#991b1b', barColor: '#ef4444' };

  // Max possible ΔE (RGB Euclidean) ≈ 441.67
  const MAX = 441.67;
  const pct  = Math.min(100, (delta / MAX) * 100);

  return (
    <div style={{
      background: bg, border: `1.5px solid ${fg}22`,
      borderRadius: '1rem', padding: '1.25rem 1.5rem',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: fg, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
            ΔE — Color Difference
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: fg, lineHeight: 1, fontFamily: 'monospace' }}>
            {delta.toFixed(1)}
          </div>
        </div>
        <span style={{
          background: fg, color: '#fff',
          fontSize: '0.78rem', fontWeight: 700,
          padding: '0.35rem 0.9rem', borderRadius: '9999px',
        }}>
          {label}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: '6px', background: `${fg}22`, borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: barColor, borderRadius: '9999px',
          transition: 'width 0.6s ease',
        }} />
      </div>

      <p style={{ fontSize: '0.82rem', color: fg, margin: 0, fontWeight: 500 }}>
        {delta < 10  && 'Barely noticeable — these colors are extremely close. A human eye may struggle to tell them apart.'}
        {delta >= 10 && delta < 30  && 'A clear difference is visible, but the colors share a similar feel or family.'}
        {delta >= 30 && delta < 60  && 'These colors are quite distinct. Substituting one for the other would be noticeable in print.'}
        {delta >= 60 && 'These are very different colors. Do not substitute one for the other in any branded material.'}
      </p>
    </div>
  );
}

// ─── Comparison table row ─────────────────────────────────────────
function TableRow({ attr, valA, valB, highlight }) {
  return (
    <tr style={{ background: highlight ? '#fdf4ff' : 'transparent' }}>
      <td style={{
        padding: '0.65rem 1rem',
        fontWeight: 700, fontSize: '0.75rem',
        color: '#4b5563', textTransform: 'uppercase',
        letterSpacing: '0.07em', borderBottom: '1px solid #f3f4f6',
        whiteSpace: 'nowrap',
      }}>
        {attr}
      </td>
      <td style={{
        padding: '0.65rem 1rem',
        fontFamily: 'monospace', fontSize: '0.82rem',
        color: '#111827', fontWeight: 600,
        borderBottom: '1px solid #f3f4f6',
      }}>
        {valA}
      </td>
      <td style={{
        padding: '0.65rem 1rem',
        fontFamily: 'monospace', fontSize: '0.82rem',
        color: '#111827', fontWeight: 600,
        borderBottom: '1px solid #f3f4f6',
      }}>
        {valB}
      </td>
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────
export default function ComparePage() {
  const [queryA,    setQueryA]    = useState('');
  const [queryB,    setQueryB]    = useState('');
  const [colorA,    setColorA]    = useState(null);
  const [colorB,    setColorB]    = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { a, b } = router.query;
    if (a) {
      const match = pantoneDb.find(e => e.name.toLowerCase() === decodeURIComponent(a).toLowerCase());
      if (match) {
        setColorA(match);
        setQueryA(match.name);
      }
    }
    if (b) {
      const match = pantoneDb.find(e => e.name.toLowerCase() === decodeURIComponent(b).toLowerCase());
      if (match) {
        setColorB(match);
        setQueryB(match.name);
      }
    }
  }, [router.isReady, router.query]);

  const clearA = () => { setQueryA(''); setColorA(null); };
  const clearB = () => { setQueryB(''); setColorB(null); };

  const handleSwap = () => {
    const tempColor = colorA;
    setColorA(colorB);
    setColorB(tempColor);

    const tempQuery = queryA;
    setQueryA(queryB);
    setQueryB(tempQuery);
  };

  const handleShare = async () => {
    if (!colorA || !colorB) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/compare/?a=${encodeURIComponent(colorA.name)}&b=${encodeURIComponent(colorB.name)}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch (_) {}
  };

  // ΔE Euclidean RGB distance
  const delta = (colorA && colorB)
    ? Math.sqrt(
        (colorA.rgb.r - colorB.rgb.r) ** 2 +
        (colorA.rgb.g - colorB.rgb.g) ** 2 +
        (colorA.rgb.b - colorB.rgb.b) ** 2
      )
    : null;

  const bothSelected = colorA && colorB;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pantone Color Comparison Tool",
    "url": "https://pantoneconverter.com/compare/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Compare any two Pantone colors side by side. See HEX, RGB, CMYK values and the visual difference between any two PMS colors instantly.",
  };

  return (
    <>
      <Head>
        <title>Pantone Color Comparison Tool — Compare Two PMS Colors</title>
        <meta
          name="description"
          content="Compare any two Pantone colors side by side. See HEX, RGB, CMYK values and the visual difference between any two PMS colors instantly."
        />
        <link rel="canonical" href="https://pantoneconverter.com/compare/" />
        <meta property="og:title" content="Pantone Color Comparison Tool — Compare Two PMS Colors" />
        <meta
          property="og:description"
          content="Compare any two Pantone colors side by side. See HEX, RGB, CMYK values and the visual difference between any two PMS colors instantly."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero strip ─────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)',
          borderBottom: '1px solid #f3f4f6',
          padding: '2.5rem 1.5rem 2rem',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(196,78,237,0.3)',
              }}>
                <GitCompare size={18} color="#fff" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>
                Pantone Color Comparison Tool
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0, maxWidth: '44rem' }}>
              Select two Pantone PMS colors to compare them side by side — see the visual difference, ΔE score, and full value breakdown instantly.
            </p>
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

          {/* ── Search Row ─────────────────────────────────────── */}
          <div className="card" style={{ marginBottom: '1.75rem' }}>
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: '1.5rem', alignItems: 'flex-start',
            }}>
              <PantoneSearch
                id="search-a"
                label="Color A"
                accentColor="#c44eed"
                value={queryA}
                onChange={setQueryA}
                onSelect={setColorA}
                onClear={clearA}
              />

              {/* Divider / Swap button */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingTop: '1.7rem', flexShrink: 0,
              }}>
                <button
                  onClick={handleSwap}
                  title="Swap Colors"
                  style={{
                    width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#f5f3ff,#eff6ff)',
                    border: '1.5px solid #e9a8fd',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(196,78,237,0.1)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#c44eed'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#e9a8fd'; }}
                >
                  <GitCompare size={14} color="#a855f7" />
                </button>
              </div>

              <PantoneSearch
                id="search-b"
                label="Color B"
                accentColor="#4361EE"
                value={queryB}
                onChange={setQueryB}
                onSelect={setColorB}
                onClear={clearB}
              />
            </div>

            {/* Helper tip */}
            {!bothSelected && (
              <p style={{
                fontSize: '0.78rem', color: '#6b7280',
                margin: '0.875rem 0 0', lineHeight: 1.5,
              }}>
                💡 Try: <em>"186 C"</em>, <em>"Cool Gray 9"</em>, <em>"Reflex Blue"</em>, <em>"Process Black"</em>
              </p>
            )}
          </div>

          {/* ── Side-by-Side Panels ───────────────────────────── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '1.25rem', marginBottom: '1.75rem',
          }}>
            <ColorPanel color={colorA} label="Color A" accentColor="#c44eed" />
            <ColorPanel color={colorB} label="Color B" accentColor="#4361EE" />
          </div>

          {/* ── Difference section — only when both selected ───── */}
          {bothSelected && (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'slideUp 0.4s ease-out' }}
            >
              {/* Delta-E card */}
              <DeltaEBadge delta={delta} />

              {/* Comparison table */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                  padding: '1rem 1.25rem',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GitCompare size={15} color="#c44eed" />
                    <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#111827' }}>
                      Side-by-Side Value Breakdown
                    </span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {shareCopied ? <Check size={14} color="#166534" /> : <Share2 size={14} />}
                    {shareCopied ? 'Link Copied!' : 'Share Comparison'}
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        <th style={{
                          padding: '0.65rem 1rem', textAlign: 'left',
                          fontSize: '0.7rem', fontWeight: 800,
                          color: '#6b7280', textTransform: 'uppercase',
                          letterSpacing: '0.08em', borderBottom: '1px solid #f3f4f6',
                        }}>
                          Attribute
                        </th>
                        <th style={{
                          padding: '0.65rem 1rem', textAlign: 'left',
                          fontSize: '0.7rem', fontWeight: 800,
                          color: '#c44eed', textTransform: 'uppercase',
                          letterSpacing: '0.08em', borderBottom: '1px solid #f3f4f6',
                        }}>
                          Color A
                        </th>
                        <th style={{
                          padding: '0.65rem 1rem', textAlign: 'left',
                          fontSize: '0.7rem', fontWeight: 800,
                          color: '#4361EE', textTransform: 'uppercase',
                          letterSpacing: '0.08em', borderBottom: '1px solid #f3f4f6',
                        }}>
                          Color B
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableRow attr="Name"       valA={colorA.name}       valB={colorB.name}       highlight={false} />
                      <TableRow attr="HEX"        valA={colorA.hex}        valB={colorB.hex}        highlight={true}  />
                      <TableRow attr="R"          valA={colorA.rgb.r}      valB={colorB.rgb.r}      highlight={false} />
                      <TableRow attr="G"          valA={colorA.rgb.g}      valB={colorB.rgb.g}      highlight={false} />
                      <TableRow attr="B"          valA={colorA.rgb.b}      valB={colorB.rgb.b}      highlight={true}  />
                      <TableRow attr="C"          valA={`${colorA.cmyk.c}%`} valB={`${colorB.cmyk.c}%`} highlight={false} />
                      <TableRow attr="M"          valA={`${colorA.cmyk.m}%`} valB={`${colorB.cmyk.m}%`} highlight={false} />
                      <TableRow attr="Y"          valA={`${colorA.cmyk.y}%`} valB={`${colorB.cmyk.y}%`} highlight={false} />
                      <TableRow attr="K"          valA={`${colorA.cmyk.k}%`} valB={`${colorB.cmyk.k}%`} highlight={true}  />
                      <TableRow attr="Collection" valA={colorA.collection} valB={colorB.collection} highlight={false} />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dual color strip preview */}
              <div style={{
                display: 'flex', borderRadius: '1.25rem', overflow: 'hidden',
                height: '6rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ flex: 1, background: colorA.hex, position: 'relative' }}>
                  <span style={{
                    position: 'absolute', bottom: '0.5rem', left: '0.75rem',
                    fontSize: '0.65rem', fontWeight: 800,
                    color: isLightColor(colorA.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    A
                  </span>
                </div>
                <div style={{
                  width: '3px',
                  background: 'rgba(255,255,255,0.8)',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, background: colorB.hex, position: 'relative' }}>
                  <span style={{
                    position: 'absolute', bottom: '0.5rem', right: '0.75rem',
                    fontSize: '0.65rem', fontWeight: 800,
                    color: isLightColor(colorB.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    B
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── SEO block ──────────────────────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              How to Compare Pantone Colors
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              Choosing between two Pantone PMS colors is a common challenge for brand designers, print buyers, and packaging specialists.
              Even colors that look similar on screen can produce noticeably different results on press — especially when mixing coated
              and uncoated substrates. This tool lets you compare any two PMS colors side by side, showing their exact HEX, RGB, and CMYK
              values as well as a ΔE (Delta-E) difference score.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, marginTop: '0.75rem', marginBottom: 0 }}>
              The ΔE score is calculated as the straight-line Euclidean distance in RGB space. A ΔE below 10 indicates colors
              that are nearly indistinguishable to the naked eye, while values above 60 represent very different hues. Use this
              comparison to verify substitutions, validate brand color alternatives, or simply explore the Pantone library.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
