'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteGetSentCompanions } from '@/api/companions'
import { EmptyCard } from '@/components/common'
import { CompanionState } from '@/types/companions'

import { useTabs } from '../../Tabs'
import SentCard from '../SentCard'
import SentCardSkeleton from '../SentCardSkeleton'

export default function SentList() {
  const { activeTab } = useTabs<CompanionState>()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetSentCompanions(activeTab)

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
          <SentCardSkeleton key={`received-card-skeleton-${value}`} />
        ))}

      {!isInitialLoading && companions.length === 0 && (
        <EmptyCard comment="신청한 동행 정보가 없어요" />
      )}

      {companions.map((item, idx) => (
        <SentCard
          key={item.myGuestCompanionResponse.companionId}
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
