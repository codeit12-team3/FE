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

type ChatMessageVM = ChatMessage & {
  isMyMessage: boolean
  showProfile: boolean
  showTime: boolean
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
    const last = chatMessages[chatMessages.length - 1]
    const lastId = last?.messageId ?? null

    if (lastId && lastId !== prevLastMessageIdRef.current) {
      if (last.senderId === chatParticipantId) {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'auto',
        })
      }
    }

    prevLastMessageIdRef.current = lastId
  }, [chatMessages, chatParticipantId])

  const items: ChatMessageVM[] = chatMessages.map((msg, index) => {
    const newer = chatMessages[index + 1]
    const older = chatMessages[index - 1]

    const isMyMessage = msg.senderId === chatParticipantId

    const showProfile =
      !isMyMessage && (!older || msg.senderId !== older.senderId)

    const showTime = (() => {
      if (!newer) return true
      if (msg.senderId !== newer.senderId) return true

      const a = new Date(msg.createdAt).getTime()
      const b = new Date(newer.createdAt).getTime()
      return Math.floor(a / 60000) !== Math.floor(b / 60000)
    })()

    return {
      ...msg,
      isMyMessage,
      showProfile,
      showTime,
    }
  })

  return (
    <ContainerScrollWrapper
      items={items}
      keyField="messageId"
      direction="reverse"
      estimatedItemHeight={66}
      className="overflow-y-auto flex-1 flex"
      containerRef={containerRef}
      renderItem={(item) => (
        <ChatMessageItem
          messageItem={item}
          isMyMessage={item.isMyMessage}
          showProfile={item.showProfile}
          showTime={item.showTime}
        />
      )}
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
