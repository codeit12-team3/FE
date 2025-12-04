'use client'

import { Loader } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { useSignupEmail } from '@/api/auth'
import { Button } from '@/components/common'
import { useEmailVerification } from '@/hooks/auth'
import { SignupFormValues } from '@/types/auth'

import BirthFieldset from './BirthFieldset'
import GenderFieldset from './GenderFieldset'
import MBTIFieldset from './MBTIFieldset'
import NicknameFieldset from './NicknameFieldset'

interface Props {
  verification: ReturnType<typeof useEmailVerification>
}

export default function SignupSecondStep({ verification }: Props) {
  const { formState } = useFormContext<SignupFormValues>()
  const { isPending } = useSignupEmail()
  const { isChecked } = verification
  return (
    <div className="space-y-[11px]">
      <section>
        <NicknameFieldset />
        <GenderFieldset />
        <BirthFieldset />
        <MBTIFieldset />
      </section>

      <Button
        disabled={!formState.isValid || !isChecked || isPending}
        className="w-full"
        type="submit"
        size={'lg'}
      >
        {isPending ? <Loader className="size-7" /> : '회원가입'}
      </Button>
    </div>
  )
}
