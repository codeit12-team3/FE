import {
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
}

interface ItemHeightMap {
  [index: number]: number
}

export function useVirtualScroll<T>({
  items,
  estimatedItemHeight,
  overscan = 5,
  direction = 'forward',
}: UseVirtualScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0) // 내부 자동 측정 상태
  const [scrollTop, setScrollTop] = useState(0)
  const [itemHeightMap, setItemHeightMap] = useState<ItemHeightMap>({})

  const isInitialized = useRef(false)
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
  }, [])

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            (entry.target as HTMLElement).dataset.index || '',
            10,
          )
          if (isNaN(index)) return
          pendingHeightsRef.current[index] = Math.round(
            entry.contentRect.height,
          )
        })
      })
    }
    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const pending = pendingHeightsRef.current
    if (Object.keys(pending).length > 0) {
      setItemHeightMap((prev) => ({ ...prev, ...pending }))
      pendingHeightsRef.current = {}
    }
  }, [scrollTop])

  const { offsets, totalHeight } = items.reduce(
    (acc, _, i) => {
      acc.offsets[i] = acc.totalHeight
      acc.totalHeight += itemHeightMap[i] || estimatedItemHeight
      return acc
    },
    { offsets: [] as number[], totalHeight: 0 },
  )

  useLayoutEffect(() => {
    if (
      direction === 'reverse' &&
      !isInitialized.current &&
      totalHeight > 0 &&
      containerRef.current
    ) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
          isInitialized.current = true
        }
      })
    }
  }, [direction, totalHeight])

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

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  // 아이템 Ref 연결을 위한 헬퍼 함수
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
  }
}
