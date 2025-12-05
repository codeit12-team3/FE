'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useCheckEmailCode, useSendEmailCode } from '@/api/auth'
import { formatTimer } from '@/lib/common'

export default function useEmailVerification() {
  const [timer, setTimer] = useState(0)
  const [isChecked, setIsChecked] = useState(false)

  const { mutate: sendEmailMutate, isPending: isSending } = useSendEmailCode()
  const { mutate: checkEmailMutate, isPending: isChecking } =
    useCheckEmailCode()

  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)

    return () => clearInterval(interval)
  }, [timer])

  const formattedTimer = formatTimer(timer)

  const sendEmailCode = (email: string) => {
    sendEmailMutate(email, {
      onSuccess: () => {
        setTimer(300)
        setIsChecked(false)
        toast.success('이메일 인증코드가 전송되었습니다')
      },
    })
  }

  const checkEmailCode = (email: string, code: string) => {
    checkEmailMutate(
      { email, code },
      {
        onSuccess: () => {
          setTimer(0)
          setIsChecked(true)
          toast.success('이메일 인증이 완료되었습니다')
        },
      },
    )
  }

  return {
    timer,
    formattedTimer,
    isSending,
    isChecking,
    isChecked,
    sendEmailCode,
    checkEmailCode,
  }
}
