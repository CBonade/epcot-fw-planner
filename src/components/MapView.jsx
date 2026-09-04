import { useMemo, useState } from 'react'
import { colorForMarketplace } from '../utils/divergence.js'

export default function MapView({ marketplaces, planner }) {
  const [activeId, setActiveId] = useState(null)
  const allMarketplaceIds = marketplaces.map((m) => m.id)

  const withSelections = useMemo(() => {
    return marketplaces
      .map((mp) => {
        const picked = mp.items
          .map((it, i) => ({ item: it, selected: planner.isSelected(it.id) }))
          .filter((x) => x.selected)
        return { mp, picked }
      })
      .filter((x) => x.picked.length > 0)
  }, [marketplaces, planner.selectedIds])

  const active = withSelections.find((x) => x.mp.id === activeId)

  return (
    <div className="map-view">
      <p className="map-hint">
        Pins mark stops with items on your list. Tap a pin for details. Positions are
        schematic (relative layout), not GPS-precise.
      </p>

      <svg viewBox="0 0 100 100" className="epcot-map" role="img" aria-label="Schematic map of Epcot World Showcase">
        <ellipse cx="50" cy="46" rx="46" ry="40" className="map-lagoon" />
        <rect x="24" y="0" rx="3" ry="3" width="52" height="9" className="map-neighborhood" />
        <text x="50" y="5.5" className="map-neighborhood-label" textAnchor="middle">
          Neighborhood kiosks
        </text>

        {marketplaces.map((mp) => {
          const hasSelection = withSelections.some((x) => x.mp.id === mp.id)
          if (hasSelection) return null
          return (
            <circle
              key={mp.id}
              cx={mp.mapPos.x}
              cy={mp.mapPos.y}
              r="1.6"
              className="map-dot"
            />
          )
        })}

        {withSelections.map(({ mp, picked }) => {
          const color = colorForMarketplace(mp.id, allMarketplaceIds)
          const isActive = activeId === mp.id
          return (
            <g
              key={mp.id}
              onClick={() => setActiveId(isActive ? null : mp.id)}
              className="map-pin"
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={mp.mapPos.x}
                cy={mp.mapPos.y}
                r={isActive ? 4.2 : 3.4}
                fill={color}
                stroke="#fff"
                strokeWidth="0.6"
              />
              <text
                x={mp.mapPos.x}
                y={mp.mapPos.y + 1.1}
                textAnchor="middle"
                className="map-pin-count"
              >
                {picked.length}
              </text>
              <text
                x={mp.mapPos.x}
                y={mp.mapPos.y - 5}
                textAnchor="middle"
                className="map-pin-label"
              >
                {mp.name}
              </text>
            </g>
          )
        })}
      </svg>

      {withSelections.length === 0 && (
        <p className="empty-state">Add items to your list from Browse to see them mapped here.</p>
      )}

      {active && (
        <div className="map-detail" style={{ borderColor: colorForMarketplace(active.mp.id, allMarketplaceIds) }}>
          <h3>{active.mp.name}</h3>
          <p className="mp-section__area">{active.mp.area}</p>
          <ul>
            {active.picked.map(({ item }) => (
              <li key={item.id}>
                {item.name}
                {planner.isAcquired(item.id) ? ' — ✓ acquired' : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
