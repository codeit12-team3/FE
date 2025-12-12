'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { ProfileEditFormData } from '@/types/member/schema'

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  return (
    <>
      <div>
        <label className="block font-medium">
          닉네임 <span className="text-danger">*</span>
        </label>
        <Input
          {...register('nickname')}
          type="text"
          className="w-42 h-11 bg-[#EDF4FB] mt-3"
          placeholder="닉네임"
        />
        {errors.nickname && (
          <p className="text-danger text-sm mt-1">{errors.nickname.message}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">
          이름 <span className="text-danger">*</span>
        </label>
        <Input
          {...register('name')}
          type="text"
          className="h-11 w-41.5 bg-[#EDF4FB] mt-3"
          placeholder="이름"
        />
        {errors.name && (
          <p className="text-danger text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
    </>
  )
}
