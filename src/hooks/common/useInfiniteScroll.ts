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

  // 최신 fetching 상태를 ref에 동기화
  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage
  }, [isFetchingNextPage])

  useEffect(() => {
    if (!targetRef.current || !hasNextPage) return

    // 기존 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        // 교차 상태이고, 현재 fetching 중이 아닐 때만 실행
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
  }, [hasNextPage, threshold, direction]) // fetchNextPage 제거

  // fetchNextPage가 변경될 때는 observer를 다시 만들지 않고 ref만 업데이트
  const fetchNextPageRef = useRef(fetchNextPage)
  useEffect(() => {
    fetchNextPageRef.current = fetchNextPage
  }, [fetchNextPage])

  return targetRef
}
