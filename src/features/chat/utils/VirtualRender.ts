import { useEffect, useRef, useState } from 'react'

interface VirtualRenderProps<T> {
  items: T[]
  estimatedItemHeight: number
  containerHeight: number
  overscan?: number
  direction?: 'forward' | 'reverse'
}

interface ItemHeightMap {
  [index: number]: number
}

export function VirtualRender<T>({
  items,
  estimatedItemHeight,
  containerHeight,
  overscan = 5,
  direction = 'forward',
}: VirtualRenderProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [itemHeight, setItemHeight] = useState<ItemHeightMap>({})
  const isInitialized = useRef(false)

  // 높이 측정 중 플래그
  const isMeasuringRef = useRef(false)
  // 측정된 높이를 임시 저장
  const pendingHeightsRef = useRef<ItemHeightMap>({})

  // 누적 높이를 계산
  const { offsets, totalHeight } = (() => {
    let currentOffset = 0
    const offsets = items.map((_, i) => {
      const height = itemHeight[i] || estimatedItemHeight
      const response = currentOffset
      currentOffset += height
      return response
    })
    return { offsets, totalHeight: currentOffset }
  })()
  // 역방향일 때 초기 스크롤을 맨 아래로
  useEffect(() => {
    if (
      direction === 'reverse' &&
      !isInitialized.current &&
      containerRef.current &&
      totalHeight > 0
    ) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = totalHeight
          isInitialized.current = true
        }
      })
    }
  }, [direction, totalHeight])

  // 현재 스크롤 위치에서 보여줘야 할 아이템 범위 찾기
  const startIndex = (() => {
    let low = 0
    let high = offsets.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (offsets[mid] === scrollTop) return mid
      if (offsets[mid] < scrollTop)
        low = mid + 1 // 아래쪽 절반 버림
      else high = mid - 1 // 위쪽 절반 버림
    }

    return Math.max(0, low - 1) // 정확한 위치가 없으면 바로 위 아이템 반환
  })()
  const visibleCount =
    Math.ceil(containerHeight / estimatedItemHeight) + overscan
  const visibleItems = items.slice(startIndex, startIndex + visibleCount)

  const observerRef = useRef(
    new ResizeObserver((entries) => {
      isMeasuringRef.current = true

      entries.forEach((entry) => {
        const index = parseInt(
          (entry.target as HTMLElement).dataset.index || '',
        )
        if (isNaN(index)) return
        // 측정된 실제 아이템의 높이를 순차별로 임시 저장
        const realHeight = Math.round(entry.contentRect.height)
        pendingHeightsRef.current[index] = realHeight
      })

      requestAnimationFrame(() => {
        isMeasuringRef.current = false
      })
    }),
  )

  useEffect(() => {
    if (isMeasuringRef.current) return

    const pending = pendingHeightsRef.current
    if (Object.keys(pending).length > 0) {
      // 스크롤 시 임시 저장한 것들을 한 번에 업데이트
      setItemHeight((prev) => ({ ...prev, ...pending }))
      pendingHeightsRef.current = {}
    }
  }, [scrollTop])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  const startOffset = offsets[startIndex] || 0

  return {
    containerRef,
    observerRef,
    visibleItems,
    totalHeight,
    startOffset,
    handleScroll,
    startIndex,
    offsets,
  }
}
