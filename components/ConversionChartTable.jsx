import { useMemo, useState } from 'react';

/**
 * ConversionChartTable — the 100-row reference chart on /pantone-to-hex/ and
 * /pantone-to-cmyk/.
 *
 * Parameterised on purpose: the two pages share the plumbing (sticky first
 * column, horizontal scroll, filter, progressive reveal) and share none of the
 * content. Columns, cells, caption and copy all come in as props, so the two
 * charts read as different tables rather than the same block twice — which is
 * what the pages were doing before and is the thing this rebuild is fixing.
 *
 * Every row is server-rendered. The filter narrows what is displayed, and the
 * reveal toggle only flips `hidden` on a second `<tbody>` — nothing here
 * generates markup at runtime that was not already in the exported HTML.
 *
 * @param {object} props
 * @param {string} props.id              Anchor id; also namespaces the caption.
 * @param {string} props.caption         Visible <caption>, read by screen readers first.
 * @param {Array<{ key: string, label: string, align?: string, hint?: string }>} props.columns
 *        First column is the sticky one and must be the colour's name.
 * @param {Array<{ id: string, hex: string, search: string, cells: Array<any> }>} props.rows
 *        `cells` is parallel to `columns`; `cells[0]` renders inside the sticky
 *        header cell next to the swatch. `search` is the lowercase haystack.
 * @param {number} [props.initialVisible=25]  Rows shown before the reveal.
 * @param {string} props.filterPlaceholder
 * @param {string} props.revealLabel      Button text for the collapsed rows.
 * @param {string} [props.footnote]       Small print under the table.
 */
export default function ConversionChartTable({
  id,
  caption,
  columns,
  rows,
  initialVisible = 25,
  filterPlaceholder = 'Filter…',
  revealLabel,
  footnote,
}) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? rows.filter((r) => r.search.includes(q)) : rows),
    [q, rows],
  );

  // Filtering flattens the split: a match hiding in the collapsed half would
  // otherwise look like "no results" to someone who typed a real PMS number.
  const split = q ? filtered.length : initialVisible;
  const head = filtered.slice(0, split);
  const tail = filtered.slice(split);

  const cellStyle = {
    padding: '0.55rem 0.75rem',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '0.8rem',
    color: '#374151',
    whiteSpace: 'nowrap',
  };

  const renderRow = (row) => (
    <tr key={row.id}>
      <th
        scope="row"
        style={{
          ...cellStyle,
          position: 'sticky',
          left: 0,
          background: '#ffffff',
          textAlign: 'left',
          fontWeight: 700,
          color: '#111827',
          boxShadow: '1px 0 0 #f3f4f6',
          zIndex: 1,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            aria-hidden="true"
            style={{
              width: '1.1rem',
              height: '1.1rem',
              borderRadius: '0.3rem',
              backgroundColor: row.hex,
              border: '1px solid rgba(0,0,0,0.15)',
              flexShrink: 0,
            }}
          />
          {row.cells[0]}
        </span>
      </th>
      {columns.slice(1).map((col, i) => (
        <td key={col.key} style={{ ...cellStyle, textAlign: col.align || 'left' }}>
          {row.cells[i + 1]}
        </td>
      ))}
    </tr>
  );

  const filterId = `${id}-filter`;
  const moreId = `${id}-more`;

  return (
    <div>
      <div style={{ marginBottom: '0.75rem', maxWidth: '26rem' }}>
        <label htmlFor={filterId} className="input-label">Filter this chart</label>
        <input
          id={filterId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
          placeholder={filterPlaceholder}
          autoComplete="off"
        />
      </div>

      <div
        style={{
          overflowX: 'auto',
          border: '1px solid #f3f4f6',
          borderRadius: '0.875rem',
          background: '#fff',
          // The chart is well below the fold on both pages, so skip its layout
          // until it is near the viewport. The reserved height keeps the
          // scrollbar from jumping when it does get rendered.
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px 900px',
        }}
      >
        <table id={id} style={{ borderCollapse: 'collapse', width: '100%', minWidth: '46rem' }}>
          <caption
            style={{
              captionSide: 'top',
              textAlign: 'left',
              padding: '0.85rem 0.75rem',
              fontSize: '0.78rem',
              color: '#4b5563',
              lineHeight: 1.6,
            }}
          >
            {caption}
          </caption>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  scope="col"
                  title={col.hint}
                  style={{
                    ...cellStyle,
                    position: i === 0 ? 'sticky' : undefined,
                    left: i === 0 ? 0 : undefined,
                    zIndex: i === 0 ? 2 : undefined,
                    background: '#f9fafb',
                    textAlign: col.align || 'left',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    color: '#4b5563',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1.5px solid #e5e7eb',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{head.map(renderRow)}</tbody>

          {/* Rows 26–100 ship in the HTML either way; the toggle only flips
              `hidden`, and the <noscript> rule below reveals them outright when
              the button cannot work. */}
          {tail.length > 0 && (
            <tbody id={moreId} hidden={!expanded}>
              {tail.map(renderRow)}
            </tbody>
          )}
        </table>
      </div>

      {tail.length > 0 && !q && (
        <button
          type="button"
          className="btn-secondary"
          aria-expanded={expanded}
          aria-controls={moreId}
          onClick={() => setExpanded((v) => !v)}
          style={{ marginTop: '0.85rem', fontSize: '0.82rem' }}
        >
          {expanded ? 'Show fewer colours' : revealLabel}
        </button>
      )}

      {q && (
        <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0.75rem 0 0' }}>
          {filtered.length === 0
            ? `No colour in this chart matches “${query}”. Try a PMS number such as 186, or a HEX code.`
            : `Showing ${filtered.length} of ${rows.length} colours matching “${query}”.`}
        </p>
      )}

      {footnote && (
        <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.65, margin: '0.75rem 0 0' }}>
          {footnote}
        </p>
      )}

      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>#${moreId}{display:table-row-group !important}</style>`,
        }}
      />
    </div>
  );
}
