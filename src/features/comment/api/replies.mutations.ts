import { useMutation, useQueryClient } from '@tanstack/react-query'

import { commentKeys } from './key/comments.keys'
import { replyKeys } from './key/replies.keys'
import { createReply, deleteReply, updateReply } from './replies.clients'

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
      // 부모 댓글의 replyCount 업데이트를 위함
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })

  const update = useMutation({
    mutationFn: updateReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
    },
  })

  const remove = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })

  return { create, update, remove }
}
