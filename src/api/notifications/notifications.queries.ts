import { useInfiniteQuery } from '@tanstack/react-query'

import { STALE_TIME } from '@/constants/common'

import { getNotifications } from './notifications.clients'

export const useInfiniteGetNotification = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam }) =>
      getNotifications({
        lastNotificationId: pageParam,
        size: 10,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) return undefined

      if (!lastPage.content || lastPage.content.length === 0) return undefined

      const lastItem = lastPage.content[lastPage.content.length - 1]

      return lastItem.notificationId
    },
    staleTime: STALE_TIME.MINUTE * 5,
  })
}
