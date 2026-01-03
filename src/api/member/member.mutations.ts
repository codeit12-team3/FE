import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateMyProfileReq } from '@/types/member'

import { removeBookmark } from '../posts'
import { checkNickname, updateMyProfile } from './member.clients'

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    retry: false,
  })
}

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateMyProfileReq) => updateMyProfile(data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member', 'me'] })
    },
  })
}

export const useRemoveBookmarkInMyPage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => removeBookmark(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkedPosts'] })
    },
  })
}
