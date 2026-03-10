import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/common'

import {
  removeReplyFromCache,
  ReplyListCache,
  updateReplyInCache,
} from './cache'
import { commentKeys, replyKeys } from './key'
import { createReply, deleteReply, updateReply } from './replies.clients'

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()
  const replyListKey = replyKeys.list(parentId)
  const commentListKey = commentKeys.list(postId)
  const postDetailKey = ['postDetail', String(postId)] as const

  const createReplyMutation = useMutation({
    mutationFn: createReply,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: replyListKey })
      await queryClient.invalidateQueries({ queryKey: commentListKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('답글이 작성되었습니다')
    },
  })

  const updateReplyMutation = useMutation({
    mutationFn: updateReply,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      if (previousReplies) {
        queryClient.setQueryData<ReplyListCache>(replyListKey, (old) =>
          updateReplyInCache(old, variables.commentId, variables.content),
        )
      }
      return { previousReplies }
    },
    onError: (err, variables, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData<ReplyListCache>(
          replyListKey,
          context.previousReplies,
        )
      }
      toast.error('답글 수정에 실패했습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyListKey })
    },
  })

  const removeReplyMutation = useMutation({
    mutationFn: deleteReply,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      if (previousReplies) {
        queryClient.setQueryData<ReplyListCache>(replyListKey, (old) =>
          removeReplyFromCache(old, variables.commentId),
        )
      }
      return { previousReplies }
    },
    onError: (err, variables, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData<ReplyListCache>(
          replyListKey,
          context.previousReplies,
        )
      }
      toast.error('답글 삭제에 실패했습니다.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyListKey })
      queryClient.invalidateQueries({ queryKey: commentListKey })
      queryClient.invalidateQueries({ queryKey: postDetailKey })
    },
  })

  return { createReplyMutation, updateReplyMutation, removeReplyMutation }
}
