'use client'

import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { useCheckNickname } from '@/api/member'
import AnimateFieldset from '@/components/auth/AnimateFieldset'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/common'
import { SignupFormValues } from '@/types/auth'

export default function NicknameFieldset() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const nickname = useWatch({ control, name: 'nickname' })
  const { mutate, isPending: isChecking } = useCheckNickname()
  const [isChecked, setIsChecked] = useState(false)

  const checkNickname = () => {
    mutate(nickname, {
      onSuccess: () => {
        setIsChecked(true)
        toast.success('사용 가능한 닉네임입니다')
      },
    })
  }

  return (
    <AnimateFieldset disabled={isChecked} className="group">
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
            disabled={isChecking || !nickname || !!errors.nickname}
            onClick={checkNickname}
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
        disabled={isChecking}
      />
    </AnimateFieldset>
  )
}
