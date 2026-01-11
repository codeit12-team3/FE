'use client'

import { useSession } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useChat } from '@/api/chat/chat.queries'
import { leaveChatroom } from '@/api/chat/chatroom.clients'
import { Spinner } from '@/components/ui/spinner'
import { WebSocketProvider } from '@/providers/WebSocketContext'

import ChatInfoBanner from './ChatBanner'
import ChatForm from './ChatForm'
import ChatMessageList from './ChatMessageList'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const token = session?.user.accessToken
  const params = useParams()
  const roomId = Number(params.roomId)
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const chatParticipantIdRef = useRef(chatParticipantId)

  // 1. 데이터 패칭
  const {
    data: messages = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChat({ chatRoomId: roomId })

  useEffect(() => {
    chatParticipantIdRef.current = chatParticipantId
  }, [chatParticipantId])

  useEffect(() => {
    return () => {
      if (chatParticipantIdRef.current) {
        leaveChatroom({
          chatParticipantId: chatParticipantIdRef.current,
        }).catch(console.error)
      }
    }
  }, [])

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    )
  }

  if (!token) return null

  return (
    <WebSocketProvider
      url={`wss://api.tripus.site/ws-chat?chatRoomId=${roomId}&chatParticipantId=${chatParticipantId}&token=Bearer ${token}`}
      chatRoomId={roomId}
    >
      <div className="w-full h-full flex flex-col overflow-y-scroll md:overflow-hidden">
        <ChatInfoBanner />
        <ChatMessageList
          messages={messages}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage} // 추가
          onScrollToTop={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage()
          }}
        />
        <ChatForm />
      </div>
    </WebSocketProvider>
  )
}
