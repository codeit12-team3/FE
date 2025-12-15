import { useMutation } from '@tanstack/react-query'

import { UpdateMyProfileReq } from '@/types/member'

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
