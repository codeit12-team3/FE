'use client'

import { Loader } from 'lucide-react'
import { ComponentProps, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { AnimateFieldset } from '@/components/auth/form'
import { FormInput } from '@/components/form'
import { Button } from '@/components/ui'
import { useEmailVerification } from '@/hooks/auth'
import { cn } from '@/lib/common'
import { SignupFormValues } from '@/types/auth'

interface Props extends ComponentProps<typeof AnimateFieldset> {
  verification: ReturnType<typeof useEmailVerification>
}

export default function EmailFieldset({
  verification,
  className,
  ...props
}: Props) {
  const {
    isSending,
    isChecking,
    isChecked,
    timer,
    formattedTimer,
    sendEmailCode,
    checkEmailCode,
  } = verification

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<SignupFormValues>()

  const [email, emailCode] = useWatch({ control, name: ['email', 'emailCode'] })

  const isSendEmailCodeDisabled = !email || !!errors.email
  const isCheckEmailCodeDisabled =
    timer === 0 || !emailCode || !!errors.emailCode

  // 1. 인증코드 발송 요청 핸들러
  const handleSendEmailCode = async () => {
    const isValid = await trigger('email', {
      shouldFocus: true,
    })

    if (isValid && !isSending) {
      sendEmailCode(email)
    }
  }

  // 2. 이메일 인증코드 검증 요청 핸들러
  const handleCheckEmailCode = async () => {
    const isValid = await trigger(['email', 'emailCode'], {
      shouldFocus: true,
    })

    if (isValid && !isChecked && !isChecking) {
      checkEmailCode(email, emailCode)
    }
  }

  // 3. 이메일 코드 발송 버튼 텍스트
  const transSendEmailCodeText = useMemo(() => {
    if (timer > 0) return '재발송'
    if (isChecked) return '인증완료'
    return '인증번호 발송'
  }, [timer, isChecked])

  // 4. 이메일 코드 검증 버튼 텍스트
  const transCheckEmailCodeText = useMemo(() => {
    if (isChecked) return '인증완료'
    return '이메일 인증'
  }, [isChecked])

  return (
    <AnimateFieldset
      disabled={isChecked || isChecking || isSending}
      className={cn('group', className)}
      {...props}
    >
      <legend className="sr-only">이메일 입력 및 인증</legend>
      <FormInput
        className="w-full"
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        disabled={isChecked || isChecking || isSending}
        rightElement={
          <Button
            onClick={handleSendEmailCode}
            variant={'secondary'}
            className="w-24"
            type="button"
            size={'md'}
            disabled={isSendEmailCodeDisabled}
          >
            {isSending ? (
              <Loader className="size-6 animate-spin" />
            ) : (
              transSendEmailCodeText
            )}
          </Button>
        }
        autoComplete="username"
        required
      />
      <FormInput
        className="w-full"
        label="인증코드 입력"
        name="emailCode"
        placeholder="인증코드를 입력해주세요"
        rightElement={
          <Button
            onClick={handleCheckEmailCode}
            variant={'secondary'}
            className="w-24"
            type="button"
            size={'md'}
            disabled={isCheckEmailCodeDisabled}
          >
            {isChecking ? (
              <Loader className="size-6 animate-spin" />
            ) : (
              transCheckEmailCodeText
            )}
          </Button>
        }
        rightContent={formattedTimer}
        autoComplete="one-time-code"
        disabled={isChecked || isChecking || isSending || timer === 0}
        required
      />
    </AnimateFieldset>
  )
}
