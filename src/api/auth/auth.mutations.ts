import { useMutation } from '@tanstack/react-query'

import { SignupEmailReq } from '@/types/auth'

import { checkEmailCode, sendEmailCode, signupEmail } from './auth.clients'

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: (email: string) => sendEmailCode(email),
    retry: 0,
  })
}

export const useCheckEmailCode = () => {
  return useMutation({
    mutationFn: (body: { email: string; code: string }) => checkEmailCode(body),
    retry: 0,
  })
}

export const useSignupEmail = () => {
  return useMutation({
    mutationFn: (body: SignupEmailReq) => signupEmail(body),
    retry: 0,
  })
}
