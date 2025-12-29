'use client'

import { Skeleton } from '@/components/ui'

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center xl:pt-14 sm:pt-7.5 px-4">
      <div className="max-w-7xl w-full xl:px-34 sm:px-6">
        <div className="flex gap-6 items-start justify-center">
          <div className="w-full max-w-7xl rounded-lg">
            <div className="flex flex-col items-start sm:mb-6 mb-4 gap-4">
              <div className="flex gap-4 flex-wrap">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-20 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-7 w-3/4" />
              <div className="flex gap-4 w-full flex-wrap">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="space-x-3 flex w-full sm:w-auto">
                <Skeleton className="h-12 flex-1 sm:w-32 rounded-lg" />
                <Skeleton className="h-12 flex-1 sm:w-32 rounded-lg" />
              </div>
            </div>

            <div className="flex sm:flex-row gap-6 sm:my-8 my-4 flex-col">
              <div className="flex-1 min-w-0">
                <Skeleton className="sm:h-71 h-57 w-full rounded-lg" />
              </div>

              <div className="flex sm:px-8 px-6 border sm:pt-10 sm:pb-12 py-8 bg-white border-slate-100 rounded-3xl sm:h-auto">
                <div className="flex sm:flex-col gap-5 items-center justify-center">
                  <div className="flex sm:gap-5 sm:mb-10 gap-3">
                    <Skeleton className="sm:w-20 sm:h-20 size-10 rounded-full" />
                    <div className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                </div>
              </div>
            </div>

            {/* PostInfo Skeleton */}
            <div className="flex flex-col gap-4 mb-8">
              <Skeleton className="h-10 w-4/5" />

              <div className="mt-4">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="rounded-3xl p-6 space-y-4 border border-gray-200">
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

            <div className="bg-gray-300 w-full h-px mt-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
