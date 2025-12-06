'use client'

import { Heart, User } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/common'

import Comment from '../Comment'

export default function PostDetail() {
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-sm p-8">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-bold text-text-base">
            게시글 제목입니다.
          </h1>
          <div className="flex items-center gap-4 text-sm text-text-input">
            <span>게시일자: yyyy.mm.dd</span>
            <span>조회수: 0000</span>
            <span>댓글 갯수</span>
            <button onClick={() => setLiked(!liked)}>
              <Heart
                className={`w-5 h-5 ${liked ? 'fill-main text-main' : 'text-text-input'}`}
              />
            </button>
          </div>
        </div>

        {/* 이미지 */}
        <div className="flex gap-3 mb-6">
          <div className="w-24 h-24 bg-blue-50 rounded-lg"></div>
          <div className="w-24 h-24 bg-blue-50 rounded-lg"></div>
          <div className="w-24 h-24 bg-blue-50 rounded-lg"></div>
        </div>

        {/* 여행 태그 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">태그</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm">
              여행스타일태그
            </span>
            <span className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm">
              속소취향태그
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
        <div className="grid grid-cols-2 gap-4 mb-6 w-1/2">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-text-base">
              여행 시작 일자
            </h3>
            <div className="px-4 py-2.5 bg-blue-50 rounded-lg text-sm text-text-input">
              2025-00-00
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2 text-text-base">
              여행 종료 일자
            </h3>
            <div className="px-4 py-2.5 bg-blue-50 rounded-lg text-sm text-text-input">
              2025-00-00
            </div>
          </div>
        </div>

        {/* 모집 설명 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-text-base">
            모집 설명
          </h3>
          <div className="px-4 py-4 bg-b rounded-lg bg-blue-50 text-sm text-text-input min-h-[120px]">
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
            <span className="text-main">나이조건</span>

            <span className="text-main">성별조건</span>
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
              <div className="flex gap-8">
                <p className="font-semibold text-text-base">닉네임</p>
                <div className="flex gap-1 text-xs text-text-input mt-1 flex-col">
                  <span>나이: 30대 / 성별: M</span>
                  <span>MBTI: EEEE</span>
                  <span>NNNN년생 / 남</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 items-center justify-center">
          <Button variant="secondary" size="md" className="w-68">
            뒤로가기
          </Button>
          <Button size="md" className="w-68">
            참여하기
          </Button>
        </div>
        <Comment />
      </div>
    </div>
  )
}
