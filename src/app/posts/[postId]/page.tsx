import { CommentEditProvider } from '@/components/comment/List/CommentItem/CommentEditContext'
import PostDetail from '@/components/post/Detail'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  return (
    <CommentEditProvider>
      <PostDetail postId={postId} />
    </CommentEditProvider>
  )
}
