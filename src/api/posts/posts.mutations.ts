import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'

import { toast } from '@/components/common/Toast'
import { ApiResponse } from '@/types/common'
import {
  FetchMyPosts,
  FetchPostsResponse,
  PostContent,
  PostCreatePayload,
  PostParams,
  PostUpdatePayload,
  RecruitStatus,
} from '@/types/posts'

import {
  addBookmark,
  createPost,
  deletePost,
  fetchMyBookmarkPosts,
  fetchMyPosts,
  fetchPosts,
  fetchPostsDetail,
  patchPost,
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
    meta: { ignoreGlobalError: true },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: () => {
      toast.error('게시글 상태 변경에 실패했습니다.')
    },
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PostCreatePayload) => createPost(payload),
    retry: 0,
    meta: { ignoreGlobalError: true },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
      toast.success('게시글이 등록되었습니다.')
    },
    onError: () => {
      toast.error('게시글 등록에 실패했습니다.')
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, payload }: UpdateArgs) =>
      updatePost(postId, payload),
    retry: 0,
    meta: { ignoreGlobalError: true },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
      queryClient.invalidateQueries({
        queryKey: ['postDetail', postId],
      })
      toast.success('게시글이 수정되었습니다.')
    },
    onError: () => {
      toast.error('게시글 수정에 실패했습니다.')
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    retry: 0,
    meta: { ignoreGlobalError: true },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
      toast.success('게시글이 삭제 되었습니다.')
    },
    onError: () => {
      toast.error('게시글 삭제에 실패했습니다.')
    },
  })
}

export const useAddBookmark = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => addBookmark(postId),
    retry: 0,
    meta: { ignoreGlobalError: true },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['bookmarkedPosts'] })
    },
    onError: () => {
      toast.error('북마크 추가에 실패했습니다.')
    },
  })
}
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => removeBookmark(postId),
    retry: 0,
    meta: { ignoreGlobalError: true },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: () => {
      toast.error('북마크 제거에 실패했습니다.')
    },
  })
}
export const useMyPosts = () => {
  return useQuery<ApiResponse<FetchMyPosts>>({
    queryKey: ['myPosts'],
    queryFn: () => fetchMyPosts(),
  })
}

export const useMyBookmarkPosts = () => {
  return useQuery<ApiResponse<FetchPostsResponse>>({
    queryKey: ['myBookmarkPosts'],
    queryFn: () => fetchMyBookmarkPosts(),
  })
}
