import { ReactNode, RefObject, UIEvent, useRef } from 'react'

import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import { cn } from '@/lib/common'

function getKey<T>(item: T, keyField: keyof T): React.Key {
  return item[keyField] as React.Key
}

interface VirtualScrollWrapperProps<T> {
  containerRef?: RefObject<HTMLDivElement | null>
  items: T[]
  estimatedItemHeight: number
  overscan?: number
  direction?: 'forward' | 'reverse'
  className?: string
  keyField: keyof T
  onScroll?: (e: UIEvent<HTMLDivElement>) => void
  renderItem: (item: T) => ReactNode
  children?: ReactNode
}

export default function VirtualScrollWrapper<T>({
  containerRef,
  items,
  estimatedItemHeight,
  overscan = 5,
  direction = 'forward',
  className,
  onScroll,
  keyField,
  renderItem,
  children,
}: VirtualScrollWrapperProps<T>) {
  const initialContainerRef = useRef<HTMLDivElement>(null)

  const resolvedRef = containerRef || initialContainerRef

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
      className={cn(
        className,
        direction === 'reverse' ? 'flex-col-reverse' : 'flex-col',
      )}
      style={{ overflowAnchor: 'none' }}
    >
      <div style={{ height: `${startOffset}px`, flexShrink: 0 }} />

      {visibleItems.map(({ item, index }) => (
        <div
          key={getKey(item, keyField)}
          data-index={index}
          ref={measureElement}
        >
          {renderItem(item)}
        </div>
      ))}

      <div style={{ height: `${totalHeight - endOffset}px`, flexShrink: 0 }} />

      {children}
    </div>
  )
}
