'use client'

import { useMemberStore } from '@/stores/member.store'

export default function GenderField() {
  const { profile, updateProfile } = useMemberStore()
  return (
    <div>
      <label className="block font-medium ">
        성별 <span className="text-danger">*</span>
      </label>
      <div className="mt-3 flex gap-5 h-11">
        <label className="flex items-center gap-3">
          <span>남</span>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={profile?.gender === 'male'}
            onChange={() => updateProfile({ gender: 'male' })}
            required
            className="w-6 h-6"
          />
        </label>
        <label className="flex items-center gap-3">
          <span>여</span>
          <input
            type="radio"
            name="gender"
            checked={profile?.gender === 'female'}
            onChange={() => updateProfile({ gender: 'female' })}
            value="female"
            className="w-6 h-6"
          />
        </label>
      </div>
    </div>
  )
}
