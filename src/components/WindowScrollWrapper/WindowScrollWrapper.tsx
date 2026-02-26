import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import { cn } from '@/lib/common'

interface WindowScrollWrapperProps<T> {
  items: T[]
  estimatedItemHeight: number
  keyField: keyof T
  renderItem: (item: T) => ReactNode
  className?: string
  children?: ReactNode
}

export default function WindowScrollWrapper<T>({
  items,
  estimatedItemHeight,
  keyField,
  renderItem,
  className,
  children,
}: WindowScrollWrapperProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useLayoutEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const offsetTop = window.scrollY + rect.top
      setScrollTop(Math.max(0, window.scrollY - offsetTop))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { visibleItems, totalHeight, startOffset, endOffset, measureElement } =
    useVirtualScroll({
      items,
      scrollTop,
      containerHeight: windowHeight,
      estimatedItemHeight,
    })

  return (
    <div ref={wrapperRef} className={cn('w-full flex flex-col', className)}>
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
