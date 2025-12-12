'use client'

import { useFormContext } from 'react-hook-form'

import { ProfileEditFormData } from '@/types/member/schema'

export default function GenderField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  return (
    <div>
      <label className="block font-medium">
        성별 <span className="text-danger">*</span>
      </label>
      <div className="mt-3 flex gap-5 h-11">
        <label className="flex items-center gap-3">
          <span>남</span>
          <input
            {...register('gender')}
            type="radio"
            value="male"
            className="w-6 h-6"
          />
        </label>
        <label className="flex items-center gap-3">
          <span>여</span>
          <input
            {...register('gender')}
            type="radio"
            value="female"
            className="w-6 h-6"
          />
        </label>
      </div>
      {errors.gender && (
        <p className="text-danger text-sm mt-1">{errors.gender.message}</p>
      )}
    </div>
  )
}
