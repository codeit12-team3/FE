// app/posts/[postId]/page.tsx
import { notFound } from 'next/navigation'

import { fetchPostsDetail } from '@/api/posts'
import PostDetail from '@/components/post/Detail'

export default async function PostDetailPage({
  params,
}: {
  params: { postId: string }
}) {
  const postId = params.postId
  const initialData = await fetchPostsDetail(postId)

  if (!initialData.success) {
    notFound()
  }

  return <PostDetail postId={postId} initialData={initialData} />
}
