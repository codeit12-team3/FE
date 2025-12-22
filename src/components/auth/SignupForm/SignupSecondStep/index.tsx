'use client'

import { Loader } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui'
import { useEmailVerification, useNicknameVerification } from '@/hooks/auth'
import { SignupFormValues } from '@/types/auth'

import BirthFieldset from './BirthFieldset'
import GenderFieldset from './GenderFieldset'
import MBTIFieldset from './MBTIFieldset'
import NicknameFieldset from './NicknameFieldset'

interface Props {
  onPrev: () => void
  emailVerification: ReturnType<typeof useEmailVerification>
  nicknameVerification: ReturnType<typeof useNicknameVerification>
  isPending?: boolean
}

export default function SignupSecondStep({
  onPrev,
  emailVerification,
  nicknameVerification,
  isPending,
}: Props) {
  const { formState } = useFormContext<SignupFormValues>()
  const { isChecked: isEmailChecked } = emailVerification
  const { isChecked: isNicknameChecked } = nicknameVerification

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <NicknameFieldset verification={nicknameVerification} idx={0} />
        <BirthFieldset idx={1} />
        <MBTIFieldset idx={2} className="flex-1" />
        <GenderFieldset idx={3} className="flex-1" />
      </section>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant={'secondary'}
          className="flex-1"
          size={'md'}
          onClick={onPrev}
        >
          뒤로가기
        </Button>
        <Button
          disabled={
            isPending ||
            !isEmailChecked ||
            !isNicknameChecked ||
            !formState.isValid
          }
          className="flex-1"
          type="submit"
          size={'md'}
        >
          {isPending ? <Loader className="size-7 animate-spin" /> : '회원가입'}
        </Button>
      </div>
    </div>
  )
}
