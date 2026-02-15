import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/common'

import { createComment, deleteComment, updateComment } from './comments.clients'
import { commentKeys } from './key/comments.keys'

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('댓글이 작성되었습니다')
    },
  })

  const update = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })

  const remove = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('댓글이 삭제되었습니다')
    },
  })

  return { create, update, remove }
}
