'use client'

export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg p-8 border border-[#DDDDDD] animate-pulse space-y-8">
        {/* 제목 */}
        <div className="space-y-3">
          <div className="h-7 w-50 bg-bg-disabled rounded-md" />
          <div className="flex gap-2"></div>
        </div>
        {/* 태그 */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="w-32 h-32 bg-bg-disabled rounded-xl" />
          ))}
        </div>
        {/* 이미지 */}
        <div className="h-4 w-20 bg-bg-disabled rounded-md" />
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="h-6 w-14 bg-bg-disabled rounded-full" />
          ))}
        </div>
        {/* 지역 */}
        <div className="space-y-4">
          <div className="h-4 w-30 bg-bg-disabled rounded-md" />
          <div className="h-4 w-10 bg-bg-disabled rounded-md"></div>
        </div>
        {/* 일정 */}
        <div>
          <div className="h-4 w-30 bg-bg-disabled rounded-md mb-2" />
          <div className="grid grid-cols-2 gap-4 w-2/3">
            <div className="h-8 w-full bg-bg-disabled rounded-md" />
            <div className="h-8 w-full bg-bg-disabled rounded-md" />
          </div>
        </div>
        {/* 설명 */}
        <div className="space-y-4">
          <div className="h-4 w-30 bg-bg-disabled rounded-md" />
          <div className="h-30 w-2/3 bg-bg-disabled rounded-md" />
        </div>
        {/* 인원 및 조건 */}
        <div className="h-4 w-30 bg-bg-disabled rounded-md" />
        <div className="h-4 w-70 bg-bg-disabled rounded-md" />
        {/* 작성자 프로필 */}
        <div className="h-6 w-36 bg-bg-disabled rounded-md" />
        <div className="space-y-3 border p-6 rounded-2xl">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-bg-disabled" />
            <div className="space-y-2">
              <div className="h-4 w-20 bg-bg-disabled rounded-md" />
              <div className="h-4 w-28 bg-bg-disabled rounded-md" />
              <div className="h-4 w-24 bg-bg-disabled rounded-md" />
            </div>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex gap-3 items-center justify-center my-8">
          <div className="h-10 w-68 bg-bg-disabled rounded-md" />
          <div className="h-10 w-68 bg-bg-disabled rounded-md" />
        </div>
      </div>
    </div>
  )
}
