import { useMemo, useState } from 'react'
import { colorForMarketplace } from '../utils/divergence.js'

// Layout: every marketplace sits on an ellipse in the same order as Disney's own
// festival map legend (see menuData.js header) — index 0 and the last index both
// land near the bottom, next to the World Celebration entrance, matching the real
// walking loop around World Showcase.
const CX = 50
const CY = 50
const RX = 38
const RY = 36

function posForIndex(i, total) {
  const theta = ((180 + (i * 360) / total) * Math.PI) / 180
  return {
    x: CX + RX * Math.sin(theta),
    y: CY - RY * Math.cos(theta),
  }
}

export default function MapView({ marketplaces, planner }) {
  const [activeId, setActiveId] = useState(null)
  const allMarketplaceIds = marketplaces.map((m) => m.id)

  const stops = useMemo(
    () => marketplaces.map((mp, i) => ({ mp, pos: posForIndex(i, marketplaces.length) })),
    [marketplaces]
  )

  const withSelections = useMemo(() => {
    return stops
      .map(({ mp, pos }) => {
        const picked = mp.items.filter((it) => planner.isSelected(it.id))
        return { mp, pos, picked }
      })
      .filter((x) => x.picked.length > 0)
  }, [stops, planner.selectedIds])

  const active = withSelections.find((x) => x.mp.id === activeId)

  return (
    <div className="map-view">
      <p className="map-hint">
        Pins mark stops with items on your list — tap one for details. Small dots and
        flags are every other festival marketplace, for orientation. Layout follows
        the festival map's real walking order but isn't GPS-precise.
      </p>

      <svg viewBox="0 0 100 100" className="epcot-map" role="img" aria-label="Schematic map of the Epcot World Showcase promenade">
        <rect x="0" y="0" width="100" height="100" rx="6" className="map-ground" />
        <ellipse cx={CX} cy={CY} rx={RX + 4} ry={RY + 4} className="map-promenade" />
        <ellipse cx={CX} cy={CY} rx={RX * 0.56} ry={RY * 0.52} className="map-lagoon" />
        <text x={CX} y={CY + 3} textAnchor="middle" className="map-lagoon-label">World Showcase Lagoon</text>

        {stops.map(({ mp, pos }) => {
          const hasSelection = withSelections.some((x) => x.mp.id === mp.id)
          if (hasSelection) return null
          if (mp.type === 'pavilion') {
            return (
              <g key={mp.id} className="map-pavilion-dot">
                <circle cx={pos.x} cy={pos.y} r="3.4" />
                <text x={pos.x} y={pos.y + 1.3} textAnchor="middle" className="map-flag">{mp.flag}</text>
              </g>
            )
          }
          return <circle key={mp.id} cx={pos.x} cy={pos.y} r="1.3" className="map-dot" />
        })}

        <text x={CX} y={CY + RY + 10} textAnchor="middle" className="map-entrance-label">▼ Entrance / World Celebration</text>

        {withSelections.map(({ mp, pos, picked }) => {
          const color = colorForMarketplace(mp.id, allMarketplaceIds)
          const isActive = activeId === mp.id
          return (
            <g
              key={mp.id}
              onClick={() => setActiveId(isActive ? null : mp.id)}
              className="map-pin"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 4.4 : 3.6}
                fill={color}
                stroke="#fff"
                strokeWidth="0.6"
              />
              <text x={pos.x} y={pos.y + 1.1} textAnchor="middle" className="map-pin-count">
                {picked.length}
              </text>
              <text x={pos.x} y={pos.y - 5.2} textAnchor="middle" className="map-pin-label">
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
            {active.picked.map((item) => (
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
