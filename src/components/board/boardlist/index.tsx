'use client'

import { Heart, Plus, Search, User } from 'lucide-react'
import Image from 'next/image'

export type TravelSearchParams = {
  region?: string
  startDate?: string
  endDate?: string
  status?: 'RECRUITING' | 'CLOSED'
  ageRange?: string
  gender?: 'MALE' | 'FEMALE'
  keyword?: string
  page?: number
  size?: number
}
function FilterSelect({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <select
        className="
          appearance-none 
          bg-bg-disabled text-text-input 
          px-4 py-2 rounded-lg text-sm 
          border border-border
          pr-8  /* 오른쪽 화살표 자리 확보 */
        "
      >
        <option>{placeholder}</option>
      </select>

      <svg
        className="w-4 h-4 text-text-input absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}

export default function TravelPostList(params: TravelSearchParams) {
  const posts = [
    {
      postId: 1,
      title: '동행 게시글 제목',
      region: params.region ?? '유럽',
      period: {
        startDate: params.startDate ?? '2025-01-03',
        endDate: params.endDate ?? '2025-01-05',
      },
      status: 'RECRUITING',
      currentMembers: 10,
      bookmarked: false,
      thumbnail: '/이미지.png',
      ageRange: params.ageRange ?? '20-29',
      gender: params.gender ?? 'MALE',
      button: '신청하기',
      tags: ['여행스타일 태그', '숙소위험 태그'],
    },
    {
      postId: 2,
      title: '동행 게시글 제목',
      region: params.region ?? '유럽',
      period: {
        startDate: params.startDate ?? '2025-01-03',
        endDate: params.endDate ?? '2025-01-05',
      },
      status: 'CLOSED',
      currentMembers: 10,
      bookmarked: true,
      thumbnail: '/이미지.png',
      ageRange: params.ageRange ?? '20-29',
      gender: params.gender ?? 'FEMALE',
      button: '모집종료',
      overlay: '모집이 마감되었어요',
      tags: ['여행스타일 태그', '숙소위험 태그'],
    },
    {
      postId: 3,
      title: '동행 게시글 제목',
      region: params.region ?? '유럽',
      period: {
        startDate: params.startDate ?? '2025-01-03',
        endDate: params.endDate ?? '2025-01-05',
      },
      status: 'CLOSED',
      currentMembers: 10,
      bookmarked: true,
      thumbnail: '/이미지.png',
      ageRange: params.ageRange ?? '20-29',
      gender: params.gender ?? 'FEMALE',
      button: '신청 취소하기',
      tags: ['여행스타일 태그', '숙소위험 태그'],
    },
  ]

  const tagStyle = 'px-3 py-1 bg-blue-50 text-main rounded-full text-xs'
  const cardBase =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border'

  return (
    <div className="min-h-screen bg-bg-base pt-4">
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
        <div className="flex gap-2">
          <select className="p-2  border border-border rounded-lg text-sm text-text-input bg-white w-23">
            <option>국가</option>
          </select>

          <select className="p-2 border border-border rounded-lg text-sm text-text-input bg-white w-23">
            <option>날짜</option>
          </select>

          <select className="p-2 border border-border rounded-lg text-sm text-text-input bg-white w-23">
            <option>나이</option>
          </select>

          <select className="p-2 border border-border rounded-lg text-sm text-text-input bg-white w-23">
            <option>성별</option>
          </select>
        </div>
        <div className="flex-1 relative max-w-[456px] ">
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-bg-disabled text-text-base placeholder:text-text-input"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input" />
        </div>

        <button className="bg-main text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity h-10">
          <Plus className="w-5 h-5" />
          동행 구하기
        </button>
      </div>

      {/* Posts */}
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {posts.map((post) => (
          <div key={post.postId} className={cardBase}>
            <div className="flex gap-4 ">
              {/* 썸네일 */}
              <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-bg-disabled">
                <Image src={post.thumbnail} alt="썸네일" fill />
                {post.overlay && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {post.overlay}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 ml-3">
                <div className="flex gap-2 mb-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-text-base mb-1">
                  {post.title}
                </h3>

                <div className="flex gap-1">
                  <p className="text-sm text-text-disabled mb-3">작성자</p>
                  <p className="text-sm text-text-input">작성자 닉네임</p>
                </div>

                <div className="flex text-sm mb-2 gap-1  mt-8">
                  <User className="w-4 h-4" />
                  <span>{post.currentMembers}명 신청</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-text-input">
                  {/* 위치 */}
                  <div className="flex items-center gap-1">
                    <span className="text-text-disabled">위치</span>
                    <span className="text-text-base">{post.region}</span>
                  </div>

                  <span className="text-text-disabled">|</span>

                  {/* 날짜 */}
                  <div className="flex items-center gap-1">
                    <span className="text-text-disabled">날짜</span>
                    <span className="text-text-base">
                      {new Date(post.period.startDate).toLocaleDateString(
                        'ko-KR',
                        {
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </span>
                  </div>

                  <span className="text-text-disabled">|</span>

                  {/* 나이 */}
                  <div className="flex items-center gap-1">
                    <span className="text-text-disabled">나이</span>
                    <span className="text-text-base">20대만</span>
                  </div>

                  <span className="text-text-disabled">|</span>

                  {/* 성별 */}
                  <div className="flex items-center gap-1">
                    <span className="text-text-disabled">성별</span>
                    <span className="text-text-base">남여자만</span>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col items-end justify-between">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-bg-input rounded-full transition-colors">
                  <Heart
                    className={`w-6 h-6 ${
                      post.bookmarked
                        ? 'fill-main text-main'
                        : 'text-text-input'
                    }`}
                  />
                </button>

                <div className="flex flex-col items-end justify-between">
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      post.button === '신청하기'
                        ? 'bg-main text-white hover:opacity-90'
                        : post.button === '신청 취소하기'
                          ? 'bg-white text-main border border-main hover:bg-blue-50'
                          : 'bg-bg-disabled text-text-disabled cursor-not-allowed'
                    }`}
                  >
                    {post.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
