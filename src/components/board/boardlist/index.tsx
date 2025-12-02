'use client'

import { Heart, Plus, Search, User, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
          bg-bg-disabled text-text-disabled
          p-2  rounded-lg text-sm 
          border border-border pr-8 w-23
        "
      >
        <option>{placeholder}</option>
      </select>

      <span
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          text-text-disabled text-[12px] pointer-events-none
        "
      >
        ▼
      </span>
    </div>
  )
}

export default function TravelPostList(params: TravelSearchParams) {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
          <FilterSelect placeholder="국가" />
          <FilterSelect placeholder="날짜" />
          <FilterSelect placeholder="나이" />
          <FilterSelect placeholder="성별" />
        </div>
        <div className="flex-1 relative max-w-[456px] ">
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-bg-disabled text-text-base placeholder:text-text-input"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input" />
        </div>

        <button
          className="bg-main text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity h-10"
          onClick={() => setIsModalOpen(true)}
        >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[520px] p-6 relative h-[95vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <h2 className="text-lg font-semibold text-text-base ">
                게시글 작성
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-text-base"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* 모임 이름 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  모임 이름 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="모임 이름을 작성해주세요"
                  className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
                />
              </div>

              {/* 여행 테마 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  여행 테마 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="태그로 선택해주세요, 최대 5개"
                  className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
                />
              </div>

              {/* 이미지 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  이미지
                </label>
                <input
                  type="text"
                  placeholder="최대 3장, 5MB 제한"
                  className="w-full px-4 py-3 rounded-lg text-sm  placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
                />
              </div>

              {/* 국가 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  국가 <span className="text-danger">*</span>
                </label>
                <select className="w-full px-4 py-3 rounded-lg text-sm  text-text-input appearance-none bg-[#EDF4FB] ring-0 outline-none">
                  <option>국가를 선택해주세요</option>
                </select>
              </div>

              {/* 모집 정원 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  모집 정원 <span className="text-danger">*</span>
                </label>

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="인원을 입력해주세요"
                    className="w-1/2 px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none "
                  />

                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" className="accent-main" />
                    <span className="text-sm text-text-base">남성만</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" className="accent-main" />
                    <span className="text-sm text-text-base">여성만</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" className="accent-main" />
                    <span className="text-sm text-text-base">모두</span>
                  </label>
                </div>
              </div>

              {/* 나이 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  나이 <span className="text-danger">*</span>
                </label>
                <div className="flex gap-3 items-center">
                  <select className="flex-1 px-4 py-3 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] ring-0 outline-none">
                    <option>출생년도 선택해주세요</option>
                  </select>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="age" className="accent-main " />
                    <span className="text-sm text-text-base">이상</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="age" className="accent-main" />
                    <span className="text-sm text-text-base">이하</span>
                  </label>
                </div>
              </div>

              {/* 날짜 */}
              <div className="flex justify-between mb-2">
                <div className="flex flex-col  ">
                  <label className="text-sm text-text-base mb-2">
                    여행 시작 일시 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className=" px-4 py-3 rounded-lg text-sm text-text-base bg-[#EDF4FB] ring-0 outline-none"
                  />
                </div>

                <div className="flex flex-col  ">
                  <label className="text-sm text-text-base mb-2">
                    여행 종료 일시 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 rounded-lg text-sm text-text-base bg-[#EDF4FB] ring-0 outline-none"
                  />
                </div>
              </div>

              {/* 설명 */}
              <div>
                <label className="block text-sm text-text-base mb-2">
                  모집 설명 (0/500)
                </label>
                <textarea
                  rows={4}
                  placeholder="모집 설명을 입력해주세요"
                  className="w-full px-4 py-3 rounded-lg text-sm resize-none placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
                />
              </div>

              {/* 버튼 */}
              <button
                className="w-full py-3 rounded-lg font-medium 
                     bg-bg-disabled text-text-disabled"
              >
                게시하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
