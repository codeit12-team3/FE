'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/common'
import { useEmailVerification } from '@/hooks/auth'

import EmailFieldset from './EmailFieldset'
import PasswordFieldset from './PasswordFieldset'

interface Props {
  verification: ReturnType<typeof useEmailVerification>
  onNext: () => void
}

export default function SignupFirstStep({ verification, onNext }: Props) {
  const {
    trigger,
    formState: { errors },
  } = useFormContext()
  const router = useRouter()
  const { isChecked } = verification

  const isValid = isChecked && !errors.password && !errors.passwordConfirm

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
    <div className="space-y-[11px]">
      <section>
        <EmailFieldset verification={verification} />
        <PasswordFieldset />
      </section>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant={'secondary'}
          className="flex-1"
          size={'lg'}
          onClick={() => router.back()}
        >
          나가기
        </Button>
        <Button
          type="button"
          onClick={handleNextClick}
          className="flex-1"
          disabled={!isValid}
          size={'lg'}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
