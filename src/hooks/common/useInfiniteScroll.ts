import { useEffect, useEffectEvent, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  threshold?: number
  direction?: 'top' | 'bottom'
}

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  threshold = 0.5,
  direction = 'bottom',
}: UseInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const fetchNext = useEffectEvent(() => {
    fetchNextPage()
  })

  const isFetchingRef = useRef(isFetchingNextPage)
  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage
  }, [isFetchingNextPage])

  useEffect(() => {
    const target = targetRef.current
    if (!target || !hasNextPage) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          fetchNext()
        }
      },
      {
        threshold,
        rootMargin:
          direction === 'top' ? '0px 0px 200px 0px' : '200px 0px 0px 0px',
      },
    )

    observerRef.current.observe(target)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [hasNextPage, threshold, direction])

  return targetRef
}
