'use client'

import { FormSelect } from '@/components/form'
import { Label } from '@/components/ui'
import { LODGING_STYLE_OPTIONS, TRIP_STYLE_OPTIONS } from '@/constants/member'

export default function PreferenceInfo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>여행 스타일</Label>
        <FormSelect
          name="tripStyle"
          options={TRIP_STYLE_OPTIONS}
          placeholder="여행 스타일을 선택하세요"
        />
      </div>

      <div className="space-y-2">
        <Label>숙소 스타일</Label>
        <FormSelect
          name="lodgingStyle"
          options={LODGING_STYLE_OPTIONS}
          placeholder="숙소 스타일을 선택하세요"
        />
      </div>
    </div>
  )
}
