import { Skeleton } from '@/components/common'

export default function CommentSkeleton() {
  return (
    <div className="w-4xl mr-auto p-4">
      <div className=" rounded-lg p-4">
        <Skeleton className="h-4 w-28  mb-3" />

        <Skeleton className="w-full h-20 " />

        <div className="flex justify-end gap-2 mt-3">
          <Skeleton size="sm" />
          <Skeleton size="sm" />
        </div>
      </div>
      <div className="flex gap-4 pt-8 ">
        <Skeleton size="circle" className="w-12 h-12" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>

            <Skeleton size="circle" className="w-4 h-4 " />
          </div>

          <div className="space-y-2 mt-2">
            <Skeleton className="w-2/3 " />
          </div>

          <div className="flex gap-4 mt-2">
            <Skeleton size="sm" />
            <Skeleton size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
