import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPosts } from '@/api/posts'
import { PostFilterParams } from '@/types/posts'

export const useInfinitePosts = (filters: PostFilterParams) => {
  return useInfiniteQuery({
    queryKey: ['posts', filters],

    queryFn: ({ pageParam }: { pageParam?: string }) =>
      fetchPosts({
        ...filters,
        lastItemId: pageParam,
        size: 20,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      if (!lastPage.success) return undefined
      return String(lastPage.data.content.at(-1)?.postId)
    },
  })
}
