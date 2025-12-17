'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { FormSelect } from '@/components/form'
import { Label } from '@/components/ui/label'
import { MBTI_LIST } from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

import BirthdaySelect from '../BirthdaySelect'

const MBTI_OPTIONS = [
  { value: 'NONE', label: '선택 안함' },
  ...MBTI_LIST.map((mbti) => ({
    value: mbti,
    label: mbti,
  })),
]
export default function BirthdayAndMbti() {
  const { control } = useFormContext<ProfileEditFormData>()

  const mbti = useWatch({
    control,
    name: 'mbti',
  })

  return (
    <div className="flex mt-6 gap-4">
      <div className="flex-1">
        <BirthdaySelect />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <Label htmlFor="mbti">MBTI</Label>
        <FormSelect
          key={`mbti-${mbti}`}
          name="mbti"
          className="w-full"
          options={MBTI_OPTIONS}
          placeholder="MBTI를 선택해주세요"
        />
      </div>
    </div>
  )
}
