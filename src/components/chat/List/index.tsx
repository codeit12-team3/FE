import { useChatRooms } from '@/api/chat/chatroom.queries'
import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll'

import ChatCard from './ChatCard'
import { ChatCardSkeleton } from './ChatCard/ChatCardSkeleton'

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
      <div className="flex min-h-[400px] flex-col text-sm items-center justify-center text-gray-500">
        <p>검색 결과와 일치하는 채팅방이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-0 overflow-y-auto content-auto [scrollbar-gutter:stable]">
      <div className="flex flex-col h-full gap-4 md:pl-3.5 md:pr-0 px-4">
        {chatRooms.map((room, index) => (
          <ChatCard key={room.chatRoomId} chat={room} isPriority={index < 4} />
        ))}
        <div
          ref={hasNextPage ? triggerRef : null}
          className="flex min-h-[100px] items-center justify-center py-8"
        >
          {isFetchingNextPage ? (
            <div className="py-4 text-center flex items-center justify-center gap-2">
              <Spinner />
              <p className="text-sm text-gray-500">채팅방 불러오는 중...</p>
            </div>
          ) : (
            !hasNextPage && (
              <div className="py-4 text-center flex items-center justify-center gap-2">
                <p className="text-sm text-gray-400">마지막 채팅방입니다</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
