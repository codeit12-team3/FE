'use client'

import { Skeleton } from '@/components/ui'

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm  ">
      <div className="flex gap-4">
        <Skeleton className="w-[188px] h-[188px] rounded-2xl bg-blue-50" />
        <div className="flex-1 flex flex-col justify-between ml-3">
          <div>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3].map((num) => (
                <Skeleton key={num} className="h-6 w-12 bg-blue-50" />
              ))}
            </div>
            <Skeleton className=" rounded-md mb-2 bg-blue-50 h-7.5 w-30" />

            <div className="flex gap-2 mb-2">
              <Skeleton className=" rounded-md h-4 w-8 bg-blue-50" />
              <Skeleton className=" rounded-md h-4 w-8 bg-blue-50" />
            </div>
          </div>
          <div>
            <div className="flex gap-2 mt-8 mb-3">
              <Skeleton className="h-4 w-10 rounded-md bg-blue-50" />
              <Skeleton className="h-4 w-16 rounded-md bg-blue-50" />
            </div>

            <div className="flex gap-2 flex-wrap  ">
              {[1, 2, 3, 4].map((num) => (
                <Skeleton
                  key={num}
                  className="h-4 w-20 rounded-md bg-blue-50"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Skeleton className="size-10 rounded-full bg-blue-50" />

          <Skeleton className="w-24 h-10  rounded-md bg-blue-50" />
        </div>
      </div>
    </div>
  )
}
