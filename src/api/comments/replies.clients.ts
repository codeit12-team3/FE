import { ReplyType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchReplies = async (params: {
  postId: number
  parentId: number
  lastReplyId: number
  size?: number
}): Promise<ApiResponse<ReplyType>> => {
  const { postId, parentId, lastReplyId, size } = params

  const { data } = await axios.get<ApiResponse<ReplyType>>(
    `/v1/comments/${postId}/replies`,
    {
      params: {
        parentId,
        lastReplyId,
        size,
      },
    },
  )

  return data
}

export const createReply = async (params: {
  postId: string
  parentId: number | null
  content: string
}): Promise<ApiResponse<{ commentId: number }>> => {
  const { postId, parentId, content } = params

  const { data } = await axios.post<ApiResponse<{ commentId: number }>>(
    `/v1/comments/${postId}/replies`,
    { parentId, content },
  )

  return data
}

export const updateReply = async (params: {
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

export const deleteReply = async (params: {
  commentId: number
}): Promise<ApiResponse<{ deleted: true }>> => {
  const { commentId } = params

  const { data } = await axios.delete<ApiResponse<{ deleted: true }>>(
    `/v1/comments/${commentId}`,
  )

  return data
}
