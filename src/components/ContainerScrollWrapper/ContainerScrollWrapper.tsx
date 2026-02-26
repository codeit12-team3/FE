import {
  ReactNode,
  RefObject,
  UIEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import { cn } from '@/lib/common'

interface ContainerScrollWrapperProps<T> {
  items: T[]
  estimatedItemHeight: number
  keyField: keyof T
  renderItem: (item: T) => ReactNode
  className?: string
  direction?: 'forward' | 'reverse'
  onScrollReachedBottom?: () => void
  children?: ReactNode
  containerRef?: RefObject<HTMLDivElement | null>
}

export default function ContainerScrollWrapper<T>({
  items,
  estimatedItemHeight,
  keyField,
  renderItem,
  className,
  direction = 'forward',
  onScrollReachedBottom,
  children,
  containerRef,
}: ContainerScrollWrapperProps<T>) {
  const internalRef = useRef<HTMLDivElement>(null)
  const resolvedRef = containerRef || internalRef

  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  useLayoutEffect(() => {
    if (!resolvedRef.current) return
    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height)
    })
    resizeObserver.observe(resolvedRef.current)
    return () => resizeObserver.disconnect()
  }, [resolvedRef])

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget

    if (direction === 'reverse') {
      const distance = Math.abs(Math.min(0, target.scrollTop))
      setScrollTop(distance)
    } else {
      setScrollTop(Math.max(0, target.scrollTop))
    }

    if (direction !== 'reverse' && onScrollReachedBottom) {
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
        onScrollReachedBottom()
      }
    }
  }

  const { visibleItems, totalHeight, startOffset, endOffset, measureElement } =
    useVirtualScroll({
      items,
      scrollTop,
      containerHeight,
      estimatedItemHeight,
    })

  return (
    <div
      ref={resolvedRef}
      onScroll={handleScroll}
      className={cn(
        'overflow-y-auto',
        direction === 'reverse' ? 'flex flex-col-reverse' : 'flex flex-col',
        className,
      )}
      style={{ overflowAnchor: 'none' }}
    >
      <div style={{ height: `${startOffset}px`, flexShrink: 0 }} />
      {visibleItems.map(({ item, index }) => (
        <div
          key={item[keyField] as React.Key}
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
