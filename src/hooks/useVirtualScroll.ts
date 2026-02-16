import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

interface UseVirtualScrollProps<T> {
  items: T[]
  estimatedItemHeight: number
  overscan?: number
  direction?: 'forward' | 'reverse'
  containerRef: RefObject<HTMLDivElement | null>
}

interface ItemHeightMap {
  [index: number]: number
}

export function useVirtualScroll<T>({
  items,
  estimatedItemHeight,
  overscan = 5,
  direction = 'forward',
  containerRef,
}: UseVirtualScrollProps<T>) {
  const [containerHeight, setContainerHeight] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [itemHeightMap, setItemHeightMap] = useState<ItemHeightMap>({})

  const pendingHeightsRef = useRef<ItemHeightMap>({})
  const observerRef = useRef<ResizeObserver | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height)
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [containerRef])

  useEffect(() => {
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
    Math.ceil(containerHeight / estimatedItemHeight) + overscan
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount)

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, i) => ({
    item,
    index: startIndex + i,
    offset: offsets[startIndex + i],
  }))
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (direction === 'reverse') {
        const distance = Math.abs(Math.min(0, e.currentTarget.scrollTop))
        setScrollTop(distance)
      } else {
        setScrollTop(Math.max(0, e.currentTarget.scrollTop))
      }
    },
    [direction],
  )

  const measureElement = useCallback((node: HTMLElement | null) => {
    if (node) observerRef.current?.observe(node)
  }, [])

  return {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll,
    measureElement,
    offsets,
    startOffset: offsets[startIndex] || 0,
    endOffset: offsets[endIndex + 1] || totalHeight,
  }
}
