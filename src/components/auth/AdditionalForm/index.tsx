'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { useOAuthGoogleSignup } from '@/api/auth'
import { toast } from '@/components/common'
import { Button } from '@/components/ui'
import { useNicknameVerification } from '@/hooks/auth'
import {
  AdditionalFormValues,
  additionalSchema,
  OAuthGoogleSignupReq,
} from '@/types/auth'

import BirthFieldset from './BirthFieldset'
import EmailFieldset from './EmailFieldset'
import GenderFieldset from './GenderFieldset'
import MBTIFieldset from './MBTIFieldset'
import NicknameFieldset from './NicknameFieldset'

interface Props {
  initialEmail: string
}

export default function AdditionalForm({ initialEmail }: Props) {
  const router = useRouter()

  const methods = useForm<AdditionalFormValues>({
    resolver: zodResolver(additionalSchema),
    mode: 'onChange',
    defaultValues: {
      email: initialEmail,
      nickname: '',
      birth: '',
      gender: undefined,
      mbti: undefined,
    },
  })

  const { mutate, isPending } = useOAuthGoogleSignup()
  const nicknameVerification = useNicknameVerification()

  const onSubmit = (data: AdditionalFormValues) => {
    if (!nicknameVerification.isChecked) return

    const formattedData: OAuthGoogleSignupReq = {
      email: data.email,
      nickname: data.nickname,
      birth: data.birth,
      gender: data.gender!,
      mbti: data.mbti!,
    }

    mutate(formattedData, {
      onSuccess: async (res) => {
        const loginResult = await signIn('credentials', {
          userJson: JSON.stringify(res),
          redirect: false,
        })

        if (loginResult.error) {
          toast.error('로그인 처리중 실패했습니다.')
          router.replace('/signin')
        }

        toast.success('로그인 되었습니다')

        router.push('/')
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <section className="space-y-4">
            <EmailFieldset idx={0} />
            <NicknameFieldset idx={1} verification={nicknameVerification} />
            <BirthFieldset idx={2} />
            <MBTIFieldset idx={3} />
            <GenderFieldset idx={4} />
          </section>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            disabled={
              isPending ||
              !nicknameVerification.isChecked ||
              !methods.formState.isValid
            }
            className="flex-1"
            type="submit"
            size={'md'}
          >
            {isPending ? (
              <Loader className="size-7 animate-spin" />
            ) : (
              '회원가입'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
