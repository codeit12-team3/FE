import { useInfiniteQuery } from '@tanstack/react-query'

import { ChatRoomFilters } from '@/types/chat/chats.types'

import { fetchChatRooms } from './chatroom.clients'
import { chatroomKeys } from './chatroom.key'

export const useChatRooms = (filters: ChatRoomFilters) => {
  const query = useInfiniteQuery({
    queryKey: [...chatroomKeys.list(), filters],

    queryFn: ({ pageParam = 0 }) =>
      fetchChatRooms({
        page: pageParam,
        size: 10,
        ...filters,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      const { number, totalPages } = lastPage.data.page
      return number + 1 < totalPages ? number + 1 : undefined
    },

    staleTime: 5 * 60 * 1000,
  })

  const chatRooms =
    query.data?.pages.flatMap((page) => {
      if (!page.success) return []
      return page.data.content
    }) ?? []

  return {
    ...query,
    chatRooms,
  }
}
