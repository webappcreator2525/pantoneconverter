import React from 'react';
import pantoneDb from '../data/pantone.json';
import CopyButton from './CopyButton';

export default function CoatedUncoatedComparison({ bestMatch }) {
  if (!bestMatch) return null;

  // Extract base number, e.g. "Pantone 186-C" -> "186"
  const match = bestMatch.name.match(/Pantone\s+(.*?)-(C|U)/i);
  if (!match) return null;

  const baseNumber = match[1];
  
  const coatedName = `Pantone ${baseNumber}-C`;
  const uncoatedName = `Pantone ${baseNumber}-U`;

  const coatedColor = pantoneDb.find(p => p.name === coatedName);
  const uncoatedColor = pantoneDb.find(p => p.name === uncoatedName);

  if (!coatedColor || !uncoatedColor) return null;

  const renderCard = (color, label) => {
    const { hex, rgb, cmyk, name } = color;
    return (
      <div style={{
        background: '#fff', borderRadius: '1rem', border: '1.5px solid #f3f4f6',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '1rem 1rem 0.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            {label}
          </div>
        </div>
        <div style={{ height: '8rem', backgroundColor: hex }} />
        <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{name}</h3>
            <CopyButton text={name} label="Copy Name" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
            {/* HEX */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>HEX</span>
                <code style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {hex}
                </code>
              </div>
              <CopyButton text={hex} />
            </div>

            {/* RGB */}
            {rgb && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>RGB</span>
                  <code style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                    {rgb.r}, {rgb.g}, {rgb.b}
                  </code>
                </div>
                <CopyButton text={`${rgb.r}, ${rgb.g}, ${rgb.b}`} />
              </div>
            )}

            {/* CMYK */}
            {cmyk && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>CMYK</span>
                  <code style={{ fontSize: '0.72rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                    C:{cmyk.c} M:{cmyk.m} Y:{cmyk.y} K:{cmyk.k}
                  </code>
                </div>
                <CopyButton text={`C:${cmyk.c} M:${cmyk.m} Y:${cmyk.y} K:${cmyk.k}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>
        Coated vs Uncoated Comparison
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {renderCard(coatedColor, 'Coated (C)')}
        {renderCard(uncoatedColor, 'Uncoated (U)')}
      </div>
      <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.6, padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #f3f4f6' }}>
        The same Pantone number looks different on coated (glossy) and uncoated (matte) paper due to ink absorption differences. Always verify against a physical Pantone swatch book.
      </p>
    </div>
  );
}
