// Marketplace accent colors, cycled by index so any marketplace can be highlighted.
export const MARKETPLACE_COLORS = [
  '#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#d35400',
  '#16a085', '#c2185b', '#f39c12', '#2c3e50', '#00838f',
]

export function colorForMarketplace(marketplaceId, allMarketplaceIds) {
  const idx = allMarketplaceIds.indexOf(marketplaceId)
  return MARKETPLACE_COLORS[idx % MARKETPLACE_COLORS.length]
}

// Given the ordered list of selected item ids (index = priority rank) and a lookup
// from itemId -> marketplaceId, returns a map of marketplaceId -> array of
// { itemId, rank } for every marketplace that has 2+ selected items — i.e. a
// "divergence": your priorities send you to the same spot more than once.
export function findDivergentMarketplaces(selectedIds, marketplaceIdForItem) {
  const byMarketplace = new Map()
  selectedIds.forEach((itemId, idx) => {
    const mpId = marketplaceIdForItem(itemId)
    if (!byMarketplace.has(mpId)) byMarketplace.set(mpId, [])
    byMarketplace.get(mpId).push({ itemId, rank: idx + 1 })
  })
  const result = new Map()
  for (const [mpId, entries] of byMarketplace) {
    if (entries.length > 1) result.set(mpId, entries)
  }
  return result
}
