import { Skeleton } from '@/components/ui'

export default function SentCardSkeleton() {
  return (
    <div className="w-full flex p-6 h-[236px] rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail Skeleton */}
      <div className="relative size-[188px] rounded-3xl overflow-hidden shrink-0">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col w-full">
        {/* 여행 태그 영역 */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-14 h-7 rounded-3xl" />
          <Skeleton className="w-14 h-7 rounded-3xl" />
        </div>

        {/* 중단 컨텐츠 영역 */}
        <div className="flex-1 pt-3.5 pb-[22px]">
          {/* 게시글 타이틀 */}
          <Skeleton className="h-7 w-3/4 mb-2" />
          {/* 신청 메시지 */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* 하단 컨텐츠 영역 */}
        <div className="flex justify-between w-full items-end">
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-5 w-16" />

            {/* 지역 및 날짜 */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="border-l border-gray-200 h-3" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-end gap-2">
            <Skeleton className="w-28 h-10 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
