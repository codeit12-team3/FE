import { useInfiniteQuery } from '@tanstack/react-query'

import { GetRepliesResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { replyKeys } from './key'
import { fetchReplies } from './replies.clients'

type UseRepliesParams = {
  commentId: number
  enabled?: boolean
}

export const useReplies = ({ commentId, enabled = true }: UseRepliesParams) => {
  const query = useInfiniteQuery<ApiResponse<GetRepliesResponse>>({
    queryKey: replyKeys.list(commentId),
    enabled,
    queryFn: ({ pageParam }) =>
      fetchReplies({
        commentId,
        lastReplyId: pageParam as number,
        size: 5,
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

  const replies =
    query.data?.pages.flatMap((p) => (p.success ? p.data.content : [])) ?? []

  return { ...query, replies }
}
