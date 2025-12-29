'use client'

import { useState } from 'react'

import { useCheckNickname } from '@/api/member'
import { toast } from '@/components/common'

export default function useNicknameVerification() {
  const [isChecked, setIsChecked] = useState(false)

  const { mutate, isPending: isChecking } = useCheckNickname()

  const checkNickname = (nickname: string) => {
    mutate(nickname, {
      onSuccess: () => {
        setIsChecked(true)
        toast.success('사용 가능한 닉네임입니다')
      },
    })
  }

  return {
    isChecked,
    isChecking,
    checkNickname,
  }
}
