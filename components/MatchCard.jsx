import { Heart } from 'lucide-react';
import CopyButton from './CopyButton';
import { useFavorites } from '../lib/FavoritesContext';

export default function MatchCard({ match, rank }) {
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

        {/* Values row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          {[
            { key: 'HEX',  val: match.hex, copy: match.hex },
            { key: 'RGB',  val: rgbStr,    copy: rgbStr    },
            { key: 'CMYK', val: cmykStr,   copy: cmykStr   },
            { key: 'Name', val: null,      copy: match.name },
          ].map(({ key, val, copy }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {val !== null && (
                <>
                  <span style={{ fontSize: '0.72rem', color: '#4b5563', fontWeight: 700 }}>{key}</span>
                  <code style={{ fontSize: '0.72rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
                    {val}
                  </code>
                </>
              )}
              <CopyButton text={copy} label={val === null ? 'Copy Name' : 'Copy'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
