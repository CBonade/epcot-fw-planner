import { useMemo, useState } from 'react'

export default function BrowseView({ marketplaces, planner }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return marketplaces
    return marketplaces
      .map((mp) => {
        const mpMatches = mp.name.toLowerCase().includes(q)
        const items = mp.items.filter(
          (it) =>
            mpMatches ||
            it.name.toLowerCase().includes(q) ||
            (it.description && it.description.toLowerCase().includes(q)) ||
            it.tags.some((t) => t.toLowerCase().includes(q))
        )
        return { ...mp, items }
      })
      .filter((mp) => mp.items.length > 0)
  }, [marketplaces, query])

  return (
    <div className="browse-view">
      <input
        className="search-input"
        type="search"
        placeholder="Search dish, country, or tag…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((mp) => (
        <section key={mp.id} className="mp-section">
          <h2 className="mp-section__title">
            {mp.name}
            <span className={`mp-badge mp-badge--${mp.type}`}>
              {mp.type === 'pavilion' ? 'World Showcase' : 'Kiosk'}
            </span>
          </h2>
          <p className="mp-section__area">{mp.area}</p>

          {mp.items.length === 0 && (
            <p className="mp-empty">Menu not published yet — check back closer to the festival.</p>
          )}

          {mp.items.map((item) => {
            const selected = planner.isSelected(item.id)
            return (
              <div key={item.id} className={`item-row${selected ? ' is-selected' : ''}`}>
                <div className="item-row__main">
                  <div className="item-row__name">{item.name}</div>
                  {item.description && (
                    <div className="item-row__desc">{item.description}</div>
                  )}
                  <div className="item-row__meta">
                    {item.price && <span className="item-row__price">{item.price}</span>}
                    {item.tags.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  className={`select-btn${selected ? ' is-selected' : ''}`}
                  onClick={() => planner.toggleSelect(item.id)}
                  aria-label={selected ? 'Remove from my list' : 'Add to my list'}
                >
                  {selected ? '✓' : '+'}
                </button>
              </div>
            )
          })}
        </section>
      ))}

      {filtered.length === 0 && <p className="mp-empty">No matches for "{query}".</p>}
    </div>
  )
}
