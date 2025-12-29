import { formatRelativeTime } from '@/lib/common'

type LastMessage = {
  nickname: string
  content: string
  sentAt: string
}

interface LastMessageProps {
  lastMessage: LastMessage
}

export default function LastMessage({ lastMessage }: LastMessageProps) {
  const { content, sentAt } = lastMessage
  return (
    <div className="flex justify-between items-center text-sm text-gray-600">
      <p>{content}</p>
      <div className="flex items-center gap-1.5">
        <span className="text-gray-400">마지막 메세지</span>
        <span>{formatRelativeTime(sentAt)}</span>
      </div>
    </div>
  )
}
