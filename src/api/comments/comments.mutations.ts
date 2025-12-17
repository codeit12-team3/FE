import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createComment, deleteComment, updateComment } from './comments.clients'

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const update = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const remove = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  return { create, update, remove }
}
