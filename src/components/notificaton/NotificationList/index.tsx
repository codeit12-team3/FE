'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteGetNotification } from '@/api/notifications'
import { EmptyCard } from '@/components/common'
import { useNotificationStore } from '@/stores'

import NotificationCard from '../NotificationCard'
import NotificationCardSkeleton from '../NotificationCardSkeleton'

export default function NotificationList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetNotification()
  const { setHasNew, hasNew } = useNotificationStore()

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (!isLoading && hasNew) {
      setHasNew(false)
    }
  }, [isLoading, hasNew, setHasNew])

  const notifications = data?.pages.flatMap((page) => page.content) ?? []

  const isInitialLoading = isLoading && notifications.length === 0

  return (
    <div className="flex flex-col gap-3 w-full md:gap-4">
      {isInitialLoading &&
        [1, 2, 3].map((value) => (
          <NotificationCardSkeleton
            key={`notification-card-skeleton-${value}`}
          />
        ))}

      {!isInitialLoading && notifications.length === 0 && (
        <EmptyCard comment="아직 받은 알림이 없어요" />
      )}

      {notifications.map((item) => (
        <NotificationCard key={item.notificationId} data={item} />
      ))}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Loader className="size-6 animate-spin" />}
      </div>
    </div>
  )
}
