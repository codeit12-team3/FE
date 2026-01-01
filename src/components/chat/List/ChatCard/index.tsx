import Link from 'next/link'

import { ChatRoomContent } from '@/types/chat/chats.types'

import CardThumbnail from '../../../common/CardThumbnail'
import { CardHeader } from './CardHeader'
import LastMessage from './LastMessage'

interface ChatCardProps {
  chat: ChatRoomContent
}

export default function ChatCard({ chat }: ChatCardProps) {
  const {
    chatRoomId,
    thumbnail,
    recruitStatus,
    title,
    unreadCount,
    lastMessage,
    lastMessageAt,
    nation,
    region,
  } = chat
  const params = new URLSearchParams({
    title: title,
    thumbnail: thumbnail ?? '',
    recruitStatus: recruitStatus,
    nation: nation,
    region: region,
  })
  return (
    <Link
      href={`/chat/${chatRoomId}?${params.toString()}`}
      className="w-full md:p-6 p-4 flex md:gap-7 gap-3 bg-white rounded-3xl md:rounded-4xl border overflow-hidden border-gray-200 content-auto [contain-intrinsic-size:auto_220px] cursor-pointer hover:shadow-xs"
    >
      <CardThumbnail imageUrl={thumbnail} variant="chat" />
      <div className="flex-1 flex flex-col gap-2 min-w-0 ">
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
