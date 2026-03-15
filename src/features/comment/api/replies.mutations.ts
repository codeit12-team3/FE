import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { toast } from '@/components/common'
import { useCommentStore } from '@/features/comment/stores'
import { GetRepliesResponse } from '@/features/comment/types'
import { ApiResponse } from '@/types/common'

import { commentKeys, replyKeys } from './queryKeys'
import { createReply, deleteReply, updateReply } from './replies.http'

type ReplyListCache = InfiniteData<ApiResponse<GetRepliesResponse>>

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()
  const replyListKey = replyKeys.list(parentId)
  const commentListKey = commentKeys.list(postId)
  const postDetailKey = ['postDetail', String(postId)] as const

  const updateContent = useCommentStore((state) => state.updateContent)
  const removeCommentEntity = useCommentStore(
    (state) => state.removeCommentEntity,
  )

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
    onSuccess: () => {
      toast.success('답글이 수정되었습니다.')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      updateContent(variables.commentId, variables.content)

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commentListKey })
      await queryClient.invalidateQueries({ queryKey: postDetailKey })
      toast.success('답글이 삭제되었습니다.')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: replyListKey })
      const previousReplies =
        queryClient.getQueryData<ReplyListCache>(replyListKey)

      removeCommentEntity(variables.commentId, parentId)

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
    },
  })

  return { createReplyMutation, updateReplyMutation, removeReplyMutation }
}
