import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { Comment, GetCommentsResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { fetchComments } from './comments.http'
import { commentKeys } from './queryKeys'

type CommentsSelectResult = InfiniteData<ApiResponse<GetCommentsResponse>> & {
  comments: Comment[]
}

export const useComments = (postId: number) => {
  const query = useInfiniteQuery<
    ApiResponse<GetCommentsResponse>,
    Error,
    CommentsSelectResult
  >({
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
    select: (data) => ({
      ...data,
      comments: data.pages.flatMap((p) => (p.success ? p.data.content : [])),
    }),
  })

  return {
    ...query,
    comments: query.data?.comments ?? [],
  }
}
