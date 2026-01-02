import { Skeleton } from '@/components/ui/skeleton'

export function ChatCardSkeleton() {
  return (
    <li className="w-full md:p-6 p-4 flex md:gap-7 gap-3 bg-white rounded-4xl border border-gray-200">
      <div className="self-center">
        <Skeleton className="w-12 h-12 md:w-25 md:h-25 rounded-full" />
      </div>

      <div className="flex-1 flex flex-col min-w-0 gap-1">
        <div className="flex items-center justify-between gap-2.5">
          <Skeleton className="h-5 md:h-7 w-32 md:w-48" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="flex items-center gap-1.5 h-9">
          <Skeleton className="h-4 w-3/4 max-w-[200px]" />
          <Skeleton className="h-4 w-10 ml-auto" />
        </div>
      </div>
    </li>
  )
}
