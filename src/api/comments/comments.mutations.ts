// queries/comments/comments.mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createComment, deleteComment, updateComment } from './comments.clients'
import { commentKeys } from './comments.keys'

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('댓글이 작성되었습니다')
    },
    onError: (error) => {
      const message = error?.message || '댓글 작성에 실패했습니다'
      toast.error(message)
    },
  })

  const update = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
    onError: (error) => {
      const message = error?.message || '댓글 수정에 실패했습니다'
      toast.error(message)
    },
  })

  const remove = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      toast.success('댓글이 삭제되었습니다')
    },
    onError: (error) => {
      const message = error?.message || '댓글 삭제에 실패했습니다'
      toast.error(message)
    },
  })

  return { create, update, remove }
}
