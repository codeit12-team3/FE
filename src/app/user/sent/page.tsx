'use client'

import { useState } from 'react'

import { Button } from '@/components/common/Button'

import EmptyState from '../components/EmptyState'
import SentCard from '../components/SentCard'

export default function Sentpage() {
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
            className="cursor-pointer"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <SentCard />
        <EmptyState type="sent" />
      </div>
    </>
  )
}
