import { useRouter } from 'next/navigation'

import { useDeletePost } from '@/features/posts/api'

export const usePostManage = (postId: string | number) => {
  const router = useRouter()
  const deletePost = useDeletePost()

  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`)
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠어요?')) return
    deletePost.mutate(String(postId), {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  return {
    handleEdit,
    handleDelete,
    isDeleting: deletePost.isPending,
  }
}
