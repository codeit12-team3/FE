import { axios } from '../common'

export interface PostParams {
  region?: string
  date?: string
  age?: number
  ageType?: 'OLDER' | 'YOUNGER'
  gender?: 'MALE' | 'FEMALE' | 'ALL'
  keyword?: string
  size?: number
  isLast?: boolean
}

export const fetchPosts = async (params: PostParams) => {
  return await axios.get('/v1/posts', {
    params: {
      ...params,
      size: params.size ?? 20,
    },
  })
}
export const fetchPostsDetail = async (postId: number) => {
  const { data } = await axios.get(`/v1/posts/${postId}`)
  return data.data
}
export const createPost = async () => {
  return await axios.post('/v1/posts')
}
export const updatePost = async (postId: number) => {
  return await axios.patch(`/v1/posts${postId}`)
}
export const deletePost = async (postId: number) => {
  return await axios.delete(`//v1/posts/${postId}`)
}
export const addBookmark = async (postId: number) => {
  return await axios.post(`/v1/posts/${postId}/bookmark`)
}
export const removeBookmark = async (postId: number) => {
  return await axios.delete(`/v1/posts/${postId}/bookmark`)
}
