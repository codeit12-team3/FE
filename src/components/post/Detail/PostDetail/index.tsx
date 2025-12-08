'use client'

import { Button } from '@/components/common'

import Comment from '../Comment'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostTags from './PostTags'
import PostWriter from './PostWriter'

export default function PostDetail() {
  // 임시 데이터
  const mockData = {
    title: '카지노 가보실 분',
    region: '미국',
    period: {
      startDate: '2025-02-10 09:00 AM',
      endDate: '2025-02-20 06:00 PM',
    },
    stats: {
      maxMembers: 3,
      currentMembers: 0,
      viewCount: 5,
    },
    content: '함께 여행할 분을 찾습니다!',
    createdAt: '2025-12-06T16:19:42.712967883',
    tags: ['힐링', '도박', '카지노'],
    conditions: {
      ageCondition: '이상',
      birthYear: 1995,
      genderCondition: '모두',
    },
    isBookmarked: false,
    commentCount: 22,
    images: ['', '', ''],
    writer: {
      nickname: 'abcd',
      age: 26,
      gender: 'MALE',
      mbti: 'ENTP',
      birth: 1999,
    },
    comments: [
      {
        commentId: 1,
        parentId: null,
        memberId: 1,
        imageUrl: null,
        nickname: '홍길동',
        content: '좋은 게시글이네요!',
        createdAt: 1701100800000,
        updatedAt: null,
        isUpdated: false,
        depth: 0,
      },
      {
        commentId: 2,
        parentId: 1,
        memberId: 3,
        imageUrl: null,
        nickname: '김철수',
        content: '감사합니다~',
        createdAt: 1701100800000,
        updatedAt: null,
        isUpdated: false,
        depth: 1,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center ">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg shadow-sm p-8 ">
        <PostHeader
          title={mockData.title}
          timestamp={mockData.createdAt}
          stats={{ viewCount: mockData.stats.viewCount }}
          commentCount={mockData.commentCount}
          isBookmarked={mockData.isBookmarked}
        />

        <PostImages images={mockData.images} />

        <PostTags tags={mockData.tags} />

        <PostInfo
          region={mockData.region}
          period={{
            startDate: mockData.period.startDate,
            endDate: mockData.period.endDate,
          }}
          content={mockData.content}
          stats={{
            maxMembers: mockData.stats.maxMembers,
            currentMembers: mockData.stats.currentMembers,
          }}
          conditions={{
            ageCondition: mockData.conditions.ageCondition,
            birthYear: mockData.conditions.birthYear,
            genderCondition: mockData.conditions.genderCondition,
          }}
        />

        <PostWriter
          writer={{
            nickname: mockData.writer.nickname,
            age: mockData.writer.age,
            gender: mockData.writer.gender as 'MALE' | 'FEMALE',
            mbti: mockData.writer.mbti,
            birth: mockData.writer.birth,
          }}
        />

        <div className="flex gap-3 items-center justify-center my-8">
          <Button variant="secondary" size="md" className="w-68">
            뒤로가기
          </Button>
          <Button size="md" className="w-68">
            동행 참여하기
          </Button>
        </div>

        <Comment
          data={mockData.comments}
          currentUserId={1}
          mutateComment={({ content }) => console.log('댓글 등록:', content)}
          mutateReply={({ parentId, content }) =>
            console.log('대댓글 등록:', parentId, content)
          }
        />
      </div>
    </div>
  )
}
