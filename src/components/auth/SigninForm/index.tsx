'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/common'
import { SigninFormValues, signinSchema } from '@/types/auth'

import AnimateFieldset from '../AnimateFieldset'
import FormInput from '../FormInput'

export default function SigninForm() {
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
    console.log(data)
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
            />
            <FormInput
              name="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
            />
          </AnimateFieldset>
          <Button
            disabled={!formState.isValid}
            className="w-full"
            type="submit"
            size={'lg'}
          >
            {false ? <Loader className="size-7" /> : '회원가입'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
