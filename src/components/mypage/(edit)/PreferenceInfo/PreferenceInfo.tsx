import { Search } from 'lucide-react'

import { Input } from '@/components/common/Input'

export default function PreferenceInfo() {
  return (
    <div className="flex mt-6 gap-6">
      <div className="relative">
        <label className="block font-medium">
          숙소 취향
          <Input
            name="accommodation"
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
            name="travelStyle"
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
