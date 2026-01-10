import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { insertDateHeaders } from '@/lib/chat/insertDateHeaders'
import { ChatListItem, ChatType } from '@/types/chat/chat.type'
import { ApiResponse } from '@/types/common'

import { fetchChat } from './chat.clients'

type ChatApiResponse = ApiResponse<ChatType>

export const useChat = ({ chatRoomId }: { chatRoomId: number }) => {
  return useInfiniteQuery<
    ChatApiResponse,
    Error,
    ChatListItem[],
    (string | number)[],
    number
  >({
    queryKey: ['chat', chatRoomId],
    queryFn: async ({ pageParam }) => {
      const result = await fetchChat({ page: pageParam, size: 30 }, chatRoomId)
      return result
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      const { number, totalPages } = lastPage.data.page
      return number + 1 < totalPages ? number + 1 : undefined
    },
    select: useCallback((data: InfiniteData<ChatApiResponse>) => {
      const allMessages = data.pages.flatMap((page) =>
        page.success ? page.data.content : [],
      )

      const reversedMessages = [...allMessages].reverse()

      return insertDateHeaders(reversedMessages)
    }, []),
  })
}
