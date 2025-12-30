'use client'

import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { EventListener, EventSourcePolyfill } from 'event-source-polyfill'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { toast } from '@/components/common'
import { BASE_URL } from '@/constants/common'
import { useNotificationStore } from '@/stores'
import { Notification, NotificationRes } from '@/types/notifications'

interface SSEErrorEvent extends Event {
  status?: number
}

export default function useNotificationSSE() {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()
  const { setHasNew } = useNotificationStore()

  useEffect(() => {
    if (status !== 'authenticated' || !session.user.accessToken) return

    const token = session.user.accessToken
    const url = `${BASE_URL}/v1/notifications/subscribe`

    console.log('📡 SSE 연결 시도...')

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      heartbeatTimeout: 120000,
    })

    eventSource.onopen = () => {
      console.log('✅ SSE 연결 성공!')
    }

    eventSource.onmessage = (e) => {
      console.log('💓 [SSE] 일반 메시지/핑 수신:', e.data)
    }

    const handleNotification = (e: MessageEvent) => {
      try {
        const newNotification = JSON.parse(e.data) as Notification

        toast.info('새로운 알람이 도착했습니다')
        setHasNew(true)

        queryClient.setQueryData<InfiniteData<NotificationRes>>(
          ['notifications'],
          (oldData) => {
            if (!oldData) return undefined

            return {
              ...oldData,
              pages: oldData.pages.map((page, index) => {
                if (index === 0) {
                  return {
                    ...page,
                    content: [newNotification, ...page.content],
                  }
                }
                return page
              }),
            }
          },
        )
      } catch (error) {
        console.error('SSE Update Error:', error)
      }
    }

    const handleError = (e: Event) => {
      const errorEvent = e as SSEErrorEvent

      console.error('❌ SSE Error:', errorEvent)

      if (errorEvent.status === 401) {
        console.error('인증 만료로 SSE 연결을 종료합니다.')
        eventSource.close()
      }
    }

    eventSource.addEventListener(
      'notification',
      handleNotification as unknown as EventListener,
    )
    eventSource.addEventListener(
      'error',
      handleError as unknown as EventListener,
    )

    return () => {
      eventSource.removeEventListener(
        'notification',
        handleNotification as unknown as EventListener,
      )
      eventSource.removeEventListener(
        'error',
        handleError as unknown as EventListener,
      )
      eventSource.close()
    }
  }, [status, session, setHasNew, queryClient])
}
