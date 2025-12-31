import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateMyProfileReq } from '@/types/member'

import { removeBookmark } from '../posts'
import { checkNickname, updateMyProfile } from './member.clients'

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    retry: 0,
  })
}

export const useUpdateMyProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateMyProfileReq) => updateMyProfile(data),
    retry: false,
  })
}

export const useRemoveBookmarkInMyPage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => removeBookmark(postId), // 👈 그대로 사용
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkedPosts'] })
    },
  })
}
