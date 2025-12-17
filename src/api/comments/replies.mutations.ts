import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import { ReplyType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import {
  createReply,
  deleteReply,
  fetchReplies,
  updateReply,
} from './replies.clients'

export const useReplies = ({
  postId,
  parentId,
}: {
  postId: number
  parentId: number
}) => {
  const query = useInfiniteQuery<ApiResponse<ReplyType>>({
    queryKey: ['replies', postId],
    queryFn: ({ pageParam }) =>
      fetchReplies({
        postId: postId,
        parentId: parentId,
        lastReplyId: pageParam as number,
        size: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      if (lastPage.data.isLast) return undefined

      const replies = lastPage.data.content
      return replies.length > 0
        ? replies[replies.length - 1].commentId
        : undefined
    },
    staleTime: 5 * 60 * 1000,
  })

  const replies =
    query.data?.pages.flatMap((page) =>
      page.success ? page.data.content : [],
    ) ?? []

  return {
    ...query,
    replies,
  }
}

export const useCreateReply = () => {
  return useMutation<
    ApiResponse<{ commentId: number }>,
    Error,
    { postId: string; parentId: number | null; content: string }
  >({
    mutationFn: (params) => createReply(params),
    retry: 0,
  })
}

export const useUpdateReply = () => {
  return useMutation<
    ApiResponse<{ updated: true }>,
    Error,
    { commentId: number; content: string }
  >({
    mutationFn: (params) => updateReply(params),
    retry: 0,
  })
}

export const useDeleteReply = () => {
  return useMutation<
    ApiResponse<{ deleted: true }>,
    Error,
    { commentId: number }
  >({
    mutationFn: (params) => deleteReply(params),
    retry: 0,
  })
}
