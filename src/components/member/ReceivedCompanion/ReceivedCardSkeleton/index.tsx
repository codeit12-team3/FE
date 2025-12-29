import { Skeleton } from '@/components/ui'

export default function RecievedCardSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row md:p-6 rounded-3xl md:rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail Skeleton */}
      {/* 원본 이미지의 복잡한 border-radius 및 반응형 사이즈를 그대로 적용 */}
      <Skeleton className="w-full h-[188px] md:w-[188px] md:h-[188px] md:rounded-3xl rounded-t-3xl rounded-b-none md:rounded-b-3xl shrink-0 bg-gray-300" />

      <div className="flex flex-col w-full px-4 pb-4 md:px-0 md:pb-0">
        {/* 여행 태그 영역 */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <Skeleton className="h-6 w-12 rounded-3xl" />
          <Skeleton className="h-6 w-16 rounded-3xl" />
        </div>

        {/* 중단 컨텐츠 (타이틀 + 메시지) */}
        <div className="flex-1 space-y-3 pb-[22px]">
          {/* 게시글 타이틀 */}
          <Skeleton className="h-7 w-3/4 rounded-md" />

          {/* 신청 메시지 (2줄 형태 흉내) */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* 하단 컨텐츠 (유저 정보 + 버튼) */}
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-full mt-auto">
          {/* 유저 정보 & 날짜/지역 */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" /> {/* IconUser 자리 */}
              <Skeleton className="h-4 w-20" /> {/* Nickname */}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" /> {/* 지역 | 날짜 */}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-end gap-2 w-full md:w-auto">
            {/* 버튼 크기(md:w-28, h-10 등)를 Button variant='md' 사이즈에 맞춤 */}
            <Skeleton className="h-10 flex-1 md:w-28 rounded-md" />
            <Skeleton className="h-10 flex-1 md:w-28 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
