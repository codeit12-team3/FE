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
    <div className="flex items-center justify-end gap-1.5 text-sm text-gray-600">
      <span className="text-gray-400">{lastMessage}</span>
      <span>{formatRelativeTime(lastMessageAt)}</span>
    </div>
  )
}
