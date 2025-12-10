'use client'

import { Input } from '@/components/common/Input'
import { useMemberStore } from '@/stores/member.store'

const MAX_BIO_LENGTH = 100

export default function BioField() {
  const { profile, updateProfile } = useMemberStore()

  const bio = profile?.bio ?? ''
  const length = bio.length

  return (
    <div className="mt-6">
      <label className="block font-medium">
        <span>
          자기소개
          <span
            className={`transition-colors ml-1.5 ${
              length > 90 ? 'text-danger' : 'text-main'
            }`}
          >
            {length}
          </span>
          /{MAX_BIO_LENGTH}
        </span>
        <Input
          name="bio"
          type="text"
          value={bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          placeholder={`자기소개를 입력해주세요 ${bio.length}/100`}
          className="h-11 bg-[#EDF4FB] mt-3"
          maxLength={MAX_BIO_LENGTH}
        />
      </label>
    </div>
  )
}
