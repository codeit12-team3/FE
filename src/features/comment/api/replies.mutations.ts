import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/common'

import { commentKeys } from './key/comments.keys'
import { replyKeys } from './key/replies.keys'
import { createReply, deleteReply, updateReply } from './replies.clients'

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()

  const createReplyMutation = useMutation({
    mutationFn: createReply,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
      // 부모 댓글의 replyCount 업데이트를 위함
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('답글이 작성되었습니다')
    },
  })

  const updateReplyMutation = useMutation({
    mutationFn: updateReply,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
      toast.success('답글이 수정되었습니다')
    },
  })

  const removeReplyMutation = useMutation({
    mutationFn: deleteReply,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(parentId) })
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('답글이 삭제되었습니다')
    },
  })

  return { createReplyMutation, updateReplyMutation, removeReplyMutation }
}
