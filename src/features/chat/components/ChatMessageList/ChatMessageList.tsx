'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { ChatListItem, ChatMessage } from '@/features/chat/types/chat.type'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import { useVirtualScroll } from '../../utils/useVirtualScroll'
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

  const chatMessages = messages.filter(
    (msg) => msg.messageType === 'CHAT',
  ) as ChatMessage[]

  const {
    containerRef,
    visibleItems,
    totalHeight,
    startOffset,
    endOffset,
    handleScroll,
    measureElement,
  } = useVirtualScroll<ChatMessage>({
    items: chatMessages,
    estimatedItemHeight: 66,
    overscan: 10,
    direction: 'reverse',
  })

  const prevLastMessageRef = useRef<ChatMessage | null>(null)

  const topSentinelRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage: onScrollToTop,
    isFetchingNextPage,
    direction: 'top',
    threshold: 0.1,
  })

  useEffect(() => {
    const currentLastMessage = chatMessages[0]
    const prevLastMessage = prevLastMessageRef.current

    if (currentLastMessage && currentLastMessage !== prevLastMessage) {
      const isMyMessage = currentLastMessage.senderId === chatParticipantId

      if (isMyMessage && containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'auto',
        })
      }
    }
    prevLastMessageRef.current = currentLastMessage
  }, [chatMessages, chatParticipantId])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-y-auto flex-1 flex flex-col-reverse relative"
      style={{ overflowAnchor: 'none' }}
    >
      <div style={{ height: `${startOffset}px`, flexShrink: 0 }} />

      {visibleItems.map(({ item, index }) => (
        <div key={item.messageId} data-index={index} ref={measureElement}>
          <ChatMessageItem messageItem={item} />
        </div>
      ))}

      <div style={{ height: `${totalHeight - endOffset}px`, flexShrink: 0 }} />

      {hasNextPage && <div ref={topSentinelRef} className="h-px shrink-0" />}

      {isFetchingNextPage && (
        <div className="flex justify-center py-2 shrink-0">
          <Spinner />
        </div>
      )}
    </div>
  )
}
