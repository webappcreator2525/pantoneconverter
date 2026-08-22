import { Heart } from 'lucide-react';
import CopyableValue from './CopyableValue';
import { useFavorites } from '../lib/FavoritesContext';
import { isLightColor } from '../lib/colorUtils';

const TONE_STYLES = {
  good: { bg: '#dcfce7', fg: '#166534' },
  fair: { bg: '#fef9c3', fg: '#854d0e' },
  poor: { bg: '#fee2e2', fg: '#991b1b' },
};

/**
 * SystemMatchCard — one result row on the cross-system converters.
 *
 * The site's original MatchCard ranks by weighted RGB distance and shows a
 * similarity percentage, which is the right story for "find a similar Pantone".
 * Cross-standard matching is a different question — a buyer needs to know
 * whether the substitute falls inside a tolerance — so this card leads with
 * ΔE*00 and its quality band instead.
 *
 * Every value is its own copy control, so there is one unambiguous target per
 * piece of data rather than a separate row of buttons to decode.
 *
 * @param {object}  props
 * @param {object}  props.match        Entry from findClosestByDeltaE().
 * @param {number}  props.rank         0-based position, drives the badge.
 * @param {string}  [props.systemLabel]  e.g. "RAL Classic", shown above the code.
 * @param {boolean} [props.favouritable]  Show the save-to-favourites heart.
 */
export default function SystemMatchCard({ match, rank, systemLabel, favouritable = true }) {
  const { isSaved, toggleFavorite } = useFavorites();

  const { hex, rgb, cmyk, lab, deltaE, quality } = match;
  const code = match.code || match.name;
  const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const cmykStr = `C:${cmyk.c} M:${cmyk.m} Y:${cmyk.y} K:${cmyk.k}`;
  const labStr = `L* ${lab.l} a* ${lab.a} b* ${lab.b}`;

  const tone = TONE_STYLES[quality.tone] || TONE_STYLES.fair;

  // Favourites are keyed by name, so store the code — it is what identifies the
  // colour to a supplier — and carry the system through as the collection so
  // /saved can show where a non-Pantone colour came from.
  const savedName = code;
  const saved = favouritable && isSaved(savedName);

  const handleFavorite = () => {
    toggleFavorite({
      name: savedName,
      hex,
      rgb,
      cmyk,
      collection: match.collection || systemLabel || '',
      ...(match.localName ? { localName: match.localName } : {}),
    });
  };

  return (
    <div className="match-card" style={{ position: 'relative', animationDelay: `${rank * 60}ms`, alignItems: 'stretch' }}>
      {/* Rank badge */}
      <div style={{
        position: 'absolute', top: '-0.55rem', left: '1rem',
        background: rank === 0 ? 'linear-gradient(135deg,#c44eed,#4361EE)' : '#e5e7eb',
        color: rank === 0 ? '#fff' : '#4b5563',
        borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700,
        padding: '0.15rem 0.55rem', letterSpacing: '0.04em', whiteSpace: 'nowrap',
      }}>
        {rank === 0 ? '★ Closest Match' : `#${rank + 1}`}
      </div>

      <div
        className="swatch-md"
        style={{ backgroundColor: hex, alignSelf: 'center' }}
        role="img"
        aria-label={`Colour swatch for ${code}, hex ${hex}`}
      />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 0 }}>
            {systemLabel && (
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {systemLabel}
              </div>
            )}
            <h3 style={{ margin: '0.1rem 0 0', fontSize: '1rem', fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>
              {code}
            </h3>
            {match.localName && (
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginTop: '0.1rem' }}>
                {match.localName}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span
              className="badge"
              style={{ background: tone.bg, color: tone.fg, whiteSpace: 'nowrap' }}
              title={quality.note}
            >
              ΔE {deltaE} · {quality.label}
            </span>
            {favouritable && (
              <button
                type="button"
                onClick={handleFavorite}
                aria-label={saved ? `Remove ${code} from saved colours` : `Save ${code} to your colours`}
                aria-pressed={saved}
                title={saved ? 'Remove from saved colours' : 'Save this colour'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.2rem', display: 'inline-flex', lineHeight: 0,
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Heart size={17} color={saved ? '#ef4444' : '#9ca3af'} fill={saved ? '#ef4444' : 'none'} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* Every value is its own copy button — click the value you want. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          <CopyableValue label="Code" value={code} title={`${systemLabel || ''} code`.trim()} />
          <CopyableValue label="HEX"  value={hex} />
          <CopyableValue label="RGB"  value={rgbStr} />
          <CopyableValue label="CMYK" value={cmykStr} />
          <CopyableValue label="LAB"  value={labStr} />
        </div>
      </div>
    </div>
  );
}

/**
 * Large "your input colour" panel shared by every converter page, so the source
 * colour reads the same whether it came from a Pantone lookup, a palette code
 * or a typed value.
 */
export function SourceSwatch({ hex, title, subtitle, caption, saveAs }) {
  const { isSaved, toggleFavorite } = useFavorites();

  const light = isLightColor(hex);
  const textCol = light ? '#1f2937' : '#ffffff';
  const subCol = light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';
  const chipBg = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.18)';

  const saved = saveAs ? isSaved(saveAs.name) : false;

  return (
    <div
      style={{
        borderRadius: '1.25rem', backgroundColor: hex,
        border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem', minHeight: '14rem', transition: 'background-color 0.25s ease',
      }}
      role="img"
      aria-label={`Selected colour ${title || hex}, hex value ${hex}`}
    >
      {caption && (
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: subCol, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          {caption}
        </div>
      )}
      {title && (
        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: textCol, textAlign: 'center', lineHeight: 1.3, marginBottom: '0.5rem' }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: textCol, fontFamily: 'monospace' }}>{hex}</div>
      {subtitle && (
        <div style={{ fontSize: '0.8rem', color: subCol, marginTop: '0.35rem', fontWeight: 600, textAlign: 'center' }}>
          {subtitle}
        </div>
      )}

      {saveAs && (
        <button
          type="button"
          onClick={() => toggleFavorite(saveAs)}
          aria-label={saved ? `Remove ${saveAs.name} from saved colours` : `Save ${saveAs.name} to your colours`}
          aria-pressed={saved}
          style={{
            marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.4rem 0.85rem', borderRadius: '9999px',
            border: `1.5px solid ${light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.35)'}`,
            background: chipBg, color: textCol, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: '0.75rem', fontWeight: 700,
            transition: 'background 0.15s ease',
          }}
        >
          <Heart size={13} color={saved ? '#ef4444' : textCol} fill={saved ? '#ef4444' : 'none'} strokeWidth={2.2} />
          {saved ? 'Saved' : 'Save colour'}
        </button>
      )}
    </div>
  );
}
