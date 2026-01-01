import { useChatRooms } from '@/api/chat/chatroom.queries'
import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import ChatCard from './ChatCard'
import { ChatCardSkeleton } from './ChatCardSkeleton'

interface ChatListProps {
  searchKeyword: string
}

export default function ChatList({ searchKeyword }: ChatListProps) {
  const {
    chatRooms,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useChatRooms({ keyword: searchKeyword })

  const triggerRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <ChatCardSkeleton />
        <ChatCardSkeleton />
        <ChatCardSkeleton />
      </div>
    )
  }

  if (chatRooms.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-gray-500">
        <p>검색 결과와 일치하는 채팅방이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {chatRooms.map((room) => (
        <ChatCard key={room.chatRoomId} chat={room} />
      ))}
      <div
        ref={hasNextPage ? triggerRef : null}
        className="flex min-h-[100px] items-center justify-center py-8"
      >
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Spinner />
            <span className="text-sm">목록을 더 불러오는 중...</span>
          </div>
        ) : (
          !hasNextPage && (
            <div className="text-center">
              <div className="mb-2 h-px w-12 bg-gray-200 mx-auto" />
              <p className="text-xs text-gray-400">마지막 채팅방입니다</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
