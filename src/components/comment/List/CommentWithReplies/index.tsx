import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useReplies, useReplyMutations } from '@/api/comments'
import ChevronDown from '@/assets/svgr/chevron-down.svg'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../CommentForm'
import { useCommentInteractionStore } from '../../useCommentInteractionStore'
import CommentItem from '../CommentItem/CommentItem'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentWithReplies({ comment }: CommentThreadProps) {
  const [showReplies, setShowReplies] = useState(false)
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const parentId = comment.commentId

  const isReplying = useCommentInteractionStore((state) =>
    state.isReplying(parentId),
  )
  const closeInteraction = useCommentInteractionStore((state) => state.close)

  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  const { create } = useReplyMutations(postId, parentId)
  const { replies } = useReplies({ commentId: parentId })
  const handleSubmit = (text: string) => {
    create.mutate({
      postId,
      parentId,
      content: text,
    })
    closeInteraction() // 작성 완료 후 닫기
  }

  const onClickShowReplies = () => {
    setShowReplies(!showReplies)
  }
  return (
    <div>
      <CommentItem
        comment={comment}
        currentUserId={currentUserId}
        onReply={onClickShowReplies}
      />

      {isReplying && (
        <div className="pl-10 pt-6">
          <CommentWriteForm
            parentId={parentId}
            onCancel={closeInteraction}
            onSubmit={handleSubmit}
            isSubmitting={create.isPending}
          />
        </div>
      )}
      {!showReplies && replies.length > 0 && (
        <button
          onClick={onClickShowReplies}
          className="text-base font-semibold text-blue-500 flex items-center gap-0.5 hover:bg-gray-200 py-2.5 px-4 ml-[39px] rounded-full"
        >
          <span>답글 보기</span>
          <ChevronDown />
        </button>
      )}

      {showReplies && (
        <>
          <ReplyList
            commentId={parentId}
            currentUserId={currentUserId}
            showReplies={showReplies}
          />
          <button
            onClick={onClickShowReplies}
            className="text-base font-semibold text-blue-500 flex items-center gap-0.5 hover:bg-gray-200 py-2.5 px-4 rounded-full ml-[39px]"
          >
            <span>답글 접기</span>
            <ChevronDown className="rotate-180" />
          </button>
        </>
      )}
    </div>
  )
}
