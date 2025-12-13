'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    <div className="mt-6 flex flex-col gap-3">
      <Label htmlFor="bio">
        자기소개
        <span
          className={`transition-colors ml-1.5 ${
            length > 90 ? 'text-danger' : 'text-main'
          }`}
        >
          {length}
        </span>
        /{MAX_BIO_LENGTH}
      </Label>
      <Input
        id="bio"
        {...register('bio')}
        type="text"
        placeholder={`자기소개를 입력해주세요`}
        maxLength={MAX_BIO_LENGTH}
        aria-invalid={!!errors.bio}
      />
      {errors.bio && (
        <p className="text-danger text-sm">{errors.bio.message}</p>
      )}
    </div>
  )
}
