import { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * CopyableValue — a labelled value that is itself the copy control.
 *
 * The earlier match card showed four unlabelled value chips and then a separate
 * row of buttons, one of which just said "Copy" — leaving you to guess which
 * value it took. Putting the affordance on the value removes the guess: there
 * is exactly one control per piece of data, and it sits on the data.
 *
 * @param {object} props
 * @param {string} props.label   Short field name, e.g. "HEX".
 * @param {string} props.value   Text shown and copied.
 * @param {string} [props.display]  Shown instead of `value` when it needs truncating.
 * @param {string} [props.title]    Overrides the tooltip / aria-label subject.
 */
export default function CopyableValue({ label, value, display, title }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard is unavailable (insecure origin, denied permission). Leave the
      // value on screen so it can still be selected by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${title || label}: ${value}`}
      aria-label={`Copy ${title || label}, ${value}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.25rem 0.5rem', borderRadius: '0.4rem',
        border: `1px solid ${copied ? '#86efac' : '#e5e7eb'}`,
        background: copied ? '#f0fdf4' : '#f9fafb',
        cursor: 'pointer', fontFamily: 'inherit', maxWidth: '100%',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.borderColor = '#c4b5fd'; } }}
      onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; } }}
    >
      <span style={{
        fontSize: '0.6rem', fontWeight: 800,
        color: copied ? '#16a34a' : '#9ca3af',
        textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0,
      }}>
        {label}
      </span>

      <code style={{
        fontSize: '0.72rem', fontWeight: 600,
        color: copied ? '#166534' : '#374151',
        fontFamily: 'monospace', whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {copied ? 'Copied!' : (display || value)}
      </code>

      {copied
        ? <Check size={11} color="#16a34a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
        : <Copy size={11} color="#9ca3af" strokeWidth={2.2} style={{ flexShrink: 0 }} />}
    </button>
  );
}
