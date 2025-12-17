'use client'

import { useCommentMutations } from '@/api/comments'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// CommentDelete.tsx
interface Props {
  commentId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CommentDelete({
  commentId,
  open,
  onOpenChange,
}: Props) {
  const { deleteComment } = useCommentMutations()
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 댓글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteComment.mutate({ commentId })
              onOpenChange(false)
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
