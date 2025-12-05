'use client'

import { useState } from 'react'

import { Post, TravelSearchParams } from '@/types/post/post.type'

import { FilterBar, PostListSection } from '../List'

export default function PostList(params: TravelSearchParams) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  //  임시 데이터
  const posts: Post[] = [
    {
      postId: '1',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'RECRUITING',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: true,
      thumbnail: '/이미지.png',
    },
    {
      postId: '2',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'RECRUITING',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: false,
      thumbnail: '/이미지.png',
    },
    {
      postId: '3',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'CLOSED',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: false,
      thumbnail: '/이미지.png',
    },
  ]

  return (
    <div className="min-h-screen bg-bg-base pt-4">
      <FilterBar onOpenModal={() => setIsModalOpen(true)} />

      <PostListSection posts={posts} />
    </div>
  )
}
