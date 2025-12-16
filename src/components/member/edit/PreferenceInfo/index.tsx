'use client'

import { useFormContext } from 'react-hook-form'

import { FormSelect } from '@/components/form'
import { Label } from '@/components/ui'
import {
  LODGING_STYLE_OPTIONS,
  TRIP_STYLE_OPTIONS,
} from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

export default function PreferenceInfo() {
  const { watch } = useFormContext<ProfileEditFormData>()

  const lodgingStyle = watch('lodgingStyle')
  const tripStyle = watch('tripStyle')

  return (
    <div className="flex mt-6 gap-6">
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="lodgingStyle">숙소 취향</Label>
        <FormSelect
          key={`lodgingStyle-${lodgingStyle}`}
          name="lodgingStyle"
          options={LODGING_STYLE_OPTIONS}
          placeholder="숙소 취향을 선택해주세요"
          className="w-66"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="tripStyle">여행 스타일</Label>
        <FormSelect
          key={`tripStyle-${tripStyle}`}
          name="tripStyle"
          options={TRIP_STYLE_OPTIONS}
          placeholder="여행 스타일을 선택해주세요"
          className="w-66"
        />
      </div>
    </div>
  )
}
