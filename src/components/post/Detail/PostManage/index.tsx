import { useRouter } from 'next/navigation'

import { RecruitStatus, useDeletePost, usePatchPost } from '@/api/posts'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'

export default function OwnerPostManageManageCard({
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
        onError: (error) => {
          console.error('모집 상태 변경 실패:', error)
          alert('모집 상태 변경에 실패했습니다.')
        },
      },
    )
  }

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">게시글 관리</h3>

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
            <SelectItem value="COMPLETED">모집마감</SelectItem>
            <SelectItem value="FINISH">여행종료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 ">
        <Button size="md" className="flex-1" onClick={onEdit}>
          게시글 수정
        </Button>
        <Button
          type="button"
          size="md"
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
