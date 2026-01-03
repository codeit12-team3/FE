'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { FormSelect } from '@/components/form'
import { Label } from '@/components/ui'
import {
  LODGING_STYLE_OPTIONS,
  TRIP_STYLE_OPTIONS,
} from '@/constants/member/rule.const'
import { ProfileEditFormData } from '@/types/member/schema'

export default function PreferenceInfo() {
  const { control } = useFormContext<ProfileEditFormData>()

  const lodgingStyle = useWatch({
    control,
    name: 'lodgingStyle',
  })

  const tripStyle = useWatch({
    control,
    name: 'tripStyle',
  })

  return (
    <div className="flex flex-col md:flex-row mt-6 gap-6 w-inherit">
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="tripStyle">여행 스타일</Label>
        <FormSelect
          key={`tripStyle-${tripStyle}`}
          name="tripStyle"
          options={TRIP_STYLE_OPTIONS}
          placeholder="여행 스타일을 선택해주세요"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="lodgingStyle">숙소 취향</Label>
        <FormSelect
          key={`lodgingStyle-${lodgingStyle}`}
          name="lodgingStyle"
          options={LODGING_STYLE_OPTIONS}
          placeholder="숙소 취향을 선택해주세요"
          className="w-full"
        />
      </div>
    </div>
  )
}
