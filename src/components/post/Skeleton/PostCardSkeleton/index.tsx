'use client'

export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border animate-pulse">
      <div className="flex gap-4">
        <div className="w-[188px] h-[188px] rounded-2xl bg-bg-disabled" />
        <div className="flex-1 ml-3">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="h-6 w-12 bg-bg-disabled rounded-full" />
            ))}
          </div>

          <div className="h-6 w-3/4 bg-bg-disabled rounded-md mb-2" />

          <div className="flex gap-2 mb-3">
            <div className="h-4 w-10 bg-bg-disabled rounded-md" />
            <div className="h-4 w-16 bg-bg-disabled rounded-md" />
          </div>

          <div className="flex gap-2 flex-wrap mt-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="h-4 w-20 bg-bg-disabled rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="w-10 h-10 rounded-full bg-bg-disabled" />

          <div className="w-24 h-8 bg-bg-disabled rounded-md" />
        </div>
      </div>
    </div>
  )
}
