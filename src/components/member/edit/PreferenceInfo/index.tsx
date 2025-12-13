'use client'

import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { ProfileEditFormData } from '@/types/member/schema'

export default function PreferenceInfo() {
  const { register } = useFormContext<ProfileEditFormData>()

  return (
    <div className="flex mt-6 gap-6">
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="accommodation">숙소 취향</Label>
        <InputGroup>
          <InputGroupInput
            id="accommodation"
            {...register('accommodation')}
            type="text"
            placeholder="숙소 취향을 입력해주세요"
            className="w-66"
          />
          <InputGroupAddon align="inline-end">
            <Search className="w-5 h-5" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="travelStyle">여행 스타일</Label>
        <InputGroup>
          <InputGroupInput
            id="travelStyle"
            {...register('travelStyle')}
            type="text"
            placeholder="여행 스타일을 입력해주세요"
            className="w-66"
          />
          <InputGroupAddon align="inline-end">
            <Search className="w-5 h-5" />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
