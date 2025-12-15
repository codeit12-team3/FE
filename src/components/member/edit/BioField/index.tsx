'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProfileEditFormData } from '@/types/member/schema'

const MAX_INTRODUCTION_LENGTH = 100

export default function BioField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  const introduction = watch('introduction') ?? ''
  const length = introduction.length

  return (
    <div className="mt-6 flex flex-col gap-3">
      <Label htmlFor="introduction">
        자기소개
        <span
          className={`transition-colors ml-1.5 ${
            length > 90 ? 'text-danger' : 'text-main'
          }`}
        >
          {length}
        </span>
        /{MAX_INTRODUCTION_LENGTH}
      </Label>
      <Input
        id="introduction"
        {...register('introduction')}
        type="text"
        placeholder={`자기소개를 입력해주세요`}
        maxLength={MAX_INTRODUCTION_LENGTH}
        aria-invalid={!!errors.introduction}
      />
      {errors.introduction && (
        <p className="text-danger text-sm">{errors.introduction.message}</p>
      )}
    </div>
  )
}
