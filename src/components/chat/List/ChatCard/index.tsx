import { Button } from '@/components/common'
import { ChatRoomContent } from '@/types/chat/chats.types'

import CardThumbnail from '../../../common/CardThumbnail'
import { CardHeader } from './CardHeader'
import LastMessage from './LastMessage'

interface ChatCardProps {
  chat: ChatRoomContent
}

export default function ChatCard({ chat }: ChatCardProps) {
  const {
    thumbnail,
    recruitStatus,
    title,
    unreadCount,
    lastMessage,
    lastMessageAt,
  } = chat

  return (
    <li className="w-full md:p-6 p-4 flex md:gap-7 gap-3 bg-white rounded-4xl border overflow-hidden border-gray-200 content-auto [contain-intrinsic-size:auto_220px]">
      <CardThumbnail imageUrl={thumbnail} variant="chat" />
      <div className="flex-1 flex flex-col justify-between min-w-0 py-3">
        <CardHeader
          title={title}
          recruitStatus={recruitStatus}
          unreadCount={unreadCount}
        />
        <LastMessage lastMessage={lastMessage} lastMessageAt={lastMessageAt} />
      </div>
    </li>
  )
}
