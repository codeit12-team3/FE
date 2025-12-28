import { Skeleton } from '@/components/ui'

export default function RecievedCardSkeleton() {
  return (
    <div className="w-full flex p-6 h-[236px] rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail Skeleton */}
      <Skeleton className="size-[188px] rounded-3xl shrink-0" />

      <div className="flex flex-col w-full">
        {/* 여행 태그 영역 */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-14 h-[30px] rounded-3xl" />
          <Skeleton className="w-14 h-[30px] rounded-3xl" />
        </div>

        {/* 중단 컨텐츠 영역 */}
        <div className="flex-1 pt-3.5 pb-[22px] flex flex-col gap-2">
          {/* 타이틀 */}
          <Skeleton className="h-7 w-[250px]" />
          {/* 신청 메시지 (2줄) */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* 하단 컨텐츠 영역 */}
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-2.5">
            {/* 닉네임 */}
            <div className="flex items-center gap-1">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            {/* 지역 및 날짜 */}
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-4 w-24" />
              <div className="border-l border-gray-200 h-3" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <Skeleton className="md:w-28 h-10 rounded-md" />
            <Skeleton className="md:w-28 h-10 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
