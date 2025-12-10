export default function CommentItemSkeleton() {
  return (
    <div className="w-4xl mr-auto p-4">
      <div className="bg-blue-50 rounded-lg p-4 animate-pulse">
        <div className="h-4 w-28 bg-gray-200 rounded-md mb-3" />

        <div className="w-full h-20 bg-gray-200 rounded-md" />

        <div className="flex justify-end gap-2 mt-3">
          <div className="w-16 h-8 bg-gray-200 rounded-md" />
          <div className="w-16 h-8 bg-gray-200 rounded-md" />
        </div>
      </div>
      <div className="flex gap-4 pt-8 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-200" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
              <div className="h-3 w-20 bg-gray-200 rounded-md" />
            </div>

            <div className="w-4 h-4 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2 mt-2">
            <div className="h-4 w-2/3 bg-gray-200 rounded-md" />
          </div>

          <div className="flex gap-4 mt-2">
            <div className="h-3 w-16 bg-gray-200 rounded-md" />
            <div className="h-3 w-20 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
