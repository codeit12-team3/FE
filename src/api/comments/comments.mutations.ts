import { useMutation, useQuery } from '@tanstack/react-query'

import { CommentType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from './comments.clients'

export const useComments = (params: { postId: string }) => {
  return useQuery<ApiResponse<CommentType[]>>({
    queryKey: ['comments', params.postId],
    queryFn: () => fetchComments(params),
  })
}

export const useCreateComment = () => {
  return useMutation<
    ApiResponse<{ commentId: number }>,
    Error,
    { postId: string; parentId: number | null; content: string }
  >({
    mutationFn: (params) => createComment(params),
    retry: 0,
  })
}

export const useUpdateComment = () => {
  return useMutation<
    ApiResponse<{ updated: true }>,
    Error,
    { commentId: number; content: string }
  >({
    mutationFn: (params) => updateComment(params),
    retry: 0,
  })
}

export const useDeleteComment = () => {
  return useMutation<
    ApiResponse<{ deleted: true }>,
    Error,
    { commentId: number }
  >({
    mutationFn: (params) => deleteComment(params),
    retry: 0,
  })
}
