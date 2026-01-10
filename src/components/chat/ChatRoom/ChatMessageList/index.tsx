'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useChat } from '@/api/chat/chat.queries'
import { Spinner } from '@/components/ui/spinner'
import { ChatMessage } from '@/types/chat/chat.type'

import ChatMessageItem from '../ChatMessageItem'
import DateSeparator from '../DateSeparator'

export default function ChatMessageList() {
  'use no memo'

  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const listRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const chatRoomId = Number(params.roomId)

  const previousScrollHeightRef = useRef<number>(0)

  const {
    data: messages = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChat({ chatRoomId })

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 66,
    overscan: 10,
    gap: 4,
    useFlushSync: false,
    initialOffset: 6100,
  })

  const getNextChatMessage = (currentIndex: number) => {
    for (let i = currentIndex + 1; i < messages.length; i++) {
      if (messages[i].messageType === 'CHAT') {
        return messages[i] as ChatMessage
      }
    }
    return undefined
  }

  // 데이터 로드 전 스크롤 높이 저장
  useEffect(() => {
    if (isFetchingNextPage && listRef.current) {
      previousScrollHeightRef.current = listRef.current.scrollHeight
    }
  }, [isFetchingNextPage])

  // 데이터 로드 후 스크롤 위치 조정
  useEffect(() => {
    if (
      !isFetchingNextPage &&
      previousScrollHeightRef.current > 0 &&
      listRef.current
    ) {
      const newScrollHeight = listRef.current.scrollHeight
      const scrollDiff = newScrollHeight - previousScrollHeightRef.current
      listRef.current.scrollTop = listRef.current.scrollTop + scrollDiff
      previousScrollHeightRef.current = 0
    }
  }, [isFetchingNextPage, messages.length])

  // 상단 도달 시 데이터 로드
  useEffect(() => {
    const element = listRef.current
    if (!element) return

    const handleScroll = () => {
      if (element.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div ref={listRef} className="overflow-y-auto flex-1 w-full h-full min-h-0">
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
                  messageItem={message}
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
