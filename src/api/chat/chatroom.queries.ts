import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchChatRooms } from './chatroom.clients'

export const useChatRooms = ({ keyword }: { keyword: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['chatroom', keyword],

    queryFn: ({ pageParam = 0 }) =>
      fetchChatRooms({
        page: pageParam,
        size: 50,
        keyword,
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
