import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { CommentType, ReplyType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import {
  createComment,
  deleteComment,
  fetchComments,
  fetchReplies,
  updateComment,
} from './comments.clients'

export const useComments = (postId: number) => {
  const query = useInfiniteQuery<ApiResponse<CommentType>>({
    queryKey: ['comments', postId],
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
  return {
    ...query,
    comments:
      query.data?.pages.flatMap((p) => (p.success ? p.data.content : [])) ?? [],
  }
}

export const useReplies = ({ commentId }: { commentId: number }) => {
  const query = useInfiniteQuery<ApiResponse<ReplyType>>({
    queryKey: ['replies', commentId],
    queryFn: ({ pageParam }) =>
      fetchReplies({ commentId, lastReplyId: pageParam as number, size: 10 }),
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
  return {
    ...query,
    replies:
      query.data?.pages.flatMap((p) => (p.success ? p.data.content : [])) ?? [],
  }
}

export const useCommentMutations = () => {
  const queryClient = useQueryClient()

  // 공통 무효화 함수
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['comments'] })
    queryClient.invalidateQueries({ queryKey: ['replies'] })
  }

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      if (variables.parentId) {
        queryClient.invalidateQueries({
          queryKey: ['replies', variables.parentId],
        })
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      }
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: invalidateAll,
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: invalidateAll,
  })

  return {
    createComment: createCommentMutation,
    createReply: createCommentMutation,
    updateComment: updateCommentMutation,
    updateReply: updateCommentMutation,
    deleteComment: deleteCommentMutation,
    deleteReply: deleteCommentMutation,
  }
}
