import { axios } from '@/api/common'
import {
  FetchMyPosts,
  FetchPostsResponse,
  PostContent,
  PostCreatePayload,
  PostParams,
  PostUpdatePayload,
  RecruitStatus,
} from '@/features/posts/types'
import { ApiResponse } from '@/types/common'

export const fetchPosts = async (
  params: PostParams,
): Promise<ApiResponse<FetchPostsResponse>> => {
  const { data } = await axios.get<ApiResponse<FetchPostsResponse>>(
    '/v1/posts',
    { params },
  )

  return data
}

export const fetchPostsDetail = async (
  postId: string,
): Promise<ApiResponse<PostContent>> => {
  const { data } = await axios.get<ApiResponse<PostContent>>(
    `/v1/posts/${postId}`,
  )

  return data
}
export const patchPost = async (
  postId: string,
  recruitStatus: RecruitStatus,
): Promise<ApiResponse<PostContent>> => {
  const { data } = await axios.patch<ApiResponse<PostContent>>(
    `/v1/posts/${postId}/status`,
    {
      status: recruitStatus,
    },
  )
  return data
}

export const createPost = async (
  payload: PostCreatePayload,
): Promise<ApiResponse<{ postId: string }>> => {
  const { data } = await axios.post<ApiResponse<{ postId: string }>>(
    '/v1/posts',
    payload,
  )

  return data
}

export const updatePost = async (
  postId: string,
  payload: PostUpdatePayload,
): Promise<ApiResponse<{ postId: string }>> => {
  const { data } = await axios.patch<ApiResponse<{ postId: string }>>(
    `/v1/posts/${postId}`,
    payload,
  )

  return data
}

export const deletePost = async (
  postId: string,
): Promise<ApiResponse<{ success: true }>> => {
  const { data } = await axios.delete<ApiResponse<{ success: true }>>(
    `/v1/posts/${postId}`,
  )

  return data
}

export const addBookmark = async (
  postId: string,
): Promise<ApiResponse<{ bookmarked: boolean }>> => {
  const { data } = await axios.post<ApiResponse<{ bookmarked: boolean }>>(
    `/v1/posts/${postId}/bookmark`,
  )

  return data
}

export const removeBookmark = async (
  postId: string,
): Promise<ApiResponse<{ bookmarked: boolean }>> => {
  const { data } = await axios.delete<ApiResponse<{ bookmarked: boolean }>>(
    `/v1/posts/${postId}/bookmark`,
  )

  return data
}
export const fetchMyPosts = async (): Promise<ApiResponse<FetchMyPosts>> => {
  const { data } = await axios.get<ApiResponse<FetchMyPosts>>(`v1/posts/me`)
  return data
}
export const fetchMyBookmarkPosts = async (): Promise<
  ApiResponse<FetchPostsResponse>
> => {
  const { data } =
    await axios.get<ApiResponse<FetchPostsResponse>>(`v1/posts/bookmark`)
  return data
}
