import { memo } from 'react';
import { Heart } from 'lucide-react';
import CopyableValue from './CopyableValue';
import { useFavorites } from '../lib/FavoritesContext';

/**
 * Memoised: the converter pages re-render on every keystroke to keep the input
 * responsive, but the five match cards only change when the settled value does.
 * `match` comes out of a useMemo, so its identity is stable between those.
 */
function MatchCard({ match, rank }) {
  const { c, m, y, k } = match.cmyk;
  const { r, g, b }     = match.rgb;
  const cmykStr = `C:${c} M:${m} Y:${y} K:${k}`;
  const rgbStr  = `${r}, ${g}, ${b}`;

  const { isSaved, toggleFavorite } = useFavorites();
  const saved = isSaved(match.name);

  const handleFavorite = () => {
    toggleFavorite({
      name:       match.name,
      hex:        match.hex,
      rgb:        match.rgb,
      cmyk:       match.cmyk,
      collection: match.collection ?? '',
    });
  };

  const simColor =
    match.similarity > 95 ? { bg: '#dcfce7', fg: '#166534' } :
    match.similarity > 85 ? { bg: '#fef9c3', fg: '#854d0e' } :
                            { bg: '#fee2e2', fg: '#991b1b' };

  return (
    <div className="match-card" style={{ position: 'relative', animationDelay: `${rank * 60}ms` }}>
      {/* Rank badge */}
      <div style={{
        position: 'absolute', top: '-0.55rem', left: '1rem',
        background: rank === 0 ? 'linear-gradient(135deg,#c44eed,#4361EE)' : '#e5e7eb',
        color: rank === 0 ? '#fff' : '#4b5563',
        borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700,
        padding: '0.15rem 0.55rem', letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}>
        {rank === 0 ? '★ Best Match' : `#${rank + 1}`}
      </div>

      {/* Swatch */}
      <div className="swatch-md" style={{ backgroundColor: match.hex }} title={match.hex} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name + similarity + heart */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
            {match.name}
          </span>
          <span className="badge" style={{ background: simColor.bg, color: simColor.fg }}>
            {match.similarity.toFixed(1)}% match
          </span>
          {/* Heart / Favorite button */}
          <button
            onClick={handleFavorite}
            aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
            title={saved ? 'Remove from favorites' : 'Save to favorites'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '0.375rem', marginLeft: 'auto', flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart
              size={17}
              fill={saved ? '#ef4444' : 'none'}
              color={saved ? '#ef4444' : '#6b7280'}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Values row — each value is its own copy control, matching the
            cross-system converters so copying works the same site-wide. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          <CopyableValue label="Name" value={match.name} title="Pantone name" />
          <CopyableValue label="HEX"  value={match.hex} />
          <CopyableValue label="RGB"  value={rgbStr} />
          <CopyableValue label="CMYK" value={cmykStr} />
        </div>
      </div>
    </div>
  );
}

export default memo(MatchCard);
