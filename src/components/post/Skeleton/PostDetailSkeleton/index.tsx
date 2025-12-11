'use client'

import { Skeleton } from '@/components/common'

import CommentSkeleton from '../CommentSkeleton'

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg p-8 border border-[#DDDDDD]  space-y-8">
        <div className="space-y-3">
          {/* 제목 */}
          <Skeleton />
          <div className="flex gap-2"></div>
        </div>
        {/* 이미지 */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3].map((num) => (
            <Skeleton key={num} className="w-32 h-32" />
          ))}
        </div>
        {/* 태그 */}
        <Skeleton size="sm" />
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <Skeleton key={num} className=" w-14" />
          ))}
        </div>
        {/* 국가 */}
        <div className="space-y-4">
          <Skeleton />
          <Skeleton size="sm" />
        </div>
        {/* 일정 */}
        <div>
          <Skeleton className=" mb-2" />
          <div className="grid grid-cols-2 gap-4 w-2/3">
            <Skeleton size="lg" />
            <Skeleton size="lg" />
          </div>
        </div>
        {/* 설명 */}
        <div className="space-y-4 w-2/3 ">
          <Skeleton />
          <Skeleton size="lg" className="h-30 " />
        </div>
        {/* 인원 및 조건 */}
        <div>
          <Skeleton className="mb-2" />
          <Skeleton className="h-4 w-70 " />
        </div>
        {/* 작성자 프로필 */}
        <Skeleton />
        <div className="space-y-3 border p-6 rounded-2xl">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton size="sm" className="mr-20 mt-4" />
            <div className="flex gap-60">
              <div className="space-y-2">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
              <div className="space-y-2">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex gap-3 items-center justify-center my-8">
          <Skeleton className="h-10 w-68" />
          <Skeleton className="h-10 w-68" />
        </div>
        <CommentSkeleton />
      </div>
    </div>
  )
}
