import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/common/Button'

import BookmarkIcon from '../BookmarkIcon/BookmarkIcon'

export default function ReceivedCard() {
  const [bookmark, setBookmark] = useState(false)

  return (
    <div className="h-61 rounded-4xl border-2 bg-white flex p-6">
      <div className="mr-6">
        <Image
          src="/images/cardImage_test.svg"
          alt="게시글 이미지"
          width={188}
          height={188}
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 bg-[#EDF4FB] text-main text-sm font-semibold rounded-3xl">
              여행스타일 태그
            </span>
            <span className="px-3 py-1.5 bg-[#EDF4FB] text-main text-sm font-semibold rounded-3xl">
              숙소취향 태그
            </span>
          </div>
          <BookmarkIcon
            filled={bookmark}
            onClick={() => setBookmark((prev) => !prev)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">동행 게시글 제목</h2>
        <p className="max-w-prose my-2 text-text-input leading-relaxed">
          안녕하세요! 게시글 보고 여행 일정이 너무 마음에 들어 연락드립니다.
          저도 일정과 지역이 잘 맞아서 함께 여행할 수 있으면 좋겠어요.
        </p>

        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Image
                src="/images/UserIcon.svg"
                alt="신청자"
                width={16}
                height={16}
              />
              <span className="font-medium text-sm">신청자 닉네임</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-text-disabled mr-1.5">위치</span>
              <span className="text-text-input">서울</span>
              <div className="border-l h-4 mx-3"></div>
              <span className="text-text-disabled mr-1.5">날짜</span>
              <span className="text-text-input">11월 17일</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="md" className="w-39">
              수락하기
            </Button>
            <Button size="md" variant="secondary" className="w-39">
              거절하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
