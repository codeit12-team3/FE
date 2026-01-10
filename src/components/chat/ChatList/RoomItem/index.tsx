import Link from 'next/link'

import { ChatRoomContent } from '@/types/chat/chatRoom.types'

import CardThumbnail from '../../../common/CardThumbnail'
import { CardHeader } from './CardHeader'
import LastMessage from './LastMessage'

interface RoomItemProps {
  chat: ChatRoomContent
  isPriority?: boolean
}

export default function RoomItem({ chat, isPriority = false }: RoomItemProps) {
  const {
    chatRoomId,
    thumbnail,
    recruitStatus,
    chatParticipantId,
    title,
    unreadCount,
    lastMessage,
    lastMessageAt,
    nation,
    region,
    startDate,
    endDate,
  } = chat

  const params = new URLSearchParams({
    chatParticipantId: String(chatParticipantId),
    title: title,
    thumbnail: thumbnail ?? '',
    recruitStatus: recruitStatus,
    nation: nation,
    region: region,
    startDate: startDate,
    endDate: endDate,
  })

  return (
    <Link
      href={`/chat/${chatRoomId}?${params.toString()}`}
      className="w-full p-4 flex gap-3 bg-white rounded-3xl border overflow-hidden border-gray-200 content-auto [contain-intrinsic-size:auto_220px] cursor-pointer hover:shadow-xs"
    >
      <CardThumbnail
        imageUrl={thumbnail}
        variant="chat"
        isPriority={isPriority}
      />

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <CardHeader
          title={title}
          recruitStatus={recruitStatus}
          unreadCount={unreadCount}
        />
        <LastMessage lastMessage={lastMessage} lastMessageAt={lastMessageAt} />
      </div>
    </Link>
  )
}
