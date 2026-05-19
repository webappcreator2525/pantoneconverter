import { Info, AlertTriangle, BookOpen, Zap } from 'lucide-react';

/**
 * InfoBox — callout / alert box for MDX articles.
 * Props: type ("tip" | "warning" | "note" | "danger"), children
 */
export function InfoBox({ type = 'note', children }) {
  const configs = {
    tip: {
      Icon: Zap,
      label: 'Tip',
      bg: '#f0fdf4',
      border: '#86efac',
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
      textColor: '#166534',
      labelColor: '#15803d',
    },
    warning: {
      Icon: AlertTriangle,
      label: 'Warning',
      bg: '#fffbeb',
      border: '#fcd34d',
      iconBg: '#fef3c7',
      iconColor: '#b45309',
      textColor: '#78350f',
      labelColor: '#b45309',
    },
    note: {
      Icon: Info,
      label: 'Note',
      bg: '#eff6ff',
      border: '#93c5fd',
      iconBg: '#dbeafe',
      iconColor: '#1d4ed8',
      textColor: '#1e3a5f',
      labelColor: '#1d4ed8',
    },
    danger: {
      Icon: AlertTriangle,
      label: 'Important',
      bg: '#fff1f2',
      border: '#fca5a5',
      iconBg: '#fee2e2',
      iconColor: '#b91c1c',
      textColor: '#7f1d1d',
      labelColor: '#b91c1c',
    },
  };

  const cfg = configs[type] ?? configs.note;
  const { Icon } = cfg;

  return (
    <div
      role="note"
      style={{
        display: 'flex', gap: '1rem',
        padding: '1rem 1.25rem', borderRadius: '0.875rem',
        border: `1.5px solid ${cfg.border}`, background: cfg.bg,
        margin: '1.5rem 0', alignItems: 'flex-start',
      }}
    >
      {/* Icon bubble */}
      <span
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '2rem', height: '2rem', borderRadius: '0.5rem',
          background: cfg.iconBg, flexShrink: 0, marginTop: '0.05rem',
        }}
      >
        <Icon size={16} color={cfg.iconColor} strokeWidth={2.5} />
      </span>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block', fontSize: '0.7rem', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: cfg.labelColor, marginBottom: '0.25rem',
        }}>
          {cfg.label}
        </span>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.65, color: cfg.textColor }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
