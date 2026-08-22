import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';
import { RefreshCw, ArrowRight, AlertTriangle, Info, Search, X } from 'lucide-react';

import ogMeta from './ogMeta';
import NavBar from './NavBar';
import Footer from './Footer';
import FAQSection from './FAQSection';
import CopyableValue from './CopyableValue';
import Breadcrumb, { breadcrumbSchema } from './Breadcrumb';
import SystemMatchCard, { SourceSwatch } from './SystemMatchCard';

import pantoneDb from '../data/pantone.json';
import { pathFrom } from '../lib/ogCards.mjs';
import {
  hexToRgb, rgbToHex, rgbToCmyk, clamp,
  findClosestByDeltaE, filterPalette,
  rgbToLab, rgbToHsv, formatLab, formatHsv,
} from '../lib/colorUtils';

// Matching against the full 3,231-entry database returns near-duplicates of the
// same PMS number in coated and uncoated form, which reads as padding. Coated is
// the deck these industrial standards are cross-referenced against in practice.
const PANTONE_COATED = pantoneDb.filter((e) => e.collection === 'coated');

// ─── Input widgets ───────────────────────────────────────────────────────────

/** Autocomplete over any palette — the Pantone database or an industrial deck. */
function PaletteSearchInput({ palette, value, onChange, onSelect, placeholder, label, hint }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = useMemo(
    () => (value.trim() ? filterPalette(value, palette, 10) : []),
    [value, palette]
  );

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div>
      <label htmlFor="converter-search" className="input-label" style={{ marginBottom: '0.75rem' }}>
        {label}
      </label>
      <div ref={wrapRef} style={{ position: 'relative' }}>
        <Search
          size={17}
          color="#9ca3af"
          strokeWidth={2.2}
          aria-hidden="true"
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          ref={inputRef}
          id="converter-search"
          type="search"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
          className="input-field"
          placeholder={placeholder}
          style={{ fontSize: '1rem', padding: '0.875rem 2.75rem 0.875rem 2.6rem' }}
          autoComplete="off"
          aria-describedby="converter-search-hint"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); setOpen(false); inputRef.current?.focus(); }}
            aria-label="Clear the search box"
            title="Clear and search for another colour"
            style={{
              position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)',
              background: '#f3f4f6', border: 'none', borderRadius: '9999px',
              width: '1.5rem', height: '1.5rem', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e5e7eb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
          >
            <X size={12} color="#4b5563" strokeWidth={2.5} />
          </button>
        )}
        {open && suggestions.length > 0 && (
          <ul style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', border: '1.5px solid #e9a8fd', borderRadius: '0.875rem',
            boxShadow: '0 8px 24px rgba(196,78,237,0.15)', zIndex: 100,
            listStyle: 'none', margin: 0, padding: '0.375rem', maxHeight: '18rem', overflowY: 'auto',
          }}>
            {suggestions.map((entry) => (
              <li key={entry.code || entry.name}>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect(entry);
                    onChange(entry.code || entry.name);
                    setOpen(false);
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.5rem 0.75rem', border: 'none', background: 'transparent',
                    borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f3ff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '0.35rem',
                    backgroundColor: entry.hex, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0,
                  }} />
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>
                      {entry.code || entry.name}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: '#6b7280' }}>
                      {entry.hex}{entry.localName ? ` · ${entry.localName}` : ''}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {hint && (
        <p id="converter-search-hint" style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0.6rem 0 0' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

/** Numeric field row used by the LAB and HSV inputs. */
function NumericField({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={field.id} className="input-label">
        {field.label}
        <span style={{ marginLeft: '0.4rem', color: '#9ca3af', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>
          {field.min} – {field.max}
        </span>
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${field.label} slider`}
          style={{ flex: 1, accentColor: field.color || '#c44eed', minWidth: 0 }}
        />
        <input
          id={field.id}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
          style={{ width: '5.5rem', flexShrink: 0, textAlign: 'center', padding: '0.5rem' }}
        />
      </div>
    </div>
  );
}

// ─── Content blocks ──────────────────────────────────────────────────────────

function SeoCard({ accentColor, id, h2, children, first = false }) {
  return (
    <section
      id={id}
      className="card"
      style={{ borderTop: `3px solid ${accentColor}`, ...(first ? { marginTop: '1rem' } : {}) }}
    >
      <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
        {h2}
      </h2>
      {children}
    </section>
  );
}

const P_STYLE = { fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75 };

function Paragraphs({ items }) {
  return items.map((text, i) => (
    <p key={i} style={{ ...P_STYLE, margin: i > 0 ? '0.75rem 0 0' : 0 }}>{text}</p>
  ));
}

/**
 * Pantone-vs-system comparison table. Scrolls inside its own container so a
 * three-column table never forces the page body sideways on a phone.
 */
function ComparisonTable({ systemLabel, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '0 -0.25rem', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', minWidth: '34rem', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <caption className="sr-only">
          Side-by-side comparison of the Pantone Matching System and {systemLabel}
        </caption>
        <thead>
          <tr>
            {['', 'Pantone (PMS)', systemLabel].map((h, i) => (
              <th
                key={h || i}
                scope="col"
                style={{
                  textAlign: 'left', padding: '0.65rem 0.75rem',
                  borderBottom: '2px solid #e5e7eb',
                  fontSize: '0.7rem', fontWeight: 800, color: '#6b7280',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, pantone, system]) => (
            <tr key={label}>
              <th
                scope="row"
                style={{
                  textAlign: 'left', padding: '0.7rem 0.75rem',
                  borderBottom: '1px solid #f3f4f6',
                  fontWeight: 700, color: '#111827', verticalAlign: 'top',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </th>
              <td style={{ padding: '0.7rem 0.75rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', lineHeight: 1.6, verticalAlign: 'top' }}>
                {pantone}
              </td>
              <td style={{ padding: '0.7rem 0.75rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', lineHeight: 1.6, verticalAlign: 'top' }}>
                {system}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The "how the two systems line up" visual: real worked conversions, each drawn
 * as source swatch → arrow → matched swatch with the ΔE between them. Values are
 * computed from the same data the tool uses, so the diagram cannot go stale.
 */
function ConversionMap({ examples, sourceLabel, targetLabel }) {
  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(17rem, 1fr))', gap: '0.875rem',
      }}>
        {examples.map((ex) => (
          <figure
            key={ex.sourceCode}
            style={{
              margin: 0, border: '1.5px solid #e5e7eb', borderRadius: '0.875rem',
              background: '#fff', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div
                style={{ flex: 1, minHeight: '4.5rem', backgroundColor: ex.sourceHex }}
                role="img"
                aria-label={`${ex.sourceCode}, hex ${ex.sourceHex}`}
              />
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', background: '#f9fafb', flexShrink: 0,
                borderLeft: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6',
              }}>
                <ArrowRight size={15} color="#9ca3af" strokeWidth={2.5} />
              </div>
              <div
                style={{ flex: 1, minHeight: '4.5rem', backgroundColor: ex.targetHex }}
                role="img"
                aria-label={`${ex.targetCode}, hex ${ex.targetHex}`}
              />
            </div>
            <figcaption style={{ padding: '0.6rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>
                  {ex.sourceCode}
                </span>
                <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontFamily: 'monospace' }}>{ex.sourceHex}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.3 }}>
                  {ex.targetCode}
                </span>
                <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontFamily: 'monospace' }}>{ex.targetHex}</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600, marginTop: '0.1rem' }}>
                ΔE*00 {ex.deltaE} — {ex.quality}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.6, margin: '0.9rem 0 0' }}>
        Left swatch is the {sourceLabel} colour, right swatch is the closest {targetLabel} equivalent
        the tool returns. ΔE*00 below 2 is a commercial match; above 5 the two colours read as
        visibly different.
      </p>
    </div>
  );
}

/**
 * The visual for the two computed-model pages. A source/target swatch pair makes
 * no sense when the target is a set of numbers rather than another swatch, so
 * these show real Pantone colours beside the values the model gives them —
 * which is what the reader actually needs to see the relationship.
 */
function FormulaExampleGrid({ examples, formula, direction }) {
  const isToPantone = direction === 'to-pantone';

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', gap: '0.875rem',
      }}>
        {examples.map((ex) => (
          <figure
            key={ex.name}
            style={{
              margin: 0, border: '1.5px solid #e5e7eb', borderRadius: '0.875rem',
              background: '#fff', overflow: 'hidden',
            }}
          >
            <div
              style={{ height: '4.5rem', backgroundColor: ex.hex }}
              role="img"
              aria-label={`Colour swatch for ${ex.name}, hex ${ex.hex}`}
            />
            <figcaption style={{ padding: '0.65rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isToPantone ? '#7c3aed' : '#111827', lineHeight: 1.3 }}>
                {ex.name}
              </span>
              <code style={{
                fontSize: '0.68rem', color: '#374151', background: '#f3f4f6',
                padding: '0.2rem 0.4rem', borderRadius: '0.25rem',
                fontFamily: 'monospace', lineHeight: 1.5, wordBreak: 'break-word',
              }}>
                {ex.value}
              </code>
              <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontFamily: 'monospace' }}>{ex.hex}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.6, margin: '0.9rem 0 0' }}>
        {isToPantone
          ? `Enter any of these ${formula.outputLabel} values into the fields above and the tool returns the Pantone colour shown. The relationship is arithmetic, so it holds in both directions.`
          : `Each Pantone colour above is shown with the ${formula.outputLabel} values this tool computes for it. Unlike a cross-standard match, this conversion is a calculation rather than a nearest neighbour — there is no ΔE, because nothing is being approximated.`}
      </p>
    </div>
  );
}

/**
 * CodeAnatomy — two colour codes pulled apart segment by segment.
 *
 * The fashion pages exist largely to stop people confusing two unrelated
 * Pantone libraries, and the fastest way to show they are unrelated is to show
 * that one code carries meaning and the other does not. Built from spans rather
 * than an image so it stays selectable, scales with the type, and needs no
 * asset pipeline.
 */
function CodeAnatomy({ left, right, accentColor }) {
  const panels = [
    { ...left, tone: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
    { ...right, tone: accentColor, bg: '#fdf4ff', border: '#e9a8fd' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))', gap: '1rem' }}>
        {panels.map((p) => (
          <figure
            key={p.label}
            style={{
              margin: 0, padding: '1.1rem 1.15rem', borderRadius: '0.875rem',
              background: p.bg, border: `1.5px solid ${p.border}`,
            }}
          >
            <figcaption style={{
              fontSize: '0.65rem', fontWeight: 800, color: p.tone,
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem',
            }}>
              {p.label}
            </figcaption>

            {/* The code, split into its parts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.9rem' }}>
              {p.parts.map((part, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.3rem 0.6rem', borderRadius: '0.4rem',
                    background: '#ffffff', border: `1.5px solid ${part.note ? p.tone : '#e5e7eb'}`,
                    fontFamily: 'monospace', fontWeight: 800, fontSize: '1.05rem',
                    color: '#111827', lineHeight: 1,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>

            {/* What each part means */}
            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {p.parts.map((part, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <dt style={{
                    fontFamily: 'monospace', fontWeight: 800, fontSize: '0.72rem',
                    color: p.tone, flexShrink: 0, minWidth: '3.2rem',
                  }}>
                    {part.text}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.55 }}>
                    {part.note}
                  </dd>
                </div>
              ))}
            </dl>

            {p.summary && (
              <p style={{
                fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.6,
                margin: '0.85rem 0 0', paddingTop: '0.7rem', borderTop: `1px solid ${p.border}`,
              }}>
                {p.summary}
              </p>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

/**
 * ConverterPage — shared shell for the industrial colour-system converters.
 *
 * Every page on the site owns its own <Head>; this component owns it on their
 * behalf so the eleven Category-A pages cannot drift apart on canonical form,
 * schema shape or layout. Content is entirely prop-driven — nothing here is
 * specific to RAL, NCS or any other system.
 *
 * Four tool shapes cover all eleven pages:
 *   pantone-to-palette   search Pantone  → nearest codes in an industrial deck
 *   pantone-to-formula   search Pantone  → computed LAB / HSV values
 *   palette-to-pantone   search a deck   → nearest Pantone colours
 *   formula-to-pantone   numeric fields  → nearest Pantone colours
 */
export default function ConverterPage({
  // ── identity / SEO
  canonical,
  pageTitle,
  metaDescription,
  h1,
  heroLead,
  breadcrumbLabel,
  icon,
  iconBg,
  accentColor,
  appName,
  appDescription,
  featureList = [],

  // ── tool
  mode,
  palette,
  systemLabel,
  sourceLabel = 'Pantone',
  targetLabel,
  formula,
  presets = [],
  searchLabel,
  searchPlaceholder,
  searchHint,

  // ── content
  aboutH2,
  aboutParagraphs = [],
  comparisonRows = [],
  codeAnatomy,
  exampleCodes = [],
  useCases = [],
  useCasesIntro,
  howToSteps = [],
  howToIntro,
  accuracyNote,
  deltaENote,
  trademark,
  faqs = [],
  relatedLinks = [],
  extraSections = [],
}) {
  const path = pathFrom(canonical);

  // `palette?.colors ?? []` allocates a fresh array on every render, which would
  // invalidate every memo below and re-run a 3,231-entry ΔE sweep on each
  // keystroke. Pinning it keeps the matching work tied to the actual input.
  const paletteColors = useMemo(() => palette?.colors ?? [], [palette]);

  // ── Tool state ─────────────────────────────────────────────────
  // `mode` is really two independent choices — what you convert from and what
  // you convert to — so split it rather than enumerating every combination.
  //   pantone   the Pantone coated deck, searched by name
  //   palette   the industrial / brand deck passed in `palette`
  //   formula   a computed model (LAB, HSV, HEX, CMYK) entered or calculated
  const [sourceKind, targetKind] = mode.split('-to-');

  const searchPalette = sourceKind === 'palette' ? paletteColors : PANTONE_COATED;
  const isFormulaInput = sourceKind === 'formula';
  const isTextInput = isFormulaInput && formula?.kind === 'text';

  // Landing on an empty box over a blank results area tells a visitor nothing
  // about what the tool does. Start on the first suggested colour so the page
  // arrives already converted — the same way the numeric pages arrive with
  // their fields filled in.
  const initialSelection = useMemo(() => {
    if (isFormulaInput || presets.length === 0) return null;
    return searchPalette.find((c) => (c.code || c.name) === presets[0]) ?? null;
  }, [isFormulaInput, presets, searchPalette]);

  const [query, setQuery] = useState(() =>
    (initialSelection ? (initialSelection.code || initialSelection.name) : ''));
  const [selected, setSelected] = useState(() => initialSelection);
  const [fieldValues, setFieldValues] = useState(
    () => (formula?.fields ?? []).map((f) => String(f.initial))
  );
  const [textValue, setTextValue] = useState(() => formula?.initial ?? '');

  const resetFields = () => {
    setFieldValues((formula?.fields ?? []).map((f) => String(f.initial)));
    setTextValue(formula?.initial ?? '');
  };

  // The colour the page is currently converting *from*, as RGB.
  const sourceRgb = useMemo(() => {
    if (isTextInput) return formula.parse(textValue);
    if (isFormulaInput) {
      const nums = (formula.fields ?? []).map((f, i) => {
        const raw = parseFloat(fieldValues[i]);
        return clamp(Number.isNaN(raw) ? f.initial : raw, f.min, f.max);
      });
      return formula.toRgb(...nums);
    }
    if (!selected) return null;
    return selected.rgb ?? hexToRgb(selected.hex);
  }, [isTextInput, isFormulaInput, formula, fieldValues, textValue, selected]);

  const sourceHex = sourceRgb ? rgbToHex(sourceRgb.r, sourceRgb.g, sourceRgb.b) : null;

  // ── Results ────────────────────────────────────────────────────
  const matches = useMemo(() => {
    if (!sourceRgb || targetKind === 'formula') return [];
    const pool = targetKind === 'pantone' ? PANTONE_COATED : paletteColors;
    return findClosestByDeltaE(sourceRgb, pool, 5);
  }, [sourceRgb, targetKind, paletteColors]);

  const formulaOutput = useMemo(() => {
    if (targetKind !== 'formula' || !sourceRgb) return null;
    return formula.fromRgb(sourceRgb);
  }, [targetKind, sourceRgb, formula]);

  const resultsAreP = targetKind === 'pantone';
  const isFormulaMode = sourceKind === 'formula' || targetKind === 'formula';

  // ── Worked examples for the diagram ────────────────────────────
  // Resolved from the same data the tool queries, so the figure always agrees
  // with what a visitor gets by typing the code in.
  const examples = useMemo(() => {
    // The computed-model pages have no target palette — their "conversion" is
    // arithmetic — so they get a value grid instead of swatch pairs.
    if (isFormulaMode) {
      const pool = sourceKind === 'palette' ? paletteColors : PANTONE_COATED;
      return exampleCodes
        .map((code) => {
          const src = pool.find((c) => (c.code || c.name) === code)
            || pool.find((c) => (c.code || c.name).toLowerCase().includes(code.toLowerCase()));
          if (!src) return null;
          const rgb = src.rgb ?? hexToRgb(src.hex);
          return {
            name: src.code || src.name,
            hex: src.hex.toUpperCase(),
            value: formula.format(formula.fromRgb(rgb)),
          };
        })
        .filter(Boolean);
    }

    const from = sourceKind === 'palette' ? paletteColors : PANTONE_COATED;
    const to   = targetKind === 'pantone' ? PANTONE_COATED : paletteColors;
    if (!from.length || !to.length) return [];

    return exampleCodes
      .map((code) => {
        const src = from.find((c) => (c.code || c.name) === code)
          || from.find((c) => (c.code || c.name).toLowerCase().includes(code.toLowerCase()));
        if (!src) return null;
        const srcRgb = src.rgb ?? hexToRgb(src.hex);
        const best = findClosestByDeltaE(srcRgb, to, 1)[0];
        if (!best) return null;
        return {
          sourceCode: src.code || src.name,
          sourceHex: src.hex.toUpperCase(),
          targetCode: best.code || best.name,
          targetHex: best.hex.toUpperCase(),
          deltaE: best.deltaE,
          quality: best.quality.label,
        };
      })
      .filter(Boolean);
  }, [exampleCodes, sourceKind, targetKind, paletteColors, isFormulaMode, formula]);

  // ── Structured data ────────────────────────────────────────────
  const trail = [
    { label: 'Home', href: '/' },
    { label: breadcrumbLabel },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['WebApplication', 'SoftwareApplication'],
        name: appName,
        url: canonical,
        description: appDescription || metaDescription,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        ...(featureList.length ? { featureList } : {}),
      },
      breadcrumbSchema(trail, canonical),
      ...(faqs.length
        ? [{
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }]
        : []),
      ...(howToSteps.length
        ? [{
            '@type': 'HowTo',
            name: `How to convert ${sourceLabel} to ${targetLabel}`,
            step: howToSteps.map((text, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              text,
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {ogMeta({ path })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)',
          borderBottom: '1px solid #f3f4f6', padding: '2rem 1.5rem 2rem',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <Breadcrumb trail={trail} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {icon}
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 900, color: '#111827', margin: 0, lineHeight: 1.2 }}>
                {h1}
              </h1>
            </div>
            <p style={{ ...P_STYLE, fontSize: '1rem', margin: 0, maxWidth: '44rem' }}>
              {heroLead}
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>

          {/* ── Tool ────────────────────────────────────────────── */}
          <div className="card">
            {isFormulaInput ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>
                    {searchLabel}
                  </span>
                  <button onClick={resetFields} className="copy-btn" type="button">
                    <RefreshCw size={11} /> Reset
                  </button>
                </div>
                {isTextInput && (
                  <div>
                    <label htmlFor="converter-text" className="input-label">
                      {formula.outputLabel} value
                    </label>
                    <input
                      id="converter-text"
                      type="text"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      className="input-field"
                      placeholder={formula.placeholder}
                      style={{ fontSize: '1rem', padding: '0.875rem 1.25rem', fontFamily: 'monospace' }}
                      autoComplete="off"
                      spellCheck="false"
                      aria-invalid={sourceRgb ? 'false' : 'true'}
                    />
                    {!sourceRgb && textValue.trim() !== '' && (
                      <p role="alert" style={{ fontSize: '0.78rem', color: '#b91c1c', margin: '0.5rem 0 0', fontWeight: 600 }}>
                        That is not a valid {formula.outputLabel} value yet — keep typing.
                      </p>
                    )}
                  </div>
                )}
                {!isTextInput && formula.fields.map((field, i) => (
                  <NumericField
                    key={field.id}
                    field={field}
                    value={fieldValues[i]}
                    onChange={(v) => setFieldValues((prev) => prev.map((p, j) => (j === i ? v : p)))}
                  />
                ))}
                {searchHint && (
                  <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0 }}>{searchHint}</p>
                )}
              </div>
            ) : (
              <PaletteSearchInput
                palette={searchPalette}
                value={query}
                onChange={setQuery}
                onSelect={setSelected}
                label={searchLabel}
                placeholder={searchPlaceholder}
                hint={searchHint}
              />
            )}

            {presets.length > 0 && !isFormulaInput && (
              <div style={{ marginTop: '1.1rem' }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#6b7280',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem',
                }}>
                  Or jump to a common {sourceLabel} colour
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {presets.map((code) => {
                    const entry = searchPalette.find((c) => (c.code || c.name) === code);
                    if (!entry) return null;
                    const active = selected && (selected.code || selected.name) === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => { setSelected(entry); setQuery(entry.code || entry.name); }}
                        aria-pressed={!!active}
                        className="copy-btn"
                        style={{
                          gap: '0.4rem',
                          ...(active ? {
                            background: '#f5f3ff',
                            borderColor: '#c4b5fd',
                            color: '#7c3aed',
                          } : {}),
                        }}
                      >
                        <span style={{
                          width: '0.85rem', height: '0.85rem', borderRadius: '0.2rem',
                          backgroundColor: entry.hex, border: '1px solid rgba(0,0,0,0.15)',
                          display: 'inline-block', flexShrink: 0,
                        }} />
                        {(entry.code || entry.name).replace('Pantone ', '')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Result ──────────────────────────────────────────── */}
          {sourceHex && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6">
              <SourceSwatch
                hex={sourceHex}
                caption={isFormulaInput ? `${sourceLabel} input` : sourceLabel}
                title={selected ? (selected.code || selected.name) : undefined}
                saveAs={{
                  name: selected ? (selected.code || selected.name) : `${sourceLabel} ${sourceHex}`,
                  hex: sourceHex,
                  rgb: sourceRgb,
                  cmyk: rgbToCmyk(sourceRgb.r, sourceRgb.g, sourceRgb.b),
                  collection: selected ? (selected.collection || systemLabel || 'Pantone') : sourceLabel,
                  ...(selected?.localName ? { localName: selected.localName } : {}),
                }}
                subtitle={
                  isTextInput
                    ? formula.describe(textValue)
                    : isFormulaInput
                      ? formula.describe(...(formula.fields ?? []).map((f, i) => {
                          const raw = parseFloat(fieldValues[i]);
                          return clamp(Number.isNaN(raw) ? f.initial : raw, f.min, f.max);
                        }))
                      : selected?.localName
                }
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {formulaOutput && (
                  <FormulaOutput
                    output={formulaOutput}
                    formula={formula}
                    sourceRgb={sourceRgb}
                    accentColor={accentColor}
                  />
                )}

                {matches.length > 0 && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                        Closest {targetLabel} matches
                      </h2>
                      <span className="badge badge-purple">Ranked by ΔE*00</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {matches.map((match, i) => (
                        <SystemMatchCard
                          key={match.code || match.name}
                          match={match}
                          rank={i}
                          systemLabel={resultsAreP ? 'Pantone (coated)' : systemLabel}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Only reachable if a page ships without presets and the visitor
              clears the field — the compact form keeps it from leaving a hole. */}
          {!sourceHex && (
            <p style={{
              margin: 0, padding: '0.9rem 1.1rem', borderRadius: '0.875rem',
              background: '#f9fafb', border: '1px solid #f3f4f6',
              color: '#6b7280', fontSize: '0.85rem', textAlign: 'center',
            }}>
              Start typing a {sourceLabel} colour above to see its {targetLabel} equivalent.
            </p>
          )}

          {/* ── 2. What is [system]? ────────────────────────────── */}
          <SeoCard accentColor={accentColor} id="about" h2={aboutH2} first>
            <Paragraphs items={aboutParagraphs} />
          </SeoCard>

          {/* ── 3. Comparison table ─────────────────────────────── */}
          {comparisonRows.length > 0 && (
            <SeoCard accentColor={accentColor} id="comparison" h2={`Pantone vs ${systemLabel}: how they differ`}>
              <ComparisonTable systemLabel={systemLabel} rows={comparisonRows} />
            </SeoCard>
          )}

          {/* ── 3b. Code anatomy — how the two numbering systems differ ── */}
          {codeAnatomy && (
            <SeoCard accentColor={accentColor} id="code-anatomy" h2={codeAnatomy.h2}>
              {codeAnatomy.intro && <p style={{ ...P_STYLE, margin: '0 0 1rem' }}>{codeAnatomy.intro}</p>}
              <CodeAnatomy left={codeAnatomy.left} right={codeAnatomy.right} accentColor={accentColor} />
              {codeAnatomy.note && (
                <p style={{ ...P_STYLE, fontSize: '0.85rem', margin: '1rem 0 0' }}>{codeAnatomy.note}</p>
              )}
            </SeoCard>
          )}

          {/* ── 4. Visual conversion map ────────────────────────── */}
          {examples.length > 0 && (
            <SeoCard accentColor={accentColor} id="examples" h2={`Worked ${sourceLabel} → ${targetLabel} conversions`}>
              {isFormulaMode ? (
                <FormulaExampleGrid
                  examples={examples}
                  formula={formula}
                  direction={sourceKind === 'formula' ? 'to-pantone' : 'from-pantone'}
                />
              ) : (
                <ConversionMap examples={examples} sourceLabel={sourceLabel} targetLabel={targetLabel} />
              )}
            </SeoCard>
          )}

          {/* ── 5. Use cases ────────────────────────────────────── */}
          {useCases.length > 0 && (
            <SeoCard accentColor={accentColor} id="use-cases" h2={`Who converts ${sourceLabel} to ${targetLabel}?`}>
              {useCasesIntro && <p style={{ ...P_STYLE, margin: '0 0 0.75rem' }}>{useCasesIntro}</p>}
              <ul style={{ ...P_STYLE, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {useCases.map((u) => (
                  <li key={u.title}>
                    <strong style={{ color: '#111827' }}>{u.title}</strong> — {u.body}
                  </li>
                ))}
              </ul>
            </SeoCard>
          )}

          {/* ── 6. How to use ───────────────────────────────────── */}
          {howToSteps.length > 0 && (
            <SeoCard accentColor={accentColor} id="how-to" h2={`How to use this ${sourceLabel} to ${targetLabel} converter`}>
              {howToIntro && <p style={{ ...P_STYLE, margin: '0 0 0.75rem' }}>{howToIntro}</p>}
              <ol style={{ ...P_STYLE, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {howToSteps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </SeoCard>
          )}

          {/* ── Any page-specific extra prose ───────────────────── */}
          {extraSections.map((section) => (
            <SeoCard key={section.id} accentColor={accentColor} id={section.id} h2={section.h2}>
              {section.paragraphs && <Paragraphs items={section.paragraphs} />}
              {section.list && (
                <ul style={{ ...P_STYLE, margin: section.paragraphs ? '0.75rem 0 0' : 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {section.list.map((item) => (
                    <li key={item.title || item}>
                      {item.title
                        ? <><strong style={{ color: '#111827' }}>{item.title}</strong> — {item.body}</>
                        : item}
                    </li>
                  ))}
                </ul>
              )}
            </SeoCard>
          ))}

          {/* ── 7. Accuracy warning ─────────────────────────────── */}
          <section
            id="accuracy"
            className="card"
            style={{ borderTop: '3px solid #f59e0b', background: '#fffbeb' }}
            aria-labelledby="accuracy-heading"
          >
            <h2
              id="accuracy-heading"
              style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <AlertTriangle size={18} color="#b45309" strokeWidth={2.5} aria-hidden="true" />
              Accuracy — read before you specify a colour
            </h2>
            <p style={{ ...P_STYLE, color: '#78350f', margin: 0 }}>{accuracyNote}</p>
            {deltaENote && (
              <p style={{ ...P_STYLE, color: '#78350f', margin: '0.75rem 0 0' }}>{deltaENote}</p>
            )}
            <p style={{
              fontSize: '0.82rem', color: '#78350f', lineHeight: 1.6, margin: '0.85rem 0 0',
              padding: '0.7rem 0.9rem', background: 'rgba(255,255,255,0.6)',
              borderRadius: '0.5rem', borderLeft: '3px solid #fbbf24',
            }}>
              <strong>In short:</strong> conversion values on this page are approximate, because the two
              systems use different colourants and cover different gamuts. Verify against the official
              physical colour standard before committing to production, tooling or a signed-off brand spec.
            </p>
          </section>

          {/* ── 9. FAQ ──────────────────────────────────────────── */}
          {faqs.length > 0 && (
            <div className="card" style={{ borderTop: `3px solid ${accentColor}` }}>
              <FAQSection suppressSchema items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
          )}

          {/* ── 10. Related pages ───────────────────────────────── */}
          {relatedLinks.length > 0 && (
            <SeoCard accentColor={accentColor} id="related" h2="Related colour tools &amp; guides">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))', gap: '0.75rem' }}>
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'block', padding: '0.9rem 1rem', borderRadius: '0.75rem',
                      border: '1.5px solid #e5e7eb', background: '#f9fafb', textDecoration: 'none',
                      transition: 'border-color 0.15s ease, background 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.background = '#fdf4ff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.3 }}>
                        {link.label}
                      </span>
                      <ArrowRight size={15} color="#a78bfa" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    </span>
                    <span style={{ display: 'block', fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.55, marginTop: '0.3rem' }}>
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </SeoCard>
          )}

          {/* ── 8. Trademark notice ─────────────────────────────── */}
          <aside
            aria-label="Trademark notice"
            style={{
              display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
              padding: '1rem 1.15rem', borderRadius: '0.875rem',
              background: '#f9fafb', border: '1px solid #f3f4f6',
            }}
          >
            <Info size={16} color="#9ca3af" strokeWidth={2.2} style={{ flexShrink: 0, marginTop: '0.15rem' }} aria-hidden="true" />
            <p style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
              {trademark.system}® is a registered trademark of {trademark.owner}. PANTONE® is a
              registered trademark of Pantone LLC. This page is not affiliated with, endorsed by or
              sponsored by {trademark.owner} or Pantone LLC. All colour codes and names are the
              property of their respective owners and are referenced here for identification only.
              {trademark.extra ? ` ${trademark.extra}` : ''}
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

/**
 * Computed-value panel for every page whose target is a model rather than a
 * catalogue. Secondary values are derived from the source RGB rather than from
 * a selected swatch, so the panel works whether the colour came from a Pantone
 * lookup, a palette code or a typed value.
 */
function FormulaOutput({ output, formula, sourceRgb, accentColor }) {
  const primary = formula.format(output);
  const { r, g, b } = sourceRgb;
  const lab = rgbToLab(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);

  // Whatever the page converts *to* is already shown above; don't repeat it.
  const secondary = [
    ['HEX', rgbToHex(r, g, b)],
    ['RGB', `${r}, ${g}, ${b}`],
    ['CMYK', `C:${cmyk.c} M:${cmyk.m} Y:${cmyk.y} K:${cmyk.k}`],
    ['LAB', formatLab(lab)],
    ['HSV', formatHsv(hsv)],
  ].filter(([label]) => label !== formula.id.toUpperCase());

  return (
    <>
      <div style={{ border: `2px solid ${accentColor}`, borderRadius: '1rem', padding: '1.25rem', background: '#fdf4ff' }}>
        <h2 style={{
          margin: '0 0 0.6rem', fontWeight: 800, fontSize: '0.85rem', color: '#7e22ce',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {formula.outputLabel}
        </h2>
        <CopyableValue label={formula.id} value={primary} title={formula.outputLabel} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${formula.fields.length}, 1fr)`, gap: '0.5rem', marginTop: '0.75rem' }}>
          {formula.fields.map((field) => (
            <div key={field.id} style={{ background: '#fff', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: field.color || '#6b7280', textTransform: 'uppercase' }}>
                {field.short}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
                {output[field.key]}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#6b7280' }}>{field.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* The remaining models, each a single copy target. */}
      <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', background: '#fff' }}>
        <div style={{ fontWeight: 700, fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
          The same colour in other models
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {secondary.map(([label, value]) => (
            <CopyableValue key={label} label={label} value={value} />
          ))}
        </div>
      </div>
    </>
  );
}
