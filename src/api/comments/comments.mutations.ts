import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from './comments.clients'

export const useComments = (params: { postId: string }) => {
  return useQuery({
    queryKey: ['comments', params.postId],
    queryFn: () => fetchComments(params),
  })
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (params: {
      postId: string
      parentId: number | null
      content: string
    }) => createComment(params),
    retry: 0,
  })
}

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: (params: { commentId: number; content: string }) =>
      updateComment(params),
    retry: 0,
  })
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (params: { commentId: number }) => deleteComment(params),
    retry: 0,
  })
}
