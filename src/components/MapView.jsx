import { useMemo, useState } from 'react'
import { colorForMarketplace } from '../utils/divergence.js'

// Coordinates below are hand-read pixel positions from Disney's own 2026 festival
// map/legend (the numbered walking-loop layout), stored per-marketplace in
// menuData.js as `mapPos`. This SVG is an original illustration — not a copy of
// that (copyrighted, watermarked) map photo — but its lagoon shape and every
// marker position are drawn to match it, not a generic circle.
const VIEW_W = 850
const VIEW_H = 960

const LAGOON_BODY =
  'M230,335 C 200,300 260,240 330,232 C 370,228 385,250 400,235 C 420,250 440,225 480,230 ' +
  'C 540,235 590,255 640,300 C 685,335 715,380 715,420 C 715,460 690,485 650,505 ' +
  'C 590,535 500,545 400,545 C 300,545 210,535 165,490 C 140,465 145,420 150,385 ' +
  'C 152,365 160,350 230,335 Z'

const LAGOON_LEFT_CHANNEL =
  'M160,460 C 145,500 140,530 150,565 C 158,600 175,630 210,655 C 245,678 280,682 300,668 ' +
  'C 285,645 255,610 225,570 C 200,535 180,495 175,460 Z'

const LAGOON_RIGHT_CHANNEL =
  'M655,470 C 685,505 700,535 700,570 C 700,605 685,635 655,660 C 620,682 585,685 565,668 ' +
  'C 585,645 615,610 640,570 C 660,535 665,500 655,470 Z'

export default function MapView({ marketplaces, planner }) {
  const [activeId, setActiveId] = useState(null)
  const allMarketplaceIds = marketplaces.map((m) => m.id)

  const promenadePath = useMemo(() => {
    const pts = marketplaces.map((m) => `${m.mapPos.x},${m.mapPos.y}`)
    return `M ${pts.join(' L ')} Z`
  }, [marketplaces])

  const withSelections = useMemo(() => {
    return marketplaces
      .map((mp) => ({ mp, picked: mp.items.filter((it) => planner.isSelected(it.id)) }))
      .filter((x) => x.picked.length > 0)
  }, [marketplaces, planner.selectedIds])

  const active = withSelections.find((x) => x.mp.id === activeId)

  return (
    <div className="map-view">
      <p className="map-hint">
        Shaped and positioned to match the real festival map — pins mark stops with
        items on your list, tap one for details. Small dots and flags are every other
        marketplace, for orientation.
      </p>

      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="epcot-map" role="img" aria-label="Map of the Epcot World Showcase promenade matching the festival's layout">
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} rx="24" className="map-ground" />
        <path d={promenadePath} className="map-promenade" />
        <path d={LAGOON_BODY} className="map-lagoon" />
        <path d={LAGOON_LEFT_CHANNEL} className="map-lagoon" />
        <path d={LAGOON_RIGHT_CHANNEL} className="map-lagoon" />
        <text x="400" y="390" textAnchor="middle" className="map-lagoon-label">World Showcase Lagoon</text>

        {marketplaces.map((mp) => {
          const hasSelection = withSelections.some((x) => x.mp.id === mp.id)
          if (hasSelection) return null
          if (mp.type === 'pavilion') {
            return (
              <g key={mp.id} className="map-pavilion-dot">
                <circle cx={mp.mapPos.x} cy={mp.mapPos.y} r="16" />
                <text x={mp.mapPos.x} y={mp.mapPos.y + 6} textAnchor="middle" className="map-flag">{mp.flag}</text>
              </g>
            )
          }
          return <circle key={mp.id} cx={mp.mapPos.x} cy={mp.mapPos.y} r="7" className="map-dot" />
        })}

        <text x="400" y="945" textAnchor="middle" className="map-entrance-label">▲ Entrance / World Celebration</text>

        {withSelections.map(({ mp, picked }) => {
          const color = colorForMarketplace(mp.id, allMarketplaceIds)
          const isActive = activeId === mp.id
          const { x, y } = mp.mapPos
          return (
            <g key={mp.id} onClick={() => setActiveId(isActive ? null : mp.id)} className="map-pin">
              <circle cx={x} cy={y} r={isActive ? 21 : 17} fill={color} stroke="#fff" strokeWidth="2.5" />
              <text x={x} y={y + 5} textAnchor="middle" className="map-pin-count">{picked.length}</text>
              <text x={x} y={y - 24} textAnchor="middle" className="map-pin-label">{mp.name}</text>
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
