import { formatRelativeTime } from '@/lib/common'

interface LastMessageProps {
  lastMessage: string
  lastMessageAt: string
}

export default function LastMessage({
  lastMessage,
  lastMessageAt,
}: LastMessageProps) {
  return (
    <div className="w-full flex items-center justify-between gap-1.5 text-base text-gray-600">
      <span>{lastMessage}</span>
      <span>{formatRelativeTime(lastMessageAt)}</span>
    </div>
  )
}
