import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchChat } from './chat.clients'

// chat.queries.ts
export const useChat = ({ chatRoomId }: { chatRoomId: number }) => {
  const query = useInfiniteQuery({
    queryKey: ['chat', chatRoomId],
    queryFn: ({ pageParam = 0 }) =>
      fetchChat({ page: pageParam, size: 10 }, chatRoomId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      const { number, totalPages } = lastPage.data.page
      return number + 1 < totalPages ? number + 1 : undefined
    },
    staleTime: 5 * 60 * 1000,
  })

  const chat =
    query.data?.pages
      .flatMap((page) => {
        if (!page.success) return []
        return page.data.content
      })
      .reverse() ?? []

  return {
    ...query,
    chat,
  }
}
