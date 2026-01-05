import { useInfiniteQuery } from '@tanstack/react-query'

import { getMessageWithDateFlags } from '@/lib/chat/getMessageWithDateFlags'

import { fetchChat } from './chat.clients'

export const useChat = ({ chatRoomId }: { chatRoomId: number }) => {
  const query = useInfiniteQuery({
    queryKey: ['chat', chatRoomId],
    queryFn: ({ pageParam = 0 }) =>
      fetchChat({ page: pageParam, size: 30 }, chatRoomId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      const { number, totalPages } = lastPage.data.page
      return number + 1 < totalPages ? number + 1 : undefined
    },
    staleTime: 5 * 60 * 1000,
  })
  const rawMessages =
    query.data?.pages.flatMap((page) =>
      page.success ? page.data.content : [],
    ) ?? []

  const displayMessages = [...rawMessages].reverse()

  const chat = getMessageWithDateFlags(displayMessages)

  return { ...query, chat }
}
