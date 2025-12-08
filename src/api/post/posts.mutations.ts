import { useQuery } from '@tanstack/react-query'

import { fetchPosts, fetchPostsDetail, PostParams } from './posts.clients'

export const usePosts = (params: PostParams) => {
  return useQuery({
    queryKey: ['post', params],
    queryFn: () => fetchPosts(params),
  })
}
export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: ['postdetail', postId],
    queryFn: () => fetchPostsDetail(postId),
  })
}
