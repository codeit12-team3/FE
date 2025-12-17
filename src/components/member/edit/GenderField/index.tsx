'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ProfileEditFormData } from '@/types/member/schema'

export default function GenderField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

  return (
    <div className="flex flex-col gap-3">
      <Label>
        성별 <span className="text-danger">*</span>
      </Label>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex flex-row gap-5 h-11 items-center"
            aria-invalid={!!errors.gender}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem id="gender-male" value="MALE" />
              <Label htmlFor="gender-male" className="font-normal">
                남성
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem id="gender-female" value="FEMALE" />
              <Label htmlFor="gender-female" className="font-normal">
                여성
              </Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.gender && (
        <p className="text-danger text-sm">{errors.gender.message}</p>
      )}
    </div>
  )
}
