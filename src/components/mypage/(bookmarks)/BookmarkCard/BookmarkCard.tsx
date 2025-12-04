import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/common/Button'

import BookmarkIcon from '../../BookmarkIcon/BookmarkIcon'

export default function BookmarkCard() {
  const [bookmark, setBookmark] = useState(false)

  return (
    <div className="h-61 rounded-4xl border-2 bg-white flex p-6">
      <div className="mr-6 relative">
        <Image
          src="/images/cardImage_test.svg"
          alt="게시글 이미지"
          width={188}
          height={188}
          className="rounded-2xl object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/70">
          <span className="text-white font-bold ">모집이 마감되었어요</span>
        </div>
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

        <h2 className="text-xl font-semibold">동행 게시글 제목</h2>
        <span className="text-text-disabled mr-1.5 text-sm font-medium">
          작성자
        </span>
        <span className="text-text-input text-sm font-medium">
          작성자 닉네임
        </span>

        <div className="flex justify-between items-end mt-10">
          <div>
            <div className="flex items-center mb-1">
              <Image
                src="/images/UserIcon.svg"
                alt="신청자"
                width={16}
                height={16}
              />
              <span className="font-medium text-sm text-main ml-1.5">15</span>
              <span className="font-medium text-sm">명 신청</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-text-disabled mr-1.5">위치</span>
              <span className="text-text-input">서울</span>
              <div className="border-l h-4 mx-3"></div>
              <span className="text-text-disabled mr-1.5">날짜</span>
              <span className="text-text-input">11월 17일</span>
              <div className="border-l h-4 mx-3"></div>
              <span className="text-text-disabled mr-1.5">나이</span>
              <span className="text-text-input">나이조건</span>
              <div className="border-l h-4 mx-3"></div>
              <span className="text-text-disabled mr-1.5">성별</span>
              <span className="text-text-input">성별조건</span>
            </div>
          </div>

          <div className="flex gap-3">
            {/* <Button size="md" className="w-39">
              신청하기
            </Button> */}
            <Button size="md" variant="secondary" className="w-39" disabled>
              모집종료
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
