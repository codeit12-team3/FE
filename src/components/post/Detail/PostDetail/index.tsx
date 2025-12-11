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
  const postDetail = {
    postId: 'post-2',
    title: '카지노 가보실 분',
    region: '미국',
    period: {
      startDate: '2025-02-10',
      endDate: '2025-02-20 ',
    },
    stats: {
      maxMembers: 3,
      currentMembers: 0,
      viewCount: 5,
    },
    content:
      '함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!함께 여행할 분을 찾습니다!',
    createdAt: '2025-12-06T16:19:42.712967883',
    tags: ['힐링', '도박', '카지노'],
    conditions: {
      ageCondition: '20대만',
      genderCondition: '남자만',
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
      tripStyle: '힐링',
      accommodationPreference: '호텔',
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
  //  const { data, isLoading } = usePostDetail(params.id)
  //  if(isLoading ) <PostDetailSkeleton />
  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center ">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg p-8 border  border-[#DDDDDD]  ">
        <PostHeader
          title={postDetail.title}
          timestamp={postDetail.createdAt}
          stats={{ viewCount: postDetail.stats.viewCount }}
          commentCount={postDetail.commentCount}
          isBookmarked={postDetail.isBookmarked}
        />

        <PostImages images={postDetail.images} />

        <PostTags tags={postDetail.tags} />

        <PostInfo
          region={postDetail.region}
          period={{
            startDate: postDetail.period.startDate,
            endDate: postDetail.period.endDate,
          }}
          content={postDetail.content}
          stats={{
            maxMembers: postDetail.stats.maxMembers,
            currentMembers: postDetail.stats.currentMembers,
          }}
          conditions={{
            ageCondition: postDetail.conditions.ageCondition,
            genderCondition: postDetail.conditions.genderCondition,
          }}
        />

        <PostWriter
          writer={{
            nickname: postDetail.writer.nickname,
            age: postDetail.writer.age,
            gender: postDetail.writer.gender as 'MALE' | 'FEMALE',
            mbti: postDetail.writer.mbti,
            birth: postDetail.writer.birth,
            tripstyle: postDetail.writer.tripStyle,
            accommodationPreference: postDetail.writer.accommodationPreference,
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
          data={postDetail.comments}
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
