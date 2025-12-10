import { CommentType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchComments = async (params: {
  postId: string
}): Promise<ApiResponse<CommentType[]>> => {
  const { postId } = params

  const { data } = await axios.get<ApiResponse<CommentType[]>>(
    `/v1/posts/${postId}/comments`,
  )

  return data
}

export const createComment = async (params: {
  postId: string
  parentId: number | null
  content: string
}): Promise<ApiResponse<{ commentId: number }>> => {
  const { postId, parentId, content } = params

  const { data } = await axios.post<ApiResponse<{ commentId: number }>>(
    `/v1/posts/${postId}/comments`,
    { parentId, content },
  )

  return data
}

export const updateComment = async (params: {
  commentId: number
  content: string
}): Promise<ApiResponse<{ updated: true }>> => {
  const { commentId, content } = params

  const { data } = await axios.patch<ApiResponse<{ updated: true }>>(
    `/v1/comments/${commentId}`,
    { content },
  )

  return data
}

export const deleteComment = async (params: {
  commentId: number
}): Promise<ApiResponse<{ deleted: true }>> => {
  const { commentId } = params

  const { data } = await axios.delete<ApiResponse<{ deleted: true }>>(
    `/v1/comments/${commentId}`,
  )

  return data
}
