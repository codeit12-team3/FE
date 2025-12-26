import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/common'

type BaseCommentItemSkeletonProps = {
  showReplies?: boolean
}

export default function BaseCommentItemSkeleton({
  showReplies = false,
}: BaseCommentItemSkeletonProps) {
  return (
    <div className={cn('flex items-start pb-4')}>
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />

      <div className="w-full flex flex-col justify-center gap-4 pl-[15px]">
        {/* 닉네임과 메뉴 영역 */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="w-5 h-5" />
        </div>

        {/* 댓글 내용 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* 시간 및 답글 달기 버튼 영역 */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          {showReplies && <Skeleton className="h-3 w-16" />}
        </div>
      </div>
    </div>
  )
}
