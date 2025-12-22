'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui'
import { useEmailVerification } from '@/hooks/auth'

import EmailFieldset from './EmailFieldset'
import PasswordFieldset from './PasswordFieldset'

interface Props {
  emailVerification: ReturnType<typeof useEmailVerification>
  onNext: () => void
}

export default function SignupFirstStep({ emailVerification, onNext }: Props) {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext()
  const router = useRouter()
  const { isChecked } = emailVerification

  const [password, passwordConfirm] = useWatch({
    control,
    name: ['password', 'passwordConfirm'],
  })

  const isValid = useMemo(() => {
    return (
      isChecked &&
      !errors.password &&
      !errors.passwordConfirm &&
      !!password &&
      !!passwordConfirm
    )
  }, [
    isChecked,
    errors.password,
    errors.passwordConfirm,
    password,
    passwordConfirm,
  ])

  const handleNextClick = async () => {
    const isValid = await trigger([
      'email',
      'emailCode',
      'password',
      'passwordConfirm',
    ])

    if (isValid && isChecked) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <EmailFieldset
          idx={0}
          verification={emailVerification}
          className="space-y-4"
        />
        <PasswordFieldset idx={1} className="space-y-4" />
      </section>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant={'secondary'}
          className="flex-1"
          size={'md'}
          onClick={() => router.back()}
        >
          나가기
        </Button>
        <Button
          type="button"
          onClick={handleNextClick}
          className="flex-1"
          disabled={!isValid}
          size={'md'}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
