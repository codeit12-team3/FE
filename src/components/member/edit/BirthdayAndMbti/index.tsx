'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { ProfileEditFormData } from '@/types/member/schema'

import BirthdaySelect from '../BirthdaySelect'

export default function BirthdayAndMbti() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  return (
    <div className="flex mt-6">
      <div className="mr-6">
        <label className="block font-medium mb-3">
          생일 <span className="text-danger">*</span>
        </label>
        <BirthdaySelect />
        {errors.birth && (
          <p className="text-danger text-sm mt-1">{errors.birth.message}</p>
        )}
      </div>
      <div>
        <label className="block">MBTI</label>
        <Input
          {...register('mbti')}
          type="text"
          placeholder="MBTI"
          className="h-11 bg-[#EDF4FB] w-42 mt-3"
        />
      </div>
    </div>
  )
}
