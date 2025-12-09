import { useMutation } from '@tanstack/react-query'

import { SigninEmailReq, SignupEmailReq } from '@/types/auth'

import {
  checkEmailCode,
  sendEmailCode,
  signinEmail,
  signupEmail,
} from './auth.clients'

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: (email: string) => sendEmailCode(email),
    retry: false,
  })
}

export const useCheckEmailCode = () => {
  return useMutation({
    mutationFn: (body: { email: string; code: string }) => checkEmailCode(body),
    retry: false,
  })
}

export const useSignupEmail = () => {
  return useMutation({
    mutationFn: (body: SignupEmailReq) => signupEmail(body),
    retry: false,
  })
}

export const useSigninEmail = () => {
  return useMutation({
    mutationFn: (body: SigninEmailReq) => {
      // TODO: NextAuth 로직 완성 후 signin Callback 로직으로 변경
      return signinEmail(body)
    },
    retry: false,
  })
}
