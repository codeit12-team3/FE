import { axios } from '@/api/common'
import { ApiResponse } from '@/types/common'

import { CommentType } from '../types'

export const fetchComments = async (params: {
  postId: number
  lastCommentId?: number
  size?: number
}): Promise<ApiResponse<CommentType>> => {
  const { data } = await axios.get<ApiResponse<CommentType>>(
    `/v1/posts/${params.postId}/comments`,
    {
      params: {
        lastCommentId: params.lastCommentId,
        size: params.size,
      },
    },
  )
  return data
}

export const createComment = async (params: {
  postId: number
  content: string
}): Promise<ApiResponse<{ commentId: number }>> => {
  const { postId, content } = params
  const { data } = await axios.post<ApiResponse<{ commentId: number }>>(
    `/v1/posts/${postId}/comments`,
    { content },
  )
  return data
}

export const updateComment = async (params: {
  commentId: number
  content: string
}): Promise<ApiResponse<{ updated: true }>> => {
  const { data } = await axios.patch<ApiResponse<{ updated: true }>>(
    `/v1/comments/${params.commentId}`,
    { content: params.content },
  )
  return data
}

export const deleteComment = async (params: {
  commentId: number
}): Promise<ApiResponse<{ deleted: true }>> => {
  const { data } = await axios.delete<ApiResponse<{ deleted: true }>>(
    `/v1/comments/${params.commentId}`,
  )
  return data
}
