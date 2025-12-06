'use client'

import { Heart, User } from 'lucide-react'
import React, { useState } from 'react'

export default function PostDetail() {
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-sm p-8">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-bold text-text-base">
            게시글 제목 입력단입니다.
          </h1>
          <div className="flex items-center gap-4 text-sm text-text-input">
            <span>게시일자: 2015.11.24</span>
            <span>조회수: 5121</span>
            <span>댓글 9/5</span>
            <button onClick={() => setLiked(!liked)}>
              <Heart
                className={`w-5 h-5 ${liked ? 'fill-main text-main' : 'text-text-input'}`}
              />
            </button>
          </div>
        </div>

        {/* 이미지 */}
        <div className="flex gap-3 mb-6">
          <div className="w-24 h-24 bg-bg-input rounded-lg"></div>
          <div className="w-24 h-24 bg-bg-input rounded-lg"></div>
          <div className="w-24 h-24 bg-bg-input rounded-lg"></div>
        </div>

        {/* 여행 태그 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">
            여행 태그
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm">
              여행스타일태그
            </span>
            <span className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm">
              속소름탐험
            </span>
          </div>
        </div>

        {/* 여행 국가 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">
            여행 국가
          </h3>
          <p className="text-sm text-text-input">국가 이모지 강원도 속초</p>
        </div>

        {/* 여행 시작/종료 일자 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-text-base">
              여행 시작 일자
            </h3>
            <div className="px-4 py-2.5 bg-bg-input rounded-lg text-sm text-text-input">
              2025-00-00 12:00 PM
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2 text-text-base">
              여행 종료 일자
            </h3>
            <div className="px-4 py-2.5 bg-bg-input rounded-lg text-sm text-text-input">
              2025-00-00 12:00 PM
            </div>
          </div>
        </div>

        {/* 모집 설명 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">
            모집 설명
          </h3>
          <div className="px-4 py-4 bg-bg-input rounded-lg text-sm text-text-input min-h-[120px]">
            모임 설명을 입력해주세요
          </div>
        </div>

        {/* 모집 일정 및 조건 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">
            모집 일정 및 조건
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-input">총 0 명</span>
            <span className="text-main font-medium">0000</span>
            <span className="text-text-input">년생</span>
            <span className="text-text-input">(만 00세)</span>
            <span className="text-main">이상</span>
            <span className="text-main">남성만</span>
          </div>
        </div>

        {/* 작성자 프로필 */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 text-text-base">
            작성자프로필
          </h3>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bg-input rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-text-input" />
              </div>
              <div>
                <p className="font-semibold text-text-base">림관수호</p>
                <div className="flex gap-4 text-xs text-text-input mt-1">
                  <span>나이: 30대 / 성별: M</span>
                  <span>MBTI: EEEE</span>
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-text-input">
              <div>NNNN년생 / 남</div>
              <div className="mt-1">동행인원: 00명</div>
              <div>동행자제: 00명</div>
              <div>작성게시: 00개</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 bg-main rounded-full flex items-center justify-center text-white font-bold">
                  원석
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-gray-300 rounded-lg text-text-base font-medium hover:bg-bg-input">
            뒤로가기
          </button>
          <button className="flex-1 py-3 bg-main rounded-lg text-white font-medium hover:opacity-90">
            동행 참여하기
          </button>
        </div>
      </div>
    </div>
  )
}
