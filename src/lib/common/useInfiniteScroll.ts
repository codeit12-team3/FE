import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  threshold?: number
}

export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.1,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentObserver = observerRef.current
    if (!currentObserver || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold },
    )

    observer.observe(currentObserver)

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold])

  return observerRef
}
