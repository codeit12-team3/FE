'use client'

import { Loader } from 'lucide-react'
import { ComponentProps } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { AnimateFieldset, FormInput } from '@/components/auth/form'
import { Button } from '@/components/common'
import { useNicknameVerification } from '@/hooks/auth'
import { cn } from '@/lib/common'
import { SignupFormValues } from '@/types/auth'

interface Props extends ComponentProps<typeof AnimateFieldset> {
  verification: ReturnType<typeof useNicknameVerification>
}

export default function NicknameFieldset({
  className,
  verification,
  ...props
}: Props) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const nickname = useWatch({ control, name: 'nickname' })

  const { isChecked, isChecking, checkNickname } = verification

  const handleCheckNickname = async () => {
    const isValid = await trigger('nickname', {
      shouldFocus: true,
    })

    if (isValid && !isChecking) {
      checkNickname(nickname)
    }
  }

  return (
    <AnimateFieldset
      disabled={isChecked || isChecking}
      className={cn('group', className)}
      {...props}
    >
      <legend className="sr-only">닉네임 입력 및 검증</legend>
      <FormInput
        className="w-full"
        label="닉네임"
        type="text"
        name="nickname"
        placeholder="닉네임을 입력하세요"
        rightElement={
          <Button
            className="w-[158px]"
            type="button"
            size={'md'}
            disabled={!nickname || !!errors.nickname}
            onClick={handleCheckNickname}
          >
            {isChecking ? (
              <Loader className="size-6 animate-spin" />
            ) : isChecked ? (
              '확인완료'
            ) : (
              '중복확인'
            )}
          </Button>
        }
      />
    </AnimateFieldset>
  )
}
