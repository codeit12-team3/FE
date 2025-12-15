import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'

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
export const usePostDetail = ({ postId }: { postId: string }) =>
  useQuery<PostContent>({
    queryKey: ['postDetail', postId],
    queryFn: async () => {
      const res = await fetchPostsDetail(postId)

      if (!res.success) {
        throw new Error('게시글 조회 실패')
      }

      return res.data
    },
  })

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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => addBookmark(postId),
    retry: 0,
    onSuccess: (_, postId) => {
      queryClient.setQueryData<ApiResponse<PostContent>>(
        ['postDetail', postId],
        (old) => {
          if (!old || !old.success) return old
          return {
            success: true,
            status: old.status,
            timestamp: old.timestamp,
            data: {
              ...old.data,
              isBookmarked: true,
            },
          }
        },
      )
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => removeBookmark(postId),
    retry: 0,
    onSuccess: (_, postId) => {
      queryClient.setQueryData<ApiResponse<PostContent>>(
        ['postDetail', postId],
        (old) => {
          if (!old || !old.success) return old
          return {
            success: true,
            status: old.status,
            timestamp: old.timestamp,
            data: {
              ...old.data,
              isBookmarked: false,
            },
          }
        },
      )
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
