'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { ChatListItem, ChatMessage } from '@/features/chat/types/chat.type'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import ChatMessageItem from '../ChatMessageItem/ChatMessageItem'
import VirtualScrollWrapper from '../VirtualScrollWrapper/VirtualScrollWrapper'

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

  const containerRef = useRef<HTMLDivElement>(null)
  const prevLastMessageRef = useRef<ChatMessage | null>(null)

  const chatMessages = messages.filter(
    (msg) => msg.messageType === 'CHAT',
  ) as ChatMessage[]

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
    <VirtualScrollWrapper<ChatMessage>
      containerRef={containerRef}
      items={chatMessages}
      estimatedItemHeight={66}
      overscan={10}
      direction="reverse"
      className="overflow-y-auto flex-1 flex flex-col-reverse relative"
      renderItem={(item, index, measureRef) => (
        <div key={item.messageId} data-index={index} ref={measureRef}>
          <ChatMessageItem messageItem={item} />
        </div>
      )}
    >
      {hasNextPage && <div ref={topSentinelRef} className="h-px shrink-0" />}
      {isFetchingNextPage && (
        <div className="flex justify-center py-2 shrink-0">
          <Spinner />
        </div>
      )}
    </VirtualScrollWrapper>
  )
}
