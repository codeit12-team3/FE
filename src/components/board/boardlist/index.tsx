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
      status: params.status ?? 'RECRUITING',
      currentMembers: 10,
      maxMembers: '',
      bookmarked: false,
      thumbnail: '/이미지.png',
      ageRange: params.ageRange ?? '20-29',
      gender: params.gender ?? 'MALE',
      button: '신청하기',
      buttonStyle: 'primary' as const,
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
      maxMembers: '',
      bookmarked: true,
      thumbnail: '/이미지.png',
      ageRange: params.ageRange ?? '20-29',
      gender: params.gender ?? 'FEMALE',
      button: '모집종료',
      buttonStyle: 'disabled' as const,
      overlay: '모집이 마감되었어요',
      tags: ['여행스타일 태그', '숙소위험 태그'],
    },
  ]

  const filterSelect =
    'px-4 py-2 border border-border rounded-lg text-sm text-text-input bg-white'
  const tagStyle = 'px-3 py-1 bg-blue-50 text-main rounded-full text-xs'
  const cardBase =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border'
  const buttonBase = 'px-6 py-2 rounded-lg font-medium transition-colors'

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <select className={filterSelect}>
            <option>국가</option>
          </select>

          <select className={filterSelect}>
            <option>날짜</option>
          </select>

          <select className={filterSelect}>
            <option>나이</option>
          </select>

          <select className={filterSelect}>
            <option>성별</option>
          </select>

          {/* 검색 */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-bg-input"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input" />
          </div>

          <button className="bg-main text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            동행 구하기
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.postId} className={cardBase}>
              <div className="flex gap-4">
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

                  <p className="text-sm text-text-input mb-3">{post.region}</p>

                  <div className="flex text-sm mb-2 gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.currentMembers}명 신청</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-text-input">
                    <p>
                      <span className="text-text-disabled mr-1">위치</span>
                      {post.region}
                    </p>
                    <p>
                      <span className="text-text-disabled mr-1">날짜</span>
                      {post.period.startDate}
                    </p>
                    <p>
                      <span className="text-text-disabled mr-1">나이</span>
                      {post.ageRange}
                    </p>
                    <p>
                      <span className="text-text-disabled mr-1">성별</span>
                      {post.gender}
                    </p>
                  </div>
                </div>

                {/* Right actions */}
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

                  <button
                    className={`${buttonBase} ${
                      post.buttonStyle === 'primary'
                        ? 'bg-main text-white hover:opacity-90'
                        : post.buttonStyle === 'disabled'
                          ? 'bg-white text-main border border-main hover:bg-blue-50'
                          : 'bg-bg-disabled text-text-disabled cursor-not-allowed'
                    }`}
                    disabled={post.buttonStyle === 'disabled'}
                  >
                    {post.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
