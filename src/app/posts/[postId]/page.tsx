import PostDetail from '@/features/posts/components/Detail'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  return <PostDetail postId={postId} />
}
