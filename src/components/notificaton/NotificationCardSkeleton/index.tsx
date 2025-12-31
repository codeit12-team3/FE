import { Skeleton } from '@/components/ui'

export default function NotificationCardSkeleton() {
  return (
    <div className="w-full rounded-[20px] bg-white border border-gray-200 p-4 md:px-6 md:py-5 md:rounded-3xl">
      <div className="flex w-full gap-3 md:gap-4">
        {/* 프로필 이미지 스켈레톤 */}
        <Skeleton className="size-12 rounded-full shrink-0" />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex items-center justify-between">
              {/* 닉네임 및 문구 스켈레톤 */}
              <Skeleton className="h-4 w-1/2" />
              {/* 시간 스켈레톤 */}
              <Skeleton className="h-3 w-12" />
            </div>
            {/* 메시지 내용 스켈레톤*/}
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-full" />
            </div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
