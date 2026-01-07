import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getMessageWithDateFlags } from '@/lib/chat/getMessageWithDateFlags'

import { fetchChat } from './chat.clients'

export const useChat = ({ chatRoomId }: { chatRoomId: number }) => {
  const query = useInfiniteQuery({
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
    staleTime: 5 * 60 * 1000,
  })

  const messagesWithDateFlags = useMemo(() => {
    const allPagesContent =
      query.data?.pages.flatMap((page) =>
        page.success ? page.data.content : [],
      ) ?? []

    const sorted = [...allPagesContent].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

    return getMessageWithDateFlags(sorted)
  }, [query.data?.pages])

  return {
    ...query,
    data: messagesWithDateFlags,
  }
}
