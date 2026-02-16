import { ReactNode, RefObject, UIEvent, useRef } from 'react'

import { useVirtualScroll } from '@/hooks/useVirtualScroll'

interface VirtualScrollWrapperProps<T> {
  containerRef?: RefObject<HTMLDivElement | null>
  items: T[]
  estimatedItemHeight: number
  overscan?: number
  direction?: 'forward' | 'reverse'
  className?: string
  onScroll?: (e: UIEvent<HTMLDivElement>) => void
  renderItem: (
    item: T,
    index: number,
    measureRef: (node: HTMLElement | null) => void,
  ) => ReactNode
  children?: ReactNode
}

export default function VirtualScrollWrapper<T>({
  containerRef: externalRef,
  items,
  estimatedItemHeight,
  overscan = 5,
  direction = 'forward',
  className,
  onScroll,
  renderItem,
  children,
}: VirtualScrollWrapperProps<T>) {
  const internalRef = useRef<HTMLDivElement>(null)

  const resolvedRef = externalRef || internalRef

  const {
    visibleItems,
    totalHeight,
    startOffset,
    endOffset,
    handleScroll,
    measureElement,
  } = useVirtualScroll({
    containerRef: resolvedRef,
    items,
    estimatedItemHeight,
    overscan,
    direction,
  })

  const onCombinedScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e)
    if (onScroll) onScroll(e)
  }

  return (
    <div
      ref={resolvedRef}
      onScroll={onCombinedScroll}
      className={className}
      style={{ overflowAnchor: 'none' }}
    >
      <div style={{ height: `${startOffset}px`, flexShrink: 0 }} />

      {visibleItems.map(({ item, index }) =>
        renderItem(item, index, measureElement),
      )}

      <div style={{ height: `${totalHeight - endOffset}px`, flexShrink: 0 }} />

      {children}
    </div>
  )
}
