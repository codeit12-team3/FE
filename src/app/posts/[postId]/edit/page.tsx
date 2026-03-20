import { notFound } from 'next/navigation'

import { fetchPostsDetail } from '@/features/post/api'
import { PostForm } from '@/features/post/components'

export default async function EditPage({
  params,
}: {
  params: Promise<{ postId: string }>
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
