import { PostCreatePayload, PostParams } from '@/types/post/post.type'

import { axios } from '../common'

export const fetchPosts = async (params: PostParams) => {
  return await axios.get('/v1/posts', {
    params: {
      ...params,
      size: params.size ?? 20,
    },
  })
}
export const fetchPostsDetail = async (postId: string) => {
  const { data } = await axios.get(`/v1/posts/${postId}`)
  return data.data
}
export const createPost = async (payload: PostCreatePayload) => {
  const { data } = await axios.post(`/v1/posts`, payload)
  return data.data
}

export const updatePost = async (
  postId: string,
  payload: PostCreatePayload,
) => {
  const { data } = await axios.patch(`/v1/posts/${postId}`, payload)
  return data.data
}
export const deletePost = async (postId: string) => {
  const { data } = await axios.delete(`/v1/posts/${postId}`)
  return data.data
}
export const addBookmark = async (postId: string) => {
  const { data } = await axios.post(`/v1/posts/${postId}/bookmark`)
  return data.data
}
export const removeBookmark = async (postId: string) => {
  const { data } = await axios.delete(`/v1/posts/${postId}/bookmark`)
  return data.data
}
