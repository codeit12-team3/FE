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
import {
  LODGING_STYLE_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
} from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

export default function PreferenceInfo() {
  const { control } = useFormContext<ProfileEditFormData>()

  return (
    <div className="flex mt-6 gap-6">
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="lodgingStyle">숙소 취향</Label>
        <Controller
          name="lodgingStyle"
          control={control}
          render={({ field }) => (
            <Select
              key={`lodgingStyle-${field.value}`}
              value={field.value || 'none'}
              onValueChange={(value) => {
                field.onChange(value === 'none' ? '' : value)
              }}
            >
              <SelectTrigger id="lodgingStyle" className="w-66">
                <SelectValue placeholder="숙소 취향을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안 함</SelectItem>
                {LODGING_STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="travelStyle">여행 스타일</Label>
        <Controller
          name="travelStyle"
          control={control}
          render={({ field }) => (
            <Select
              key={`travelStyle-${field.value}`}
              value={field.value || 'none'}
              onValueChange={(value) => {
                field.onChange(value === 'none' ? '' : value)
              }}
            >
              <SelectTrigger id="travelStyle" className="w-66">
                <SelectValue placeholder="여행 스타일을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안 함</SelectItem>
                {TRAVEL_STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
