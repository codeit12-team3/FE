import { useInfiniteQuery } from '@tanstack/react-query'

import { CompanionState } from '@/types/companions'

import { getReceivedCompanion, getSentCompanion } from './companions.clients'

export const useInfiniteGetReceivedCompanions = (status: CompanionState) => {
  return useInfiniteQuery({
    queryKey: ['companions', 'received', status],
    queryFn: ({ pageParam = 0 }) => getReceivedCompanion(status, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage.page

      return number + 1 < totalPages ? number + 1 : undefined
    },
  })
}

export const useInfiniteGetSentCompanions = (
  status: CompanionState,
  enabled: boolean = true,
) => {
  return useInfiniteQuery({
    queryKey: ['companions', 'sent', status],
    queryFn: ({ pageParam = 0 }) => getSentCompanion(status, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { number, totalPages } = lastPage.page

      return number + 1 < totalPages ? number + 1 : undefined
    },
    enabled,
  })
}
