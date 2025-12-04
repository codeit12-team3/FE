import { Input } from '@/components/common/Input'

import BirthdaySelect from '../BirthdaySelect/BirthdaySelect'

export default function BirthdayAndMbti() {
  return (
    <div className="flex mt-6">
      <div className="mr-6">
        <label className="block font-medium mb-3">
          생일 <span className="text-danger">*</span>
        </label>
        <BirthdaySelect />
      </div>
      <div>
        <label className="block">MBTI</label>
        <Input
          name="mbti"
          type="text"
          placeholder="MBTI"
          className="h-11 bg-[#EDF4FB] w-42 mt-3"
        />
      </div>
    </div>
  )
}
