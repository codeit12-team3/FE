import { string } from 'zod'

import CardThumbnail from '../../../common/CardThumbnail'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import CardTitle from './CardTitle'
import LastMessage from './LastMessage'

type LastMessage = {
  nickname: string
  content: string
  sentAt: string
}

type Chat = {
  imageUrl: string
  tags: string[]
  recruitStatus: 'COMPLETED' | 'RECRUITING' | 'FINISH'
  postTitle: string
  owner: string
  unreadCount: number
  lastMessage: LastMessage
  nation: string
  region: string
  startDate: string
  participantImage: string[]
}

interface ChatCardProps {
  chat: Chat
}

export default function ChatCard({ chat }: ChatCardProps) {
  const {
    imageUrl,
    tags,
    recruitStatus,
    postTitle,
    owner,
    unreadCount,
    lastMessage,
    nation,
    region,
    startDate,
    participantImage,
  } = chat
  return (
    <li className="w-full p-6 flex justify-between gap-[26px]">
      <CardThumbnail imageUrl={imageUrl} variant="chat" />
      <div className="flex flex-col justify-between">
        <CardHeader tags={tags} recruitStatus={recruitStatus} />
        <CardTitle postTitle={postTitle} owner={owner} />
        <LastMessage lastMessage={lastMessage} />
        <CardFooter
          nation={nation}
          region={region}
          startDate={startDate}
          participantImage={participantImage}
        />
      </div>
    </li>
  )
}
