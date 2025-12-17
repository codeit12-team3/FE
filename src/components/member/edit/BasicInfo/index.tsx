'use client'

import { AxiosError } from 'axios'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { useCheckNickname } from '@/api/member'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import {
  NICKNAME_MAX_LENGTH,
  NICKNAME_REGEX,
} from '@/constants/member/rule.const'
import { ApiResponse } from '@/types/common'
import { ProfileEditFormData } from '@/types/member/schema'

export default function BasicInfo() {
  const { control } = useFormContext<ProfileEditFormData>()

  const nickname = useWatch({
    control,
    name: 'nickname',
  })

  const { mutate: checkNickname, isPending } = useCheckNickname()

  const handleCheckDuplicate = () => {
    if (!nickname || nickname.trim().length < 2) {
      toast.error('닉네임은 2자 이상 입력해주세요')
      return
    }
    if (!NICKNAME_REGEX.test(nickname)) {
      toast.error('한글, 영문, 숫자, 특수문자만 사용 가능합니다')
      return
    }

    checkNickname(nickname, {
      onSuccess: (response) => {
        if (!response) toast.success('사용 가능한 닉네임입니다')
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<null>>
        const message =
          axiosError.response?.data?.success === false
            ? axiosError.response.data.data.message
            : '닉네임 확인에 실패했습니다'
        toast.error(message)
      },
    })
  }

  return (
    <div className="w-inherit">
      <FormInput
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="닉네임"
        maxLength={NICKNAME_MAX_LENGTH}
        required
        className=""
        rightElement={
          <Button
            type="button"
            onClick={handleCheckDuplicate}
            disabled={isPending || !nickname}
            variant="secondary"
            size="md"
            className="whitespace-nowrap"
          >
            {isPending ? '확인 중' : '중복확인'}
          </Button>
        }
      />
    </div>
  )
}
