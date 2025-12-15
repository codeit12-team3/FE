import { useMutation, useQuery } from '@tanstack/react-query'

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

export const usePosts = (params: PostParams) => {
  return useQuery<ApiResponse<FetchPostsResponse>>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
  })
}
export const usePostDetail = ({
  postId,
  initialData,
}: {
  postId: string
  initialData: ApiResponse<PostContent>
}) => {
  return useQuery({
    queryKey: ['postdetail', postId],
    queryFn: () => fetchPostsDetail(postId),
    initialData: initialData,
    select: (response) => {
      if (!response.success) {
        throw new Error(response.data.message)
      }
      return response.data
    },
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
