import { string } from 'zod'

import { ChatRoomContent } from '@/types/chat/chats.types'

import CardThumbnail from '../../../common/CardThumbnail'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardTitle from './CardTitle'
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
    nation,
    region,
    startDate,
    lastMessageAt,
    tags,
  } = chat
  return (
    <li className="w-full sm:p-6 flex flex-col sm:flex-row sm:gap-[26px] bg-white rounded-3xl sm:rounded-[40px] border overflow-hidden border-gray-200">
      <CardThumbnail imageUrl={thumbnail} variant="chat" />
      <div className="flex flex-col justify-start sm:justify-between sm:flex-1 p-4 sm:p-0 gap-5">
        <CardHeader recruitStatus={recruitStatus} tags={tags} />
        <CardTitle postTitle={title} unreadCount={unreadCount} />
        <LastMessage lastMessage={lastMessage} lastMessageAt={lastMessageAt} />
        <CardFooter nation={nation} region={region} startDate={startDate} />
      </div>
    </li>
  )
}
