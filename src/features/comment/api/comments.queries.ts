import { useInfiniteQuery } from '@tanstack/react-query'

import { GetCommentsResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { fetchComments } from './comments.clients'
import { commentKeys } from './key'

export const useComments = (postId: number) => {
  const query = useInfiniteQuery<ApiResponse<GetCommentsResponse>>({
    queryKey: commentKeys.list(postId),
    queryFn: ({ pageParam }) =>
      fetchComments({ postId, lastCommentId: pageParam as number, size: 10 }),
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
  const comments =
    query.data?.pages.flatMap((p) => (p.success ? p.data.content : [])) ?? []
  return {
    ...query,
    comments,
  }
}
