import PostCardSkeleton from './PostCard/PostCardSkeleton'

export default function PostListSkeleton() {
  return (
    <div className="max-w-7xl">
      <div className="space-y-4">
        {[1, 2, 3].map((num) => (
          <PostCardSkeleton key={num} />
        ))}
      </div>
    </div>
  )
}
