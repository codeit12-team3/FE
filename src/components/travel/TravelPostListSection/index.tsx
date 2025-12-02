import { TravelPost } from '@/types/travel/travel'

import TravelPostCard from '../TravelPostCard'

export default function TravelPostListSection({
  posts,
}: {
  posts: TravelPost[]
}) {
  const isEmpty = posts.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {isEmpty ? (
        <div className="w-full h-[300px] flex flex-col items-center justify-center text-center text-text-disabled gap-2">
          <span className="text-lg font-medium">게시글이 없습니다</span>
          <span className="text-sm text-text-input">
            새로운 동행 게시글을 작성해보세요!
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <TravelPostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
