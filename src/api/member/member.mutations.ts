import { useMutation } from '@tanstack/react-query'

import { checkNickname } from './member.clients'

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    retry: 0,
  })
}
