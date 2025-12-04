'use client'

import { useState } from 'react'

import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/member'
import { PostsCard } from '@/components/member/posts'

export default function Postspage() {
  const [filter, setFilter] = useState<'all' | 'newest' | 'trending'>('all')

  const filterButtons: { label: string; value: typeof filter }[] = [
    { label: '전체', value: 'all' },
    { label: '최신순', value: 'newest' },
    { label: '인기순', value: 'trending' },
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
        <PostsCard />
        <EmptyState type="posts" />
      </div>
    </>
  )
}
