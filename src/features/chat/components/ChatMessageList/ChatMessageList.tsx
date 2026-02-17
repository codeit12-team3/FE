'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { ChatListItem, ChatMessage } from '@/features/chat/types/chat.type'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import VirtualScrollWrapper from '../../../../components/VirtualScrollWrapper/VirtualScrollWrapper'
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

  const containerRef = useRef<HTMLDivElement>(null)

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

  const prevLastMessageIdRef = useRef<number | string | null>(null)

  useEffect(() => {
    const last = chatMessages[0]
    const lastId = last?.messageId ?? null

    if (lastId && lastId !== prevLastMessageIdRef.current) {
      if (last.senderId === chatParticipantId) {
        containerRef.current?.scrollTo({ top: 0, behavior: 'auto' })
      }
    }

    prevLastMessageIdRef.current = lastId
  }, [chatMessages, chatParticipantId])

  return (
    <VirtualScrollWrapper
      containerRef={containerRef}
      items={chatMessages}
      estimatedItemHeight={66}
      overscan={10}
      direction="reverse"
      className="overflow-y-auto flex-1 flex"
      keyField="messageId"
      renderItem={(item) => <ChatMessageItem messageItem={item} />}
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
