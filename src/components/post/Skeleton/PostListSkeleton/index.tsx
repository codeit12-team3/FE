import PostCardSkeleton from '../PostCardSkeleton'

export default function PostListSkeleton() {
  return (
    <div className="w-7xl mx-auto p-4">
      <div className="space-y-4">
        {[1, 2, 3].map((num) => (
          <PostCardSkeleton key={num} />
        ))}
      </div>
    </div>
  )
}
