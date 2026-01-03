import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { STALE_TIME } from '@/constants/common'
import { GetBookmarkedPostsReq, GetMyPostsReq } from '@/types/member'

import {
  getBookmarkedPosts,
  getMyPosts,
  getMyProfile,
  getOtherProfile,
} from './member.clients'

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: getMyProfile,
    staleTime: STALE_TIME.MINUTE * 5,
    retry: false,
  })
}

export const useGetOtherProfile = (memberId: string | undefined) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getOtherProfile(memberId!),
    staleTime: STALE_TIME.MINUTE * 5,
    retry: false,
    enabled: !!memberId,
  })
}

export const useInfiniteGetBookmarkedPosts = (
  filters: Omit<GetBookmarkedPostsReq, 'lastPostId' | 'size'>,
) => {
  return useInfiniteQuery({
    queryKey: ['bookmarkedPosts', filters],
    queryFn: ({ pageParam }) =>
      getBookmarkedPosts({
        ...filters,
        lastPostId: pageParam,
        size: 5,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) {
        return undefined
      }
      const lastPost = lastPage.content[lastPage.content.length - 1]
      return lastPost?.postId.toString()
    },
  })
}

export const useInfiniteGetMyPosts = (
  filters: Omit<GetMyPostsReq, 'lastPostId' | 'size'>,
) => {
  return useInfiniteQuery({
    queryKey: ['myPosts', filters],
    queryFn: ({ pageParam }) =>
      getMyPosts({
        ...filters,
        lastPostId: pageParam,
        size: 5,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) {
        return undefined
      }
      const lastPost = lastPage.content[lastPage.content.length - 1]
      return lastPost?.postId.toString()
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  })
}
