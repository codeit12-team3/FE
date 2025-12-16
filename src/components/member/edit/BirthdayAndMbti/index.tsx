'use client'

import { useFormContext } from 'react-hook-form'

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
  const {
    watch,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  const mbti = watch('mbti')

  return (
    <div className="flex mt-6 gap-6">
      <div className="flex flex-col gap-3">
        <Label>
          생일 <span className="text-danger">*</span>
        </Label>
        <BirthdaySelect />
        {errors.birth && (
          <p className="text-danger text-sm">{errors.birth.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="mbti">MBTI</Label>
        <FormSelect
          key={`mbti-${mbti}`}
          name="mbti"
          options={MBTI_OPTIONS}
          placeholder="MBTI"
          className="w-42"
        />
      </div>
    </div>
  )
}
