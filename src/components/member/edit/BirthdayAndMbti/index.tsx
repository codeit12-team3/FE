'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MBTI_LIST } from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

import BirthdaySelect from '../BirthdaySelect'

export default function BirthdayAndMbti() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileEditFormData>()

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
        <Controller
          name="mbti"
          control={control}
          render={({ field }) => (
            <Select
              key={`mbti-${field.value}`}
              value={field.value || 'none'}
              onValueChange={(value) => {
                field.onChange(value === 'none' ? '' : value)
              }}
            >
              <SelectTrigger id="mbti" className="w-42">
                <SelectValue placeholder="MBTI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                {MBTI_LIST.map((mbti) => (
                  <SelectItem key={mbti} value={mbti}>
                    {mbti}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  )
}
