'use client'

import { useSession } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { leaveChatroom } from '@/api/chat/chatroom.clients'
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

  useEffect(() => {
    chatParticipantIdRef.current = chatParticipantId
  }, [chatParticipantId])

  useEffect(() => {
    return () => {
      if (chatParticipantIdRef.current) {
        leaveChatroom({
          chatParticipantId: chatParticipantIdRef.current,
        }).catch((error) => {
          console.error('채팅방 이탈 실패:', error)
        })
      }
    }
  }, [])

  if (status === 'loading' || !token) {
    return <div className="flex-1 bg-gray-50" />
  }

  return (
    <WebSocketProvider
      url={`wss://api.tripus.site/ws-chat?chatRoomId=${roomId}&chatParticipantId=${chatParticipantId}&token=Bearer ${token}`}
      chatRoomId={roomId}
    >
      <div className="w-full h-full flex flex-col overflow-y-scroll md:overflow-hidden">
        <ChatInfoBanner />
        <ChatMessageList />
        <ChatForm />
      </div>
    </WebSocketProvider>
  )
}
