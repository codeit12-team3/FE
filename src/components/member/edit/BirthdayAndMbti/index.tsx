'use client'

import { Input } from '@/components/common/Input'
import { useMemberStore } from '@/stores/member.store'

import BirthdaySelect from '../BirthdaySelect'

export default function BirthdayAndMbti() {
  const { profile, updateProfile } = useMemberStore()
  console.log(profile?.birth)

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
          value={profile?.mbti ?? ''}
          onChange={(e) => updateProfile({ mbti: e.target.value })}
          placeholder="MBTI"
          className="h-11 bg-[#EDF4FB] w-42 mt-3"
        />
      </div>
    </div>
  )
}
