'use client'

import { Skeleton } from '@/components/common'

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border animate-pulse">
      <div className="flex gap-4">
        <Skeleton className="w-[188px] h-[188px] rounded-2xl " />
        <div className="flex-1 ml-3">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((num) => (
              <Skeleton key={num} className="h-6 w-12" />
            ))}
          </div>

          <Skeleton className=" rounded-md mb-2" />

          <div className="flex gap-2 mb-3">
            <Skeleton className="h-4 w-10 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          <div className="flex gap-2 flex-wrap mt-8">
            {[1, 2, 3, 4].map((num) => (
              <Skeleton key={num} size="sm" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Skeleton size="circle" />

          <Skeleton className="w-24 h-10  rounded-md" />
        </div>
      </div>
    </div>
  )
}
