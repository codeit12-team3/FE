import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { useChat } from '../api/chat.queries'
import { useChatRoomExit } from './useChatRoomExit'

export function useChatRoom(roomId: number) {
  const { data: session } = useSession()
  const token = session?.user.accessToken
  const searchParams = useSearchParams()
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const chatQuery = useChat({ chatRoomId: roomId })

  useChatRoomExit(chatParticipantId)

  const socketUrl = token
    ? `wss://api.tripus.site/ws-chat?chatRoomId=${roomId}&chatParticipantId=${chatParticipantId}&token=Bearer ${token}`
    : ''

  return {
    socketUrl,
    chatParticipantId,
    token,
    chatQuery,
  }
}
