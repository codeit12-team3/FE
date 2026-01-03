import { useParams } from 'next/navigation'

import { useChat } from '@/api/chat/chat.queries'
import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { formatKstDate } from '@/lib/common'

import ChatMessageItem from '../ChatMessageItem'
import DateSeparator from '../DateSeparator'

export default function ChatMessageList() {
  const params = useParams()
  const chatRoomId = Number(params.roomId)
  const { chat, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useChat({ chatRoomId })

  const triggerRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  })

  const shouldShowDateSeparator = (index: number) => {
    if (index === 0) return true

    const currentDate = formatKstDate(chat[index].createdAt)
    const previousDate = formatKstDate(chat[index - 1].createdAt)

    return currentDate !== previousDate
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col-reverse min-h-0 scrollbar-hide">
      <div className="flex flex-col gap-2 px-4 pb-4">
        {chat.map((message, index) => (
          <div key={message.messageId}>
            {shouldShowDateSeparator(index) && (
              <DateSeparator date={message.createdAt} />
            )}
            <ChatMessageItem messageItem={message} />
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div
          ref={triggerRef}
          className="flex items-center justify-center w-full py-4 shrink-0"
        >
          {isFetchingNextPage && (
            <div className="flex items-center gap-2">
              <Spinner />
              <span className="text-xs text-gray-400">
                이전 메시지 불러오는 중...
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
