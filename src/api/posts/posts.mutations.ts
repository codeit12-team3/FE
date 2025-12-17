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
  PostUpdatePayload,
} from '@/types/posts'

import {
  addBookmark,
  createPost,
  deletePost,
  fetchPosts,
  fetchPostsDetail,
  patchPost,
  RecruitStatus,
  removeBookmark,
  updatePost,
} from './posts.clients'

interface UpdateArgs {
  postId: string
  payload: PostUpdatePayload
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
  useQuery<ApiResponse<PostContent>>({
    queryKey: ['postDetail', postId],
    queryFn: async () => {
      return await fetchPostsDetail(postId)
    },
  })
export const usePatchPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      recruitStatus,
    }: {
      postId: string
      recruitStatus: RecruitStatus
    }) => patchPost(postId, recruitStatus),

    onSuccess: (_, { postId, recruitStatus }) => {
      queryClient.setQueryData<ApiResponse<PostContent>>(
        ['postDetail', postId],
        (old) => {
          if (!old || !old.success) return old
          return {
            ...old,
            data: {
              ...old.data,
              recruitStatus,
            },
          }
        },
      )
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PostCreatePayload) => createPost(payload),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, payload }: UpdateArgs) =>
      updatePost(postId, payload),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
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
