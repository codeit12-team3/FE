import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/common'

import {
  CommentListCache,
  removeCommentFromCache,
  updateCommentInCache,
} from './cache'
import { createComment, deleteComment, updateComment } from './comments.clients'
import { commentKeys } from './key'

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()
  const queryKey = commentKeys.list(postId)
  const postDetailKey = ['postDetail', String(postId)] as const

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('댓글이 작성되었습니다')
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      if (previousComments) {
        queryClient.setQueryData<CommentListCache>(queryKey, (old) =>
          updateCommentInCache(old, variables.commentId, variables.content),
        )
      }
      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentListCache>(
          queryKey,
          context.previousComments,
        )
      }
      toast.error('댓글 수정에 실패했습니다.')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  const removeCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('댓글이 삭제되었습니다.')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments =
        queryClient.getQueryData<CommentListCache>(queryKey)

      if (previousComments) {
        queryClient.setQueryData<CommentListCache>(queryKey, (old) =>
          removeCommentFromCache(old, variables.commentId),
        )
      }
      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentListCache>(
          queryKey,
          context.previousComments,
        )
      }
      toast.error('댓글 삭제에 실패했습니다.')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  return { createCommentMutation, updateCommentMutation, removeCommentMutation }
}
