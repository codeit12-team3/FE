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
    <div className="w-full flex items-center gap-1.5 text-sm md:text-base text-gray-600 pb-4 h-9">
      {lastMessage ? (
        <>
          <span className="text-gray-600 flex-1 truncate">{lastMessage}</span>
          <span className="text-gray-400 pr-1 md:p-0">
            {formatRelativeTime(lastMessageAt)}
          </span>
        </>
      ) : (
        <span>채팅이 시작됬습니다!</span>
      )}
    </div>
  )
}
