'use client'

import { Input } from '@/components/common/Input'
import { useMemberStore } from '@/stores/member.store'

export default function BasicInfo() {
  const { profile, updateProfile } = useMemberStore()
  return (
    <>
      <div>
        <label className="block font-medium">
          닉네임 <span className="text-danger">*</span>
        </label>
        <Input
          name="nickname"
          value={profile?.nickname ?? ''}
          onChange={(e) => updateProfile({ nickname: e.target.value })}
          type="text"
          required
          className="w-42 h-11 bg-[#EDF4FB] mt-3"
          placeholder="닉네임"
        />
      </div>
      <div>
        <label className="block font-medium">
          이름 <span className="text-danger">*</span>
        </label>
        <Input
          name="name"
          type="text"
          value={profile?.name ?? ''}
          onChange={(e) => updateProfile({ name: e.target.value })}
          required
          className="h-11 w-41.5 bg-[#EDF4FB] mt-3"
          placeholder="이름"
        />
      </div>
    </>
  )
}
