'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { ChatListItem, ChatMessage } from '@/types/chat/chat.type'

import ChatMessageItem from '../ChatMessageItem'
import DateSeparator from '../DateSeparator'

interface ChatMessageListProps {
  messages: ChatListItem[]
  isFetchingNextPage: boolean
  hasNextPage: boolean
  onScrollToTop: () => void
}

export default function ChatMessageList({
  messages,
  isFetchingNextPage,
  hasNextPage,
  onScrollToTop,
}: ChatMessageListProps) {
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const listRef = useRef<HTMLDivElement>(null)

  // 새 메시지 추가 감지용
  const prevLastMessageRef = useRef<ChatListItem | null>(
    messages[messages.length - 1] || null,
  )

  // 무한 스크롤 보정용
  const prevFirstMessageRef = useRef<ChatListItem | null>(messages[0] || null)
  const prevMessagesLengthRef = useRef(messages.length)

  // Infinite scroll sentinel
  const topSentinelRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage: onScrollToTop,
    isFetchingNextPage,
    direction: 'top',
    threshold: 0.1,
  })

  // Virtualizer
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 66,
    overscan: 1,
    initialOffset: 5000,
    gap: 4,
    useFlushSync: false,
  })

  // 1. 무한 스크롤 시 스크롤 위치 보정 (첫 번째 메시지 변경 감지)
  useEffect(() => {
    const currentFirstMessage = messages[0]
    const prevFirstMessage = prevFirstMessageRef.current

    // 첫 번째 메시지가 바뀌었다 = 위쪽에 새 데이터 추가됨
    if (
      currentFirstMessage &&
      prevFirstMessage &&
      currentFirstMessage !== prevFirstMessage &&
      messages.length > prevMessagesLengthRef.current
    ) {
      const newItemsCount = messages.length - prevMessagesLengthRef.current
      const virtualItems = virtualizer.getVirtualItems()

      if (virtualItems.length > 0) {
        const firstVisibleIndex = virtualItems[0].index
        const adjustedIndex = firstVisibleIndex + newItemsCount

        virtualizer.scrollToIndex(adjustedIndex, {
          align: 'start',
          behavior: 'auto',
        })
      }
    }

    prevFirstMessageRef.current = currentFirstMessage
    prevMessagesLengthRef.current = messages.length
  }, [messages, virtualizer])

  // 2. 새 메시지 자동 스크롤 (마지막 메시지 변경 감지 + 내가 보낸 메시지)
  useEffect(() => {
    const currentLastMessage = messages[messages.length - 1]
    const prevLastMessage = prevLastMessageRef.current

    // 마지막 메시지가 바뀌었다 = 새 메시지 추가됨
    if (currentLastMessage && currentLastMessage !== prevLastMessage) {
      const isMyMessage =
        isChatMessage(currentLastMessage) &&
        currentLastMessage.senderId === chatParticipantId

      if (isMyMessage) {
        virtualizer.scrollToIndex(messages.length - 1, {
          align: 'end',
          behavior: 'auto',
        })
      }
    }

    prevLastMessageRef.current = currentLastMessage
  }, [messages, chatParticipantId, virtualizer])

  const isChatMessage = (item: ChatListItem): item is ChatMessage => {
    return item.messageType === 'CHAT'
  }

  const getNextChatMessage = (currentIndex: number) => {
    for (let i = currentIndex + 1; i < messages.length; i++) {
      if (messages[i].messageType === 'CHAT') {
        return messages[i] as ChatMessage
      }
    }
    return undefined
  }

  return (
    <div ref={listRef} className="overflow-y-auto flex-1 w-full h-full min-h-0">
      {hasNextPage && <div ref={topSentinelRef} style={{ height: '1px' }} />}

      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Spinner />
        </div>
      )}

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
              {message.messageType === 'DATE_HEADER' && (
                <DateSeparator date={message.date} />
              )}
              {message.messageType === 'CHAT' && (
                <ChatMessageItem
                  messageItem={message as ChatMessage}
                  nextMessage={getNextChatMessage(virtualItem.index)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
