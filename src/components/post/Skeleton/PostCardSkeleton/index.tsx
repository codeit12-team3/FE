'use client'

import { Skeleton } from '@/components/ui'

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex md:gap-6 md:flex-row flex-col gap-0">
        <div className="relative md:w-[188px] h-[188px] md:rounded-2xl overflow-hidden shrink-0 bg-gray-200 w-full rounded-t-2xl">
          <Skeleton className="w-full h-full bg-blue-50" />
        </div>

        <div className="flex-1 flex flex-col p-4 md:p-0">
          <div className="flex gap-2.5 mb-4 justify-between items-center">
            <div className="flex gap-2.5 flex-wrap">
              {[1, 2, 3].map((num) => (
                <Skeleton
                  key={num}
                  className="h-6 w-16 rounded-full bg-blue-50"
                />
              ))}
            </div>

            <Skeleton className="size-10 rounded-full bg-blue-50 md:hidden" />
          </div>

          <div className="px-1">
            <Skeleton className="h-7 w-3/4 mb-1.5 bg-blue-50" />

            <div className="flex gap-1.5 mb-2">
              <Skeleton className="h-5 w-12 bg-blue-50" />
              <Skeleton className="h-5 w-20 bg-blue-50" />
            </div>

            <div className="flex flex-col gap-2.5 xl:mt-8 mt-6.5">
              <Skeleton className="h-5 w-16 bg-blue-50" />

              <div className="flex items-center gap-1.5 flex-wrap">
                <Skeleton className="h-4 w-12 bg-blue-50" />
                <Skeleton className="h-4 w-16 bg-blue-50" />
                <Skeleton className="h-4 w-12 bg-blue-50" />
                <Skeleton className="h-4 w-20 bg-blue-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col md:items-end md:p-0 md:justify-between flex-row items-center px-4 pb-4 gap-2">
          <Skeleton className="size-10 rounded-full bg-blue-50 md:flex hidden" />

          <Skeleton className="xl:w-34 h-10 flex-1 md:flex-none w-28 rounded-md bg-blue-50" />
        </div>
      </div>
    </div>
  )
}
