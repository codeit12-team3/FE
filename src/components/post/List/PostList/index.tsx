import { Post } from '@/types/post/post.type'

import FilterBar from '../FilterBar'
import PostListSection from '../PostListSection'

export default function PostList() {
  const posts: Post[] = [
    {
      postId: '1',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'RECRUITING',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: true,
      thumbnail: '/이미지.png',
    },
    {
      postId: '2',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'RECRUITING',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: false,
      thumbnail: '/이미지.png',
    },
    {
      postId: '3',
      title: '제주 2박 3일 동행 구해요',
      region: '제주도',
      period: { startDate: '2025-01-01', endDate: '2025-01-03' },
      status: 'CLOSED',
      currentMembers: 2,
      maxMembers: 4,
      bookmarked: false,
      thumbnail: '/이미지.png',
    },
  ]
  return (
    <div>
      <FilterBar />
      <PostListSection posts={posts} />
    </div>
  )
}
