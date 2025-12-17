import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createReply, deleteReply, updateReply } from './replies.clients'

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
      // 부모 댓글의 replyCount 업데이트를 위해
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const update = useMutation({
    mutationFn: updateReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
    },
  })

  const remove = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  return { create, update, remove }
}
