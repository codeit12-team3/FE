import { axios } from '../common'

export const fetchComments = async (params: { postId: string }) => {
  const { postId } = params
  return axios.get(`/v1/posts/${postId}/comments`)
}

export const createComment = async (params: {
  postId: string
  parentId: number | null
  content: string
}) => {
  const { postId, parentId, content } = params
  return axios.post(`/v1/posts/${postId}/comments`, {
    parentId,
    content,
  })
}

export const updateComment = async (params: {
  commentId: number
  content: string
}) => {
  const { commentId, content } = params
  return axios.patch(`/v1/comments/${commentId}`, {
    content,
  })
}

export const deleteComment = async (params: { commentId: number }) => {
  const { commentId } = params
  return axios.delete(`/v1/comments/${commentId}`)
}
