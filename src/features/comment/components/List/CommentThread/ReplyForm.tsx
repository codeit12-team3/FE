'use client'

import { useSession } from 'next-auth/react'

import { useReplyMutations } from '@/features/comment/api'
import CommentForm from '@/features/comment/components/CommentForm/CommentForm'
import { useCommentInteractionStore } from '@/features/comment/stores'

interface ReplyFormProps {
  postId: number
  parentId: number
}

export default function ReplyForm({ postId, parentId }: ReplyFormProps) {
  const { data: session } = useSession()
  const deactivateInteraction = useCommentInteractionStore(
    (state) => state.deactivate,
  )
  const { create } = useReplyMutations(postId, parentId)

  const handleSubmit = async (text: string) => {
    await create.mutateAsync({ postId, parentId, content: text })
  }

  return (
    <div className="pl-10 pt-6">
      <CommentForm
        mode="reply"
        onSubmit={handleSubmit}
        onDeActivate={deactivateInteraction}
        isSubmitting={create.isPending}
        userImage={session?.user.image ?? null}
      />
    </div>
  )
}
