'use client'

import CommentSkeleton from '@/components/comment/List/Comment/CommentSkeleton'
import { Skeleton } from '@/components/common'

import PostImagesSkeleton from './PostImagesSkeleton'

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg p-8 border border-[#DDDDDD]  space-y-8">
        <div className="space-y-3">
          <Skeleton />
          <div className="flex gap-2"></div>
        </div>
        <PostImagesSkeleton />
        <Skeleton size="sm" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className=" w-14" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton />
          <Skeleton size="sm" />
        </div>
        <div>
          <Skeleton className=" mb-2" />
          <div className="grid grid-cols-2 gap-4 w-2/3">
            <Skeleton size="lg" />
            <Skeleton size="lg" />
          </div>
        </div>
        <div className="space-y-4 w-2/3 ">
          <Skeleton />
          <Skeleton size="lg" className="h-30 " />
        </div>
        <div>
          <Skeleton className="mb-2" />
          <Skeleton className="h-4 w-70 " />
        </div>
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
        <div className="flex gap-3 items-center justify-center my-8">
          <Skeleton className="h-10 w-68" />
          <Skeleton className="h-10 w-68" />
        </div>
        <CommentSkeleton />
      </div>
    </div>
  )
}
