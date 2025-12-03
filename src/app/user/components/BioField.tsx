'use client'

import { useState } from 'react'

import { Input } from '@/components/common/Input'

export default function BioField() {
  const [bio, setBio] = useState('')
  const max = 100
  return (
    <div className="mt-6">
      <label className="block font-medium">
        <span>
          자기소개
          <span
            className={`transition-colors ml-1.5 ${
              bio.length > 90 ? 'text-danger' : 'text-main'
            }`}
          >
            {bio.length}
          </span>
          /100
        </span>
        <Input
          name="bio"
          type="text"
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= max) setBio(e.target.value)
          }}
          placeholder={`자기소개를 입력해주세요 ${bio.length}/100`}
          className="h-11 bg-[#EDF4FB] mt-3"
          maxLength={max}
        />
      </label>
    </div>
  )
}
