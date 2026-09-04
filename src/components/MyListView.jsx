import { useMemo, useState } from 'react'
import { findItem, marketplaces } from '../data/menuData.js'
import { colorForMarketplace, findDivergentMarketplaces } from '../utils/divergence.js'

const allMarketplaceIds = marketplaces.map((m) => m.id)

export default function MyListView({ planner, marketplaceIdForItem }) {
  const [hideAcquired, setHideAcquired] = useState(false)

  const divergent = useMemo(
    () => findDivergentMarketplaces(planner.selectedIds, marketplaceIdForItem),
    [planner.selectedIds, marketplaceIdForItem]
  )

  const rows = planner.selectedIds
    .map((itemId, idx) => {
      const found = findItem(itemId)
      if (!found) return null
      return { rank: idx + 1, itemId, ...found }
    })
    .filter(Boolean)
    .filter((r) => !hideAcquired || !planner.isAcquired(r.itemId))

  if (planner.selectedIds.length === 0) {
    return (
      <div className="empty-state">
        <p>Your list is empty.</p>
        <p>Head to <strong>Browse</strong> and tap + on anything that looks good.</p>
      </div>
    )
  }

  return (
    <div className="my-list-view">
      <label className="hide-acquired-toggle">
        <input
          type="checkbox"
          checked={hideAcquired}
          onChange={(e) => setHideAcquired(e.target.checked)}
        />
        Hide items already acquired
      </label>

      {rows.map((row, visibleIdx) => {
        const { rank, itemId, item, marketplace } = row
        const acquired = planner.isAcquired(itemId)
        const divergentGroup = divergent.get(marketplace.id)
        const color = divergentGroup ? colorForMarketplace(marketplace.id, allMarketplaceIds) : null

        return (
          <div
            key={itemId}
            className={`list-row${acquired ? ' is-acquired' : ''}`}
            style={color ? { borderLeftColor: color } : undefined}
          >
            <div className="list-row__rank">#{rank}</div>

            <div className="list-row__main">
              <div className="list-row__name">{item.name}</div>
              <div className="list-row__mp">
                <span
                  className="mp-tag"
                  style={color ? { background: color } : undefined}
                >
                  {marketplace.name}
                </span>
                {item.price && <span className="list-row__price">{item.price}</span>}
              </div>
              {divergentGroup && (
                <div className="divergence-note" style={{ color }}>
                  Same stop as {divergentGroup
                    .filter((g) => g.itemId !== itemId)
                    .map((g) => `#${g.rank}`)
                    .join(', ')} — plan one trip to {marketplace.name}
                </div>
              )}
            </div>

            <div className="list-row__actions">
              <button onClick={() => planner.moveUp(itemId)} aria-label="Move up" disabled={rank === 1}>▲</button>
              <button onClick={() => planner.moveDown(itemId)} aria-label="Move down" disabled={rank === planner.selectedIds.length}>▼</button>
              <button
                className={`ack-btn${acquired ? ' is-acquired' : ''}`}
                onClick={() => planner.toggleAcquired(itemId)}
                aria-label="Toggle acquired"
              >
                {acquired ? '↺' : '✓'}
              </button>
              <button className="remove-btn" onClick={() => planner.removeItem(itemId)} aria-label="Remove">✕</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
