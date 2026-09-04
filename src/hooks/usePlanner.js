import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'epcot-fw-planner:v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { selectedIds: [], acquired: [] }
    const parsed = JSON.parse(raw)
    return {
      selectedIds: Array.isArray(parsed.selectedIds) ? parsed.selectedIds : [],
      acquired: Array.isArray(parsed.acquired) ? parsed.acquired : [],
    }
  } catch {
    return { selectedIds: [], acquired: [] }
  }
}

export function usePlanner() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage unavailable (private mode, quota) — state just won't persist
    }
  }, [state])

  const isSelected = useCallback((id) => state.selectedIds.includes(id), [state.selectedIds])
  const isAcquired = useCallback((id) => state.acquired.includes(id), [state.acquired])

  const toggleSelect = useCallback((id) => {
    setState((s) => {
      if (s.selectedIds.includes(id)) {
        return {
          selectedIds: s.selectedIds.filter((x) => x !== id),
          acquired: s.acquired.filter((x) => x !== id),
        }
      }
      return { ...s, selectedIds: [...s.selectedIds, id] }
    })
  }, [])

  const removeItem = useCallback((id) => {
    setState((s) => ({
      selectedIds: s.selectedIds.filter((x) => x !== id),
      acquired: s.acquired.filter((x) => x !== id),
    }))
  }, [])

  const toggleAcquired = useCallback((id) => {
    setState((s) => ({
      ...s,
      acquired: s.acquired.includes(id) ? s.acquired.filter((x) => x !== id) : [...s.acquired, id],
    }))
  }, [])

  const moveUp = useCallback((id) => {
    setState((s) => {
      const idx = s.selectedIds.indexOf(id)
      if (idx <= 0) return s
      const next = [...s.selectedIds]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return { ...s, selectedIds: next }
    })
  }, [])

  const moveDown = useCallback((id) => {
    setState((s) => {
      const idx = s.selectedIds.indexOf(id)
      if (idx === -1 || idx >= s.selectedIds.length - 1) return s
      const next = [...s.selectedIds]
      ;[next[idx + 1], next[idx]] = [next[idx], next[idx + 1]]
      return { ...s, selectedIds: next }
    })
  }, [])

  return {
    selectedIds: state.selectedIds,
    acquired: state.acquired,
    isSelected,
    isAcquired,
    toggleSelect,
    removeItem,
    toggleAcquired,
    moveUp,
    moveDown,
  }
}
