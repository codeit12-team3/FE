'use client'

import { useSession } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'

import { Spinner } from '@/components/ui/spinner'

import { useChat } from '../api/chat.queries'
import { useChatRoomExit } from '../hook/useChatRoomExit'
import { WebSocketProvider } from '../provider/WebSocketContext'
import ChatInfoBanner from './ChatBanner/ChatBanner'
import ChatForm from './ChatForm/ChatForm'
import ChatMessageList from './ChatMessageList/ChatMessageList'

export default function ChatRoomClient() {
  const { data: session, status } = useSession()
  const token = session?.user.accessToken
  const params = useParams()
  const roomId = Number(params.roomId)
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  useChatRoomExit(chatParticipantId)

  const {
    data: messages = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChat({ chatRoomId: roomId })

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
          hasNextPage={hasNextPage}
          onScrollToTop={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage()
          }}
        />
        <ChatForm />
      </div>
    </WebSocketProvider>
  )
}
