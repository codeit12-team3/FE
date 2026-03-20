import PostDetail from '@/features/post/components/Detail/PostDetail'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  return <PostDetail postId={postId} />
}
