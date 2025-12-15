import { notFound } from 'next/navigation'

import { fetchPostsDetail } from '@/api/posts'
import { PostForm } from '@/components/post'

export default async function EditPage({
  params,
}: {
  params: { postId: string }
}) {
  const { postId } = await params
  const initialData = await fetchPostsDetail(postId)
  if (!initialData.success) {
    notFound()
  }
  return (
    <div>
      <PostForm postId={postId} initialData={initialData.data} mode="edit" />
    </div>
  )
}
