import { ComponentProps } from 'react'

import { FormInput } from '@/components/form'

import { AnimateFieldset } from '../../form'

type Props = ComponentProps<typeof AnimateFieldset>

export default function EmailFieldset(props: Props) {
  return (
    <AnimateFieldset {...props} disabled>
      <legend className="sr-only">비밀번호 입력 및 확인</legend>
      <FormInput
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        autoComplete="username"
        required
      />
    </AnimateFieldset>
  )
}
