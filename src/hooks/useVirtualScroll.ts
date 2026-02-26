import { useCallback, useLayoutEffect, useRef, useState } from 'react'

interface UseVirtualScrollProps<T> {
  items: T[]
  scrollTop: number
  containerHeight: number
  estimatedItemHeight: number
  overscan?: number
}

interface ItemHeightMap {
  [index: number]: number
}

export function useVirtualScroll<T>({
  items,
  scrollTop,
  containerHeight,
  estimatedItemHeight,
  overscan = 5,
}: UseVirtualScrollProps<T>) {
  const [itemHeightMap, setItemHeightMap] = useState<ItemHeightMap>({})
  const pendingHeightsRef = useRef<ItemHeightMap>({})
  const observerRef = useRef<ResizeObserver | null>(null)

  useLayoutEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        let hasChanges = false
        entries.forEach((entry) => {
          const index = parseInt(
            (entry.target as HTMLElement).dataset.index || '',
            10,
          )
          if (isNaN(index)) return
          const newHeight = Math.round(entry.contentRect.height)
          if (pendingHeightsRef.current[index] !== newHeight) {
            pendingHeightsRef.current[index] = newHeight
            hasChanges = true
          }
        })
        if (hasChanges) {
          setItemHeightMap((prev) => ({
            ...prev,
            ...pendingHeightsRef.current,
          }))
        }
      })
    }
    return () => observerRef.current?.disconnect()
  }, [])

  const { offsets, totalHeight } = items.reduce(
    (acc, _, i) => {
      acc.offsets[i] = acc.totalHeight
      acc.totalHeight += itemHeightMap[i] || estimatedItemHeight
      return acc
    },
    { offsets: [] as number[], totalHeight: 0 },
  )

  const startIndex = (() => {
    let low = 0
    let high = offsets.length - 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (offsets[mid] === scrollTop) return mid
      if (offsets[mid] < scrollTop) low = mid + 1
      else high = mid - 1
    }
    return Math.max(0, low - 1)
  })()

  const visibleCount =
    containerHeight > 0
      ? Math.ceil(containerHeight / estimatedItemHeight) + overscan
      : 0
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount)

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, i) => ({
    item,
    index: startIndex + i,
    offset: offsets[startIndex + i],
  }))

  const measureElement = useCallback((node: HTMLElement | null) => {
    if (node) observerRef.current?.observe(node)
  }, [])

  return {
    visibleItems,
    totalHeight,
    startOffset: offsets[startIndex] || 0,
    endOffset: offsets[endIndex + 1] || totalHeight,
    measureElement,
  }
}
