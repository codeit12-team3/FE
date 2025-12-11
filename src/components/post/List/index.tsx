'use client'

import { useState } from 'react'

import { Button } from '@/components/common'
import { AgeType, GenderType, PostContent, PostParams } from '@/types/posts'

import FilterBar from './FilterBar'
import PostListSection from './PostListSection'

export default function PostList() {
  const [filters, setFilters] = useState<PostParams>({
    region: '',
    date: '',
    ageType: '' as AgeType,
    gender: '' as GenderType,
    keyword: '',
  })

  // 임시 데이터
  const mockPosts: PostContent[] = [
    {
      postId: '1',
      title: '베트남 여행 같이 가실 분~',
      content: '베트남 여행 같이 가실 분 모집합니다!',
      region: '베트남',
      period: {
        startDate: '2024-12-15',
        endDate: '2024-12-20',
      },
      recruitStatus: 'RECRUITING',
      tags: ['여행', '베트남'],
      nickname: '여행러버',
      currentMembers: 2,
      maxMembers: 4,
      conditions: {
        ageCondition: 'TWENTY',
        genderCondition: 'FEMALE',
      },
      isBookmarked: false,
      thumbnail: ['/'],
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01',
    },
    {
      postId: 'post-2',
      title: '다낭 4박5일 가족여행 동행 구해요',
      content: '가족 여행 동행 구합니다.',
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
        ageCondition: 'THIRTY',
        genderCondition: 'ALL',
      },
      isBookmarked: false,
      thumbnail: ['/'],
      createdAt: '2025-02-21',
      updatedAt: '2025-02-21',
    },
    {
      postId: 'post-3',
      title: '제주도 한라산 등반 같이 가실 분!',
      content: '한라산 등반 같이 가요!',
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
        ageCondition: 'TWENTY',
        genderCondition: 'ALL',
      },
      isBookmarked: true,
      thumbnail: ['/'],
      createdAt: '2024-12-30',
      updatedAt: '2024-12-30',
    },
  ]

  // 나중에 API 연동 시 주석 해제
  // const [cursor, setCursor] = useState<string | undefined>(undefined)
  // const { data,isLoading } = usePosts({
  //   lastPostId: cursor,
  //   size: 20,
  //   region: filters.region || undefined,
  //   date: filters.date || undefined, // yyyy-MM-dd 형식
  //   age: filters.age ? Number(filters.age) : undefined,
  //   ageType: filters.ageType || undefined, // OLDER | YOUNGER
  //   gender: filters.gender === '' ? undefined : filters.gender, // MALE | FEMALE | ALL
  //   keyword: filters.search || undefined,
  // })
  // if(isLoading) return <PostListSkeleton/>

  return (
    <div>
      <FilterBar filters={filters} onChangeFilters={setFilters} />
      <PostListSection posts={mockPosts} />
      {mockPosts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button>더보기</Button>
        </div>
      )}
    </div>
  )
}
