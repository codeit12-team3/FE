import { useEffect, useRef } from 'react'

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
  const isFetchingRef = useRef(isFetchingNextPage)

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage
  }, [isFetchingNextPage])

  useEffect(() => {
    if (!targetRef.current || !hasNextPage) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && !isFetchingRef.current) {
          fetchNextPage()
        }
      },
      {
        threshold,
        rootMargin:
          direction === 'top' ? '0px 0px 200px 0px' : '200px 0px 0px 0px',
      },
    )

    observerRef.current.observe(targetRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [hasNextPage, threshold, direction])

  const fetchNextPageRef = useRef(fetchNextPage)

  useEffect(() => {
    fetchNextPageRef.current = fetchNextPage
  }, [fetchNextPage])

  return targetRef
}
