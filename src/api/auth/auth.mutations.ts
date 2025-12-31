import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

import { SigninEmailReq, SignupEmailReq } from '@/types/auth'

import { checkEmailCode, sendEmailCode, signupEmail } from './auth.clients'

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
    mutationFn: async (body: SigninEmailReq) => {
      const res = await signIn('credentials', {
        email: body.email,
        password: body.password,
        redirect: false,
      })

      if (res.error) {
        throw new Error(res.error)
      }
    },
    retry: false,
    meta: {
      ignoreGlobalError: true,
    },
  })
}
