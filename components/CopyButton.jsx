import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn${copied ? ' copied' : ''}`}
      title={`Copy ${text}`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied!' : (label || 'Copy')}
    </button>
  );
}
