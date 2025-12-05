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
  onPrev: () => void
  verification: ReturnType<typeof useEmailVerification>
}

export default function SignupSecondStep({ onPrev, verification }: Props) {
  const { formState } = useFormContext<SignupFormValues>()
  const { isPending } = useSignupEmail()
  const { isChecked } = verification
  return (
    <div className="space-y-[11px]">
      <section>
        <NicknameFieldset />
        <BirthFieldset />
        <div className="md:flex items-center gap-6">
          <MBTIFieldset className="flex-1" />
          <GenderFieldset className="flex-1" />
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant={'secondary'}
          className="flex-1"
          size={'lg'}
          onClick={onPrev}
        >
          뒤로가기
        </Button>
        <Button
          disabled={!formState.isValid || !isChecked || isPending}
          className="flex-1"
          type="submit"
          size={'lg'}
        >
          {isPending ? <Loader className="size-7" /> : '회원가입'}
        </Button>
      </div>
    </div>
  )
}
