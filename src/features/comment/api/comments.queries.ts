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
      // isLast가 true이거나 페이지가 비어있으면 undefined를 반환
      if (!lastPage.success || lastPage.data.isLast) return undefined
      const content = lastPage.data.content
      return content.length > 0
        ? content[content.length - 1].commentId
        : undefined
    },
    staleTime: 5 * 60 * 1000,
    // pages 배열을 평탄화해 단순 배열로 사용할 수 있도록 변환
    // 에러로 인해 데이터를 정상적으로 불러오지 못하면 빈 배열로 처리해 부분 실패 시에도 데이터를 유지
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
