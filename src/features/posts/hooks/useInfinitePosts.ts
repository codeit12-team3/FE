import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPosts } from '@/features/posts/api'
import { PostFilterParams } from '@/features/posts/types'

export const useInfinitePosts = (filters: PostFilterParams) => {
  return useInfiniteQuery({
    queryKey: ['posts', filters],

    queryFn: ({ pageParam }: { pageParam?: string }) =>
      fetchPosts({
        ...filters,
        lastPostId: pageParam,
        size: 20,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      if (!lastPage.success || lastPage.data.isLast) return undefined
      const lastPost = lastPage.data.content.at(-1)
      return lastPost ? String(lastPost.postId) : undefined
    },
  })
}
