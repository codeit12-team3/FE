import PostDetail from '@/components/post/Detail'

export default function PostDetailPage({
  params,
}: {
  params: { postId: string }
}) {
  console.log('params:', params)
  return <PostDetail postId={params.postId} />
}
