import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/components/common'

import { createComment, deleteComment, updateComment } from './comments.clients'
import { commentKeys } from './key/comments.keys'

export const useCommentMutations = (postId: number) => {
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentKeys.list(postId),
      })
      toast.success('댓글이 작성되었습니다')
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentKeys.list(postId),
      })
      toast.success('댓글이 수정되었습니다')
    },
  })

  const removeCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentKeys.list(postId),
      })
      toast.success('댓글이 삭제되었습니다')
    },
  })

  return { createCommentMutation, updateCommentMutation, removeCommentMutation }
}
