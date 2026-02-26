'use client'

import { useSearchParams } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

import ContainerScrollWrapper from '@/components/ContainerScrollWrapper/ContainerScrollWrapper'
import { Spinner } from '@/components/ui/spinner'
import { ChatListItem, ChatMessage } from '@/features/chat/types/chat.type'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

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

  const chatMessages = messages as ChatMessage[]

  const topSentinelRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage: onScrollToTop,
    isFetchingNextPage,
    direction: 'top',
    threshold: 0.1,
  })

  const prevLastMessageIdRef = useRef<number | string | null>(null)

  useLayoutEffect(() => {
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
    <ContainerScrollWrapper
      items={chatMessages}
      estimatedItemHeight={66}
      keyField="messageId"
      direction="reverse"
      className="overflow-y-auto flex-1 flex"
      renderItem={(item) => <ChatMessageItem messageItem={item} />}
    >
      <div className="flex flex-col items-center shrink-0">
        {isFetchingNextPage && (
          <div className="py-2">
            <Spinner />
          </div>
        )}
        {hasNextPage && <div ref={topSentinelRef} className="h-px w-full" />}
      </div>
    </ContainerScrollWrapper>
  )
}
