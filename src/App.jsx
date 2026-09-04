import { useMemo, useState } from 'react'
import { marketplaces, findItem } from './data/menuData.js'
import { usePlanner } from './hooks/usePlanner.js'
import BrowseView from './components/BrowseView.jsx'
import MyListView from './components/MyListView.jsx'
import MapView from './components/MapView.jsx'

const TABS = [
  { key: 'browse', label: 'Browse', icon: '🍽️' },
  { key: 'list', label: 'My List', icon: '📋' },
  { key: 'map', label: 'Map', icon: '🗺️' },
]

export default function App() {
  const [tab, setTab] = useState('browse')
  const planner = usePlanner()

  const marketplaceIdForItem = useMemo(
    () => (itemId) => findItem(itemId)?.marketplace.id,
    []
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Epcot Food &amp; Wine 2026</h1>
        <span className="app-header__subtitle">
          {planner.selectedIds.length} picked · {planner.acquired.length} acquired
        </span>
      </header>

      <main className="app-main">
        {tab === 'browse' && (
          <BrowseView marketplaces={marketplaces} planner={planner} />
        )}
        {tab === 'list' && (
          <MyListView planner={planner} marketplaceIdForItem={marketplaceIdForItem} />
        )}
        {tab === 'map' && (
          <MapView marketplaces={marketplaces} planner={planner} />
        )}
      </main>

      <nav className="tab-bar">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab-bar__btn${tab === t.key ? ' is-active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="tab-bar__icon" aria-hidden="true">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
