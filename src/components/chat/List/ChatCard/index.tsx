import { string } from 'zod'

import { ChatRoomContent } from '@/types/chat/chats.types'

import CardThumbnail from '../../../common/CardThumbnail'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardTitle from './CardTitle'

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
    nation,
    region,
    startDate,
    lastMessageAt,
  } = chat
  return (
    <li className="w-full p-6 flex gap-[26px] bg-white rounded-[40px] border border-gray-200">
      <CardThumbnail imageUrl={thumbnail} variant="chat" />
      <div className="flex flex-col justify-between flex-1">
        <CardHeader recruitStatus={recruitStatus} />
        <CardTitle
          postTitle={title}
          unreadCount={unreadCount}
          lastMessage={lastMessage}
          lastMessageAt={lastMessageAt}
        />
        <CardFooter nation={nation} region={region} startDate={startDate} />
      </div>
    </li>
  )
}
