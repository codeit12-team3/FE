'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import FormTextarea from '@/components/form/FormTextarea'
import { ProfileEditFormData } from '@/types/member/schema'

const MAX_LENGTH = 100

export default function BioField() {
  const { control } = useFormContext<ProfileEditFormData>()

  const introduction = useWatch({
    control,
    name: 'introduction',
  })

  const currentLength = introduction?.length || 0

  return (
    <div className="mt-6 flex flex-col gap-3">
      <FormTextarea
        label="자기소개"
        name="introduction"
        placeholder="자기소개를 입력해주세요"
        className="resize-none min-h-30"
        maxLength={MAX_LENGTH}
        rightContent={`${currentLength}/${MAX_LENGTH}`}
      />
    </div>
  )
}
