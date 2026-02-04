'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { ChatListItem, ChatMessage } from '@/features/chat/types/chat.type'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import { useVirtualScroll } from '../../utils/useVirtualScroll' // 경로 확인
import ChatMessageItem from '../ChatMessageItem/ChatMessageItem'

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

  // 채팅 메시지만 필터링
  const chatMessages = messages.filter(
    (msg) => msg.messageType === 'CHAT',
  ) as ChatMessage[]

  const {
    containerRef,
    visibleItems,
    totalHeight,
    startOffset,
    handleScroll,
    measureElement,
    offsets,
  } = useVirtualScroll<ChatMessage>({
    items: chatMessages,
    estimatedItemHeight: 66,
    overscan: 10,
    direction: 'reverse',
  })

  const getItemId = useCallback((item: ChatMessage) => {
    return `msg-${item.messageId}`
  }, [])

  const prevFirstMessageIdRef = useRef<string | number | null>(null)
  const prevLastMessageRef = useRef<ChatMessage | null>(null)

  const topSentinelRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage: onScrollToTop,
    isFetchingNextPage,
    direction: 'top',
    threshold: 0.1,
  })

  // 상단 메시지 추가 시 스크롤 위치 보정
  useLayoutEffect(() => {
    if (chatMessages.length === 0 || !containerRef.current) return

    const currentFirstMessageId = getItemId(chatMessages[0])
    const prevFirstMessageId = prevFirstMessageIdRef.current

    if (prevFirstMessageId && prevFirstMessageId !== currentFirstMessageId) {
      const anchorIndex = chatMessages.findIndex(
        (m) => getItemId(m) === prevFirstMessageId,
      )

      if (anchorIndex !== -1 && offsets[anchorIndex] !== undefined) {
        const newScrollTop = offsets[anchorIndex]
        containerRef.current.scrollTop = newScrollTop
      }
    }

    prevFirstMessageIdRef.current = currentFirstMessageId
  }, [chatMessages, getItemId, offsets, containerRef])

  // 내 메시지 전송 시 하단 스크롤
  useEffect(() => {
    const currentLastMessage = chatMessages[chatMessages.length - 1]
    const prevLastMessage = prevLastMessageRef.current

    if (currentLastMessage && currentLastMessage !== prevLastMessage) {
      const isMyMessage = currentLastMessage.senderId === chatParticipantId

      if (isMyMessage && containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'auto',
        })
      }
    }
    prevLastMessageRef.current = currentLastMessage
  }, [chatMessages, chatParticipantId, containerRef])

  const getNextChatMessage = (currentIndex: number) => {
    return chatMessages[currentIndex + 1]
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-y-auto flex-1 w-full h-full min-h-0 relative"
      style={{
        overflowAnchor: 'none',
        overscrollBehaviorY: 'none',
      }}
    >
      {/* 무한 스크롤 트리거 */}
      {hasNextPage && <div ref={topSentinelRef} className="h-px" />}

      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Spinner />
        </div>
      )}

      <div
        style={{
          height: `${totalHeight}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${startOffset}px)`,
          }}
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={getItemId(item)}
              data-index={index}
              ref={measureElement}
              className="pb-1"
            >
              <ChatMessageItem
                messageItem={item}
                nextMessage={getNextChatMessage(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
