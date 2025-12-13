'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { ProfileEditFormData } from '@/types/member/schema'

const MAX_BIO_LENGTH = 100

export default function BioField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  const bio = watch('bio') ?? ''
  const length = bio.length

  return (
    <div className="mt-6">
      <label className="block font-medium">
        <span>
          자기소개
          <span
            className={`transition-colors ml-1.5 ${
              length > 90 ? 'text-danger' : 'text-main'
            }`}
          >
            {length}
          </span>
          /{MAX_BIO_LENGTH}
        </span>
        <Input
          {...register('bio')}
          type="text"
          placeholder={`자기소개를 입력해주세요 ${length}/100`}
          className="h-11 bg-[#EDF4FB] mt-3"
          maxLength={MAX_BIO_LENGTH}
        />
      </label>
      {errors.bio && (
        <p className="text-danger text-sm mt-1">{errors.bio.message}</p>
      )}
    </div>
  )
}
