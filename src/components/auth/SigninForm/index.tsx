'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { useSigninEmail } from '@/api/auth'
import { toast } from '@/components/common'
import { FormInput } from '@/components/form'
import { Button } from '@/components/ui'
import { SigninFormValues, signinSchema } from '@/types/auth'

import { AnimateFieldset } from '../form'

export default function SigninForm() {
  const searchParams = useSearchParams()
  const unsafeCallbackUrl = searchParams.get('callbackUrl')
  const callbackUrl =
    unsafeCallbackUrl && unsafeCallbackUrl.startsWith('/')
      ? unsafeCallbackUrl
      : '/'

  const { mutate, isPending } = useSigninEmail()
  const methods = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { formState } = methods

  const onSubmit = async (data: SigninFormValues) => {
    if (isPending || !formState.isValid) return
    mutate(data, {
      onSuccess: () => {
        toast.success('로그인 되었습니다')

        window.location.href = callbackUrl
      },
      onError: () => {
        toast.error('이메일 또는 비밀번호를 확인해주세요')
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-[11px]">
          <AnimateFieldset>
            <FormInput
              type="email"
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              autoComplete="username"
            />
          </AnimateFieldset>
          <AnimateFieldset>
            <FormInput
              name="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
            />
          </AnimateFieldset>
          <Button
            disabled={!formState.isValid || isPending}
            className="w-full"
            type="submit"
            size={'md'}
          >
            {isPending ? <Loader className="size-7 animate-spin" /> : '로그인'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
