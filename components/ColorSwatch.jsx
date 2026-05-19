/**
 * ColorSwatch — inline color preview chip for MDX articles.
 *
 * Props:
 *   hex      {string}  CSS hex color, e.g. "#C8102E"
 *   label    {string}  Primary label (e.g. "Pantone 186 C")
 *   sublabel {string}  Optional secondary line of text
 */
export function ColorSwatch({ hex = '#000000', label = '', sublabel = '' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.25rem',
        borderRadius: '0.875rem',
        border: '1.5px solid #e5e7eb',
        background: '#f9fafb',
        margin: '1.25rem 0',
      }}
    >
      {/* Color chip */}
      <div
        style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '0.75rem',
          background: hex,
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
        aria-label={`Color swatch: ${label || hex}`}
      />

      {/* Labels */}
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: '#111827',
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#4b5563',
            marginTop: '0.15rem',
          }}
        >
          {hex.toUpperCase()}
          {sublabel && (
            <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
              — {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorSwatch;
