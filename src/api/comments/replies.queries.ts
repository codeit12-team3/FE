import { useInfiniteQuery } from '@tanstack/react-query'

import { ReplyType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import { fetchReplies } from './replies.clients'

export const useReplies = ({ commentId }: { commentId: number }) => {
  const query = useInfiniteQuery<ApiResponse<ReplyType>>({
    queryKey: ['replies', commentId],
    queryFn: ({ pageParam }) =>
      fetchReplies({
        commentId,
        lastReplyId: pageParam as number,
        size: 10,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || lastPage.data.isLast) return undefined
      const content = lastPage.data.content
      return content.length > 0
        ? content[content.length - 1].commentId
        : undefined
    },
    staleTime: 5 * 60 * 1000,
  })
  console.log(query.data)
  const replies =
    query.data?.pages.flatMap((p) => (p.success ? p.data.content : [])) ?? []

  return {
    ...query,
    replies,
  }
}
