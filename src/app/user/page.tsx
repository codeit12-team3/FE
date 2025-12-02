'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/common/Button'

import BookmarkIcon from './components/BookmarkIcon'

export default function Userpage() {
  const [filter, setFilter] = useState<
    'all' | 'pending' | 'accepted' | 'rejected'
  >('all')

  const filterButtons: { label: string; value: typeof filter }[] = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'pending' },
    { label: '수락', value: 'accepted' },
    { label: '거절', value: 'rejected' },
  ]

  return (
    <>
      <div className="flex gap-2">
        {filterButtons.map(({ label, value }) => (
          <Button
            key={value}
            variant={filter === value ? 'default' : 'secondary'}
            onClick={() => setFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <div className="h-61 rounded-4xl border-2 bg-white flex p-6">
          <div className="mr-6">
            <Image
              src="/images/cardImage_test.svg"
              alt="게시글 이미지"
              width={188}
              height={188}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>뱃지</div>
              <BookmarkIcon />
            </div>
            <h2></h2>
            <p></p>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
