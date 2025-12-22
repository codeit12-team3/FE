import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createReply, deleteReply, updateReply } from './replies.clients'

export const useReplyMutations = (postId: number, parentId: number) => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
      // 부모 댓글의 replyCount 업데이트를 위함
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
    onError: (error) => {
      const message = error?.message || '답글 작성에 실패했습니다'
      toast.error(message)
    },
  })

  const update = useMutation({
    mutationFn: updateReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
    },
    onError: (error) => {
      const message = error?.message || '답글 수정에 실패했습니다'
      toast.error(message)
    },
  })

  const remove = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', parentId] })
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
    onError: (error) => {
      const message = error?.message || '답글 삭제에 실패했습니다'
      toast.error(message)
    },
  })

  return { create, update, remove }
}
