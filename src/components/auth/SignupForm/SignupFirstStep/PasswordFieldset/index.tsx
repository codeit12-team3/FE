'use client'

import { ComponentProps } from 'react'

import { AnimateFieldset } from '@/components/auth/form'
import { FormInput } from '@/components/form'

type Props = ComponentProps<typeof AnimateFieldset>

export default function PasswordFieldset(props: Props) {
  return (
    <AnimateFieldset {...props}>
      <legend className="sr-only">비밀번호 입력 및 확인</legend>
      <FormInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="new-password"
        required
      />
      <FormInput
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="new-password"
        required
      />
    </AnimateFieldset>
  )
}
