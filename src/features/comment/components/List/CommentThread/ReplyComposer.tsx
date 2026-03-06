'use client'

import { useSession } from 'next-auth/react'

import { useReplyMutations } from '@/features/comment/api'
import { useCommentInteractionStore } from '@/features/comment/hooks/useCommentInteractionStore'

import CommentForm from '../../CommentForm/CommentForm'

interface ReplyComposerProps {
  postId: number
  parentId: number
}

export default function ReplyComposer({
  postId,
  parentId,
}: ReplyComposerProps) {
  const { data: session } = useSession()

  const isReplying = useCommentInteractionStore((state) =>
    state.isReplying(parentId),
  )
  const closeInteraction = useCommentInteractionStore((state) => state.close)

  const { createReplyMutation } = useReplyMutations(postId, parentId)

  const handleSubmit = async (text: string) => {
    await createReplyMutation.mutateAsync({
      postId,
      parentId,
      content: text,
    })
  }

  if (!isReplying) return null

  return (
    <div className="pl-10 pt-6">
      <CommentForm
        mode="reply"
        onSubmit={handleSubmit}
        onClose={closeInteraction}
        isSubmitting={createReplyMutation.isPending}
        userImage={session?.user.image ?? null}
      />
    </div>
  )
}
