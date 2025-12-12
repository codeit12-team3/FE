import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ApiResponse } from '@/types/common'
import {
  FetchPostsResponse,
  PostContent,
  PostCreatePayload,
  PostParams,
} from '@/types/posts'

import {
  addBookmark,
  createPost,
  deletePost,
  fetchPosts,
  fetchPostsDetail,
  removeBookmark,
  updatePost,
} from './posts.clients'

interface UpdateArgs {
  postId: string
  payload: PostCreatePayload
}

export const usePosts = (
  params: PostParams,
  options?: UseQueryOptions<ApiResponse<FetchPostsResponse>>,
) => {
  return useQuery<ApiResponse<FetchPostsResponse>>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    ...options,
  })
}

export const usePostDetail = (postId: string) => {
  return useQuery<ApiResponse<PostContent>>({
    queryKey: ['postdetail', postId],
    queryFn: () => fetchPostsDetail(postId),
  })
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: PostCreatePayload) => createPost(payload),
    retry: 0,
  })
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({ postId, payload }: UpdateArgs) =>
      updatePost(postId, payload),
    retry: 0,
  })
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    retry: 0,
  })
}

export const useAddBookmark = () => {
  return useMutation({
    mutationFn: (postId: string) => addBookmark(postId),
    retry: 0,
  })
}

export const useRemoveBookmark = () => {
  return useMutation({
    mutationFn: (postId: string) => removeBookmark(postId),
    retry: 0,
  })
}
