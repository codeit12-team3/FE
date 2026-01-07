'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useChat } from '@/api/chat/chat.queries'
import { Spinner } from '@/components/ui/spinner'

import ChatMessageItem from '../ChatMessageItem'
import DateSeparator from '../DateSeparator'

export default function ChatMessageList() {
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const listRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const chatRoomId = Number(params.roomId)

  const initializedRef = useRef(false)
  const previousScrollHeightRef = useRef<number>(0)
  const lastMessageIdRef = useRef<number | string | null>(null)

  const {
    data: messages = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChat({ chatRoomId })

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 130,
    overscan: 10,
    useFlushSync: false,
  })

  useEffect(() => {
    if (isFetchingNextPage) {
      previousScrollHeightRef.current = listRef.current?.scrollHeight ?? 0
    }
  }, [isFetchingNextPage])

  useEffect(() => {
    const isMyMessage =
      messages[messages.length - 1]?.senderId === chatParticipantId

    if (
      !isFetchingNextPage &&
      previousScrollHeightRef.current > 0 &&
      listRef.current &&
      !isMyMessage
    ) {
      const newScrollHeight = listRef.current.scrollHeight
      const heightDifference = newScrollHeight - previousScrollHeightRef.current

      if (heightDifference > 0) {
        listRef.current.scrollTop += heightDifference
      }
      previousScrollHeightRef.current = 0
    }
  }, [messages, isFetchingNextPage, chatParticipantId])

  useEffect(() => {
    if (messages.length === 0) return

    const currentLastMessage = messages[messages.length - 1]
    const currentLastId = currentLastMessage.messageId

    const isMyMessage = currentLastMessage.senderId === chatParticipantId

    if (!initializedRef.current) {
      const container = listRef.current
      if (container) {
        virtualizer.scrollToIndex(messages.length - 1, { align: 'end' })
        container.scrollTop = container.scrollHeight

        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight
          setTimeout(() => {
            container.scrollTop = container.scrollHeight
            initializedRef.current = true
          }, 100)
        })
      }
      lastMessageIdRef.current = currentLastId
      return
    }

    const isNewMessageArrived = lastMessageIdRef.current !== currentLastId

    if (isNewMessageArrived) {
      const container = listRef.current
      if (container) {
        const isAtBottom =
          isMyMessage ||
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
            300

        if (isAtBottom || isMyMessage) {
          requestAnimationFrame(() => {
            virtualizer.scrollToIndex(messages.length - 1, {
              align: 'end',
              behavior: 'smooth',
            })

            setTimeout(() => {
              container.scrollTo({
                top: container.scrollHeight,
                behavior: 'auto',
              })
            }, 50)
          })
        }
      }
      lastMessageIdRef.current = currentLastId
    }
  }, [messages, isFetchingNextPage, virtualizer, chatParticipantId])

  useEffect(() => {
    const [firstItem] = virtualizer.getVirtualItems()
    if (!firstItem) return

    if (firstItem.index <= 3 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, virtualizer])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div ref={listRef} className="overflow-y-auto flex-1 w-full h-full min-h-0">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const message = messages[virtualItem.index]
          if (!message) return null

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="py-1 px-4">
                {message.shouldShowDate && (
                  <DateSeparator date={message.createdAt} />
                )}
                <ChatMessageItem messageItem={message} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
