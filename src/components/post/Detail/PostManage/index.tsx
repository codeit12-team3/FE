import { useRouter } from 'next/navigation'

import { useDeletePost, usePatchPost } from '@/api/posts'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { RecruitStatus } from '@/types/posts'

export default function PostManage({
  postId,
  status,
  onEdit,
  onChangeStatus,
}: {
  postId: string
  status: 'RECRUITING' | 'COMPLETED' | 'FINISH'
  onEdit: () => void
  onChangeStatus: (v: 'RECRUITING' | 'COMPLETED' | 'FINISH') => void
}) {
  const deletePost = useDeletePost()
  const patchPost = usePatchPost()
  const router = useRouter()

  const handleStatusChange = (
    newStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH',
  ) => {
    patchPost.mutate(
      {
        postId,
        recruitStatus: newStatus as RecruitStatus,
      },
      {
        onSuccess: () => {
          onChangeStatus(newStatus)
        },
      },
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">게시글 관리</h3>

        <Select
          value={status}
          onValueChange={(value) =>
            handleStatusChange(value as 'RECRUITING' | 'COMPLETED' | 'FINISH')
          }
          disabled={patchPost.isPending}
        >
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RECRUITING">모집중</SelectItem>
            <SelectItem value="COMPLETED">멤버 확정</SelectItem>
            <SelectItem value="FINISH">여행 종료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={onEdit}
        >
          게시글 수정
        </Button>
        <Button
          type="button"
          size="md"
          variant="tertiary"
          className="flex-1"
          onClick={() => {
            if (!confirm('정말 삭제하시겠어요?')) return
            deletePost.mutate(postId, {
              onSuccess: () => {
                router.push('/')
              },
            })
          }}
        >
          게시글 삭제
        </Button>
      </div>
    </div>
  )
}
