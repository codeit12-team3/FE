import { notFound } from 'next/navigation'

import { fetchPostsDetail } from '@/api/posts'
import PostDetail from '@/components/post/Detail'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  const initialData = await fetchPostsDetail(postId)

  if (!initialData.success) {
    notFound()
  }

  return <PostDetail postId={postId} initialData={initialData} />
}
