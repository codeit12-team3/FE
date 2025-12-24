'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteGetReceivedCompanions } from '@/api/companions'
import { CompanionState } from '@/types/companions'

import EmptyCard from '../../EmptyCard'
import { useTabs } from '../../Tabs'
import RecievedCard from '../ReceivedCard'
import RecievedCardSkeleton from '../ReceivedCardSkeleton'

export default function RecievedList() {
  const { activeTab } = useTabs<CompanionState>()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetReceivedCompanions(activeTab)

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const companions = data?.pages.flatMap((page) => page.content) ?? []

  const isInitialLoading = isLoading && companions.length === 0

  return (
    <div className="flex flex-col gap-4">
      {isInitialLoading &&
        [1, 2, 3].map((value) => (
          <RecievedCardSkeleton key={`received-card-skeleton-${value}`} />
        ))}

      {!isInitialLoading && companions.length === 0 && (
        <EmptyCard comment="아직 받은 동행 정보가 없어요." />
      )}

      {companions.map((item, idx) => (
        <RecievedCard
          key={`${companions}-${item.guestCompanionResponse.companionId}`}
          data={item}
          idx={idx}
        />
      ))}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Loader className="size-6 animate-spin" />}
      </div>
    </div>
  )
}
