// api/comments/replies.clients.ts
import { ReplyType } from '@/types/comments/comments.type'
import { ApiResponse } from '@/types/common'

import { axios } from '../common'

export const fetchReplies = async (params: {
  commentId: number
  lastReplyId?: number
  size?: number
}): Promise<ApiResponse<ReplyType>> => {
  const { data } = await axios.get<ApiResponse<ReplyType>>(
    `/v1/comments/${params.commentId}/replies`,
    {
      params: {
        lastReplyId: params.lastReplyId,
        size: params.size,
      },
    },
  )
  return data
}

export const createReply = async (params: {
  postId: number
  parentId: number
  content: string
}): Promise<ApiResponse<{ commentId: number }>> => {
  const { postId, parentId, content } = params
  const { data } = await axios.post<ApiResponse<{ commentId: number }>>(
    `/v1/posts/${postId}/comments`,
    { content, parentId },
  )
  return data
}

export const updateReply = async (params: {
  commentId: number
  content: string
}): Promise<ApiResponse<{ updated: true }>> => {
  const { data } = await axios.patch<ApiResponse<{ updated: true }>>(
    `/v1/comments/${params.commentId}`,
    { content: params.content },
  )
  return data
}

export const deleteReply = async (params: {
  commentId: number
}): Promise<ApiResponse<{ deleted: true }>> => {
  const { data } = await axios.delete<ApiResponse<{ deleted: true }>>(
    `/v1/comments/${params.commentId}`,
  )
  return data
}
