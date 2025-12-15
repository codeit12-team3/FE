import { Skeleton } from '@/components/ui'

export default function PostImagesSkeleton() {
  return (
    <div className="flex gap-3 mb-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-32 h-32 bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  )
}
