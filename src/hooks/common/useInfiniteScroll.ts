import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  threshold?: number
}

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  threshold = 0.5,
}: UseInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!targetRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        threshold,
        rootMargin: '100px',
      },
    )

    observer.observe(targetRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, threshold])

  return targetRef
}
