import { Skeleton } from '@/components/ui'

export default function SentCardSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row md:p-6 rounded-3xl md:rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail Skeleton */}
      <Skeleton className="w-full h-[188px] md:w-[188px] md:h-[188px] md:rounded-3xl rounded-t-3xl rounded-b-none md:rounded-b-3xl shrink-0 bg-gray-300" />

      <div className="flex flex-col w-full px-4 pb-4 md:px-0 md:pb-0">
        {/* 여행 태그 영역 */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <Skeleton className="h-6 w-12 rounded-3xl" />
          <Skeleton className="h-6 w-14 rounded-3xl" />
        </div>

        {/* 중단 컨텐츠 (타이틀 + 메시지) */}
        <div className="flex-1 space-y-3 pb-[22px]">
          {/* 게시글 타이틀 */}
          <Skeleton className="h-7 w-3/5 rounded-md" />

          {/* 신청 메시지 (2줄 흉내) */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* 하단 컨텐츠 (상태/날짜 + 버튼) */}
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-full mt-auto">
          {/* 좌측: 신청 상태 & 지역/날짜 */}
          <div className="flex flex-col gap-2.5">
            {/* 신청 상태 (예: 대기중, 거절됨) */}
            <Skeleton className="h-5 w-16" />

            {/* 지역 | 날짜 */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* 우측: 버튼 영역 (요청취소 버튼) */}
          <div className="flex items-end gap-2 w-full md:w-auto">
            {/* 모바일에서는 w-full, 데스크탑에서는 w-28 */}
            <Skeleton className="h-10 w-full md:w-28 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
