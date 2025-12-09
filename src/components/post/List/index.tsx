'use client'

import { useState } from 'react'

import { Button } from '@/components/common'
import { PostContent } from '@/types/post/post.type'

import FilterBar from './FilterBar'
import PostListSection from './PostListSection'

export default function PostList() {
  const posts: PostContent[] = [
    {
      postId: 'post-1',
      title: '도쿄 디즈니 2박 3일 급구!',
      region: '일본 도쿄',
      period: {
        startDate: '2025-01-10',
        endDate: '2025-01-12',
      },
      recruitStatus: 'RECRUITING',
      tags: ['힐링', '맛집', '쇼핑'],
      nickname: '푸우님과함께',
      currentMembers: 2,
      maxMembers: 4,
      conditions: {
        ageCondition: '20대',
        birthYear: 2000,
        genderCondition: '여성만',
      },
      bookmarked: true,
      thumbnail: '/',
      createdAt: String(new Date()),
      updatedAt: '',
    },
    {
      postId: 'post-2',
      title: '다낭 4박5일 가족여행 동행 구해요',
      region: '베트남 다낭',
      period: {
        startDate: '2025-02-21',
        endDate: '2025-02-25',
      },
      recruitStatus: 'CLOSED',
      tags: ['휴양', '숙소좋은곳', '가성비'],
      nickname: '가족여행러버',
      currentMembers: 3,
      maxMembers: 3,
      conditions: {
        ageCondition: '30대',
        birthYear: 1993,
        genderCondition: '누구나',
      },
      bookmarked: false,
      thumbnail: '/',
      createdAt: String(new Date()),
      updatedAt: '',
    },
    {
      postId: 'post-3',
      title: '제주도 한라산 등반 같이 가실 분!',
      region: '한국 제주도',
      period: {
        startDate: '2024-12-30',
        endDate: '2024-12-31',
      },
      recruitStatus: 'RECRUITING',
      tags: ['액티비티', '등산', '힐링'],
      nickname: '산타는고양이',
      currentMembers: 1,
      maxMembers: 2,
      conditions: {
        ageCondition: '20대',
        birthYear: 1993,
        genderCondition: '누구나',
      },
      bookmarked: true,
      thumbnail: '/',
      createdAt: String(new Date()),
      updatedAt: '',
    },
  ]
  const [filters, setFilters] = useState({
    region: '',
    date: '',
    age: '',
    gender: '',
    search: '',
  })
  const filteredPosts = posts.filter((post) => {
    const matchRegion = !filters.region || post.region.includes(filters.region)
    const matchAge =
      !filters.age || post.conditions.ageCondition === filters.age
    const matchGender =
      filters.gender === '' ||
      filters.gender === 'ALL' ||
      (filters.gender === 'MALE' &&
        post.conditions.genderCondition.includes('남')) ||
      (filters.gender === 'FEMALE' &&
        post.conditions.genderCondition.includes('여'))
    const matchSearch =
      !filters.search ||
      post.title.toLowerCase().includes(filters.search.toLowerCase())
    return matchRegion && matchAge && matchGender && matchSearch
  })

  return (
    <div>
      <FilterBar filters={filters} onChangeFilters={setFilters} />
      <PostListSection posts={filteredPosts} />
      {posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button>더보기</Button>
        </div>
      )}
    </div>
  )
}
