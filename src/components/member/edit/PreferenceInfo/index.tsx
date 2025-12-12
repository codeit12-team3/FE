'use client'

import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { ProfileEditFormData } from '@/types/member/schema'

export default function PreferenceInfo() {
  const { register } = useFormContext<ProfileEditFormData>()

  return (
    <div className="flex mt-6 gap-6">
      <div className="relative">
        <label className="block font-medium">
          숙소 취향
          <Input
            {...register('accommodation')}
            type="text"
            placeholder="숙소 취향을 입력해주세요"
            className="h-11 w-66 bg-[#EDF4FB] mt-3 pr-10"
          />
        </label>
        <div className="absolute bottom-3 right-2 cursor-pointer">
          <Search className="w-5 h-5" />
        </div>
      </div>
      <div className="relative">
        <label className="block font-medium">
          여행 스타일
          <Input
            {...register('travelStyle')}
            type="text"
            placeholder="여행 스타일을 입력해주세요"
            className="h-11 w-66 bg-[#EDF4FB] mt-3 pr-10"
          />
        </label>
        <div className="absolute bottom-3 right-2 cursor-pointer">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
