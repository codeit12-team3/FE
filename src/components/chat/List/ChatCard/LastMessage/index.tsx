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
    <div className="w-full flex items-center gap-2 justify-between text-sm md:text-base text-gray-600 h-9">
      {lastMessage ? (
        <>
          <p className="text-gray-600 truncate">{lastMessage}</p>
          <span className="text-gray-400 pr-1 md:p-0 shrink-0">
            {formatRelativeTime(lastMessageAt)}
          </span>
        </>
      ) : (
        <span>채팅이 시작됐습니다!</span>
      )}
    </div>
  )
}
