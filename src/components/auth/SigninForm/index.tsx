'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useSigninEmail } from '@/api/auth'
import { Button } from '@/components/common'
import { SigninFormValues, signinSchema } from '@/types/auth'

import AnimateFieldset from '../AnimateFieldset'
import FormInput from '../FormInput'

export default function SigninForm() {
  const router = useRouter()
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
    // TODO: NextAuth 로직 완성 후 작성
    mutate(data, {
      onSuccess: () => {
        toast.success('로그인 되었습니다')

        router.push('/')
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
            <FormInput
              name="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
            />
          </AnimateFieldset>
          <Button
            disabled={!formState.isValid}
            className="w-full"
            type="submit"
            size={'lg'}
          >
            {isPending ? <Loader className="size-7 animate-spin" /> : '로그인'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
