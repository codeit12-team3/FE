'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useSigninEmail, useSignupEmail } from '@/api/auth'
import {
  useEmailVerification,
  useFormStep,
  useNicknameVerification,
} from '@/hooks/auth'
import { SignupEmailReq, SignupFormValues, signupSchema } from '@/types/auth'

import SignupFirstStep from './SignupFirstStep'
import SignupSecondStep from './SignupSecondStep'

export default function SignupForm() {
  const router = useRouter()
  const { step, next, prev } = useFormStep({ maxStep: 2 })
  const { mutate: signupMutate, isPending: isSignup } = useSignupEmail()
  const { mutate: signinMutate, isPending: isSignin } = useSigninEmail()
  const emailVerification = useEmailVerification()
  const nicknameVerification = useNicknameVerification()

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      emailCode: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      year: '',
      month: '',
      day: '',
      gender: undefined,
      mbti: undefined,
    },
  })

  const onSubmit = (data: SignupFormValues) => {
    if (!emailVerification.isChecked || !nicknameVerification.isChecked) return

    const formattedData: SignupEmailReq = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      birth: `${data.year}-${data.month.padStart(2, '0')}-${data.day.padStart(2, '0')}`,
      gender: data.gender!,
      mbti: data.mbti!,
    }

    signupMutate(formattedData, {
      onSuccess: () => {
        toast.success('회원가입 완료')

        signinMutate(
          {
            email: data.email,
            password: data.password,
          },
          {
            onSuccess: () => {
              toast.success('로그인 되었습니다')
              router.replace('/')
            },
          },
        )
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && (
          <SignupFirstStep
            emailVerification={emailVerification}
            onNext={next}
          />
        )}
        {step === 2 && (
          <SignupSecondStep
            onPrev={prev}
            emailVerification={emailVerification}
            nicknameVerification={nicknameVerification}
            isPending={isSignup || isSignin}
          />
        )}
      </form>
    </FormProvider>
  )
}
