'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { useCheckEmailCode, useSendEmailCode } from '@/api/auth'
import { toast } from '@/components/common'
import { formatTimer } from '@/lib/common'
import { ApiResponse } from '@/types/common'

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
        onError: (error) => {
          if (axios.isAxiosError<ApiResponse>(error)) {
            const apiRes = error.response?.data
            const errCode = apiRes?.success === false ? apiRes.data?.code : null

            if (errCode === 'AUTH_008') {
              setTimer(0)
              setIsChecked(true)
              toast.success('이미 인증이 완료된 이메일입니다')
            }
          }
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
