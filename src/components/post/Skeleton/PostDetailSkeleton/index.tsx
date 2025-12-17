'use client'

import CommentSkeleton from '@/components/comment/List/CommentSkeleton'
import { Skeleton } from '@/components/ui'

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-input py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-8 rounded-lg p-8">
            <div className="flex flex-col items-start mb-6 gap-4">
              <div className="flex gap-4 flex-wrap">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-20 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-7 w-3/4" />
              <div className="flex gap-4 w-full">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="mb-6">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <Skeleton className="h-10 w-4/5" />

              <div className="mt-4">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </div>
            </div>

            <CommentSkeleton />
          </div>

          <div className="col-span-4 sticky space-y-6">
            <div className="flex flex-col p-8 border-2 border-gray-200 rounded-2xl gap-10">
              <div className="flex gap-5">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="flex flex-col gap-2 mt-1 flex-1">
                  <Skeleton className="h-6 w-16 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <div className="flex-col gap-2 justify-center items-center w-full space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>

            <div className="space-x-3 flex">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
