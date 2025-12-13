'use client'

import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  NICKNAME_MAX_LENGTH,
  NICKNAME_REGEX,
} from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  return (
    <>
      <div className="flex flex-col gap-3">
        <Label htmlFor="nickname">
          닉네임 <span className="text-danger">*</span>
        </Label>
        <Input
          id="nickname"
          {...register('nickname', {
            required: '닉네임을 입력하세요',
            maxLength: {
              value: NICKNAME_MAX_LENGTH,
              message: `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 가능합니다`,
            },
            pattern: {
              value: NICKNAME_REGEX,
              message: '닉네임에 사용할 수 없는 문자가 포함되어 있습니다',
            },
          })}
          type="text"
          className="w-42"
          placeholder="닉네임"
          maxLength={NICKNAME_MAX_LENGTH}
          aria-invalid={!!errors.nickname}
        />
        {errors.nickname && (
          <p className="text-danger text-sm">{errors.nickname.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="name">
          이름 <span className="text-danger">*</span>
        </Label>
        <Input
          id="name"
          {...register('name', {
            required: '이름을 입력하세요',
          })}
          type="text"
          className="w-41.5"
          placeholder="이름"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-danger text-sm">{errors.name.message}</p>
        )}
      </div>
    </>
  )
}
