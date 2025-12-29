import { useRouter } from 'next/navigation'

import { useDeletePost, usePatchPost, usePostDetail } from '@/api/posts'
import { IconPencil, IconTrashLight } from '@/assets/svgr'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { RecruitStatus } from '@/types/posts'

export default function PostManage({ postId }: { postId: string }) {
  const { data: post } = usePostDetail({ postId })
  const deletePost = useDeletePost()
  const patchPost = usePatchPost()
  const router = useRouter()

  if (!post || !post.success) return null

  const { recruitStatus } = post.data

  const handleStatusChange = (
    newStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH',
  ) => {
    patchPost.mutate({
      postId,
      recruitStatus: newStatus as RecruitStatus,
    })
  }

  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`)
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠어요?')) return
    deletePost.mutate(postId, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  return (
    <>
      <Select
        value={recruitStatus}
        onValueChange={(value) =>
          handleStatusChange(value as 'RECRUITING' | 'COMPLETED' | 'FINISH')
        }
        disabled={patchPost.isPending}
      >
        <SelectTrigger className="border border-gray-200 rounded-xl" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RECRUITING">모집중</SelectItem>
          <SelectItem value="COMPLETED">멤버 확정</SelectItem>
          <SelectItem value="FINISH">여행 종료</SelectItem>
        </SelectContent>
      </Select>

      <div className="hidden sm:flex gap-4">
        <button
          onClick={handleEdit}
          className="cursor-pointer"
          aria-label="게시글 수정"
        >
          <IconPencil className="text-gray-400 size-6" />
        </button>

        <button
          onClick={handleDelete}
          className="cursor-pointer"
          aria-label="게시글 삭제"
        >
          <IconTrashLight className="text-gray-400 size-6" />
        </button>
      </div>
    </>
  )
}
