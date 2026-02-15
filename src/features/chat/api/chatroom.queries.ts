import { useInfiniteQuery } from '@tanstack/react-query'

import { STALE_TIME } from '@/constants/common'

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

    staleTime: STALE_TIME.DEFAULT,
  })
  // 모든 페이지의 배열을 평탄화하여 단일 배열로 만듬
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
