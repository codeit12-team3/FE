import { TravelPost } from '@/types/meeting/travel'

import TravelPostCard from '../TravelPostCard'

export default function TravelPostListSection({
  posts,
}: {
  posts: TravelPost[]
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      {posts.map((post) => (
        <TravelPostCard key={post.postId} post={post} />
      ))}
    </div>
  )
}
