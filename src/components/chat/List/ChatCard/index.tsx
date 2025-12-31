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
    <li className="w-full md:p-6 p-4 flex  md:items-center md:gap-7 gap-3 bg-white rounded-3xl border overflow-hidden border-gray-200 content-auto [contain-intrinsic-size:auto_220px]">
      <CardThumbnail imageUrl={thumbnail} variant="chat" />
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col justify-between md:pt-4">
          <CardHeader
            title={title}
            recruitStatus={recruitStatus}
            unreadCount={unreadCount}
          />
          <LastMessage
            lastMessage={lastMessage}
            lastMessageAt={lastMessageAt}
          />
        </div>
        <Button className="bg-blue-500 md:mt-auto ml-auto rounded-xl w-[128px] md:w-[136px]">
          채팅 참가하기
        </Button>
      </div>
    </li>
  )
}
