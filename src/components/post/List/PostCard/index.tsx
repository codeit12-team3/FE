'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useCancelCompanion } from '@/api/companions'
import { toast } from '@/components/common'
import { OtherProfile } from '@/components/member'
import {
  useApply,
  useBookmarkToggle,
  useCompanionId,
  usePostManage,
} from '@/hooks/posts'
import { isDatePassed } from '@/lib/common/time-format'
import { useModalActions } from '@/stores'
import { SentCompanionContent } from '@/types/companions'
import { PostListItem } from '@/types/posts'

import ApplyModal from '../../Detail/ApplyModal'
import PostCardActions from './CardActions'
import PostCardImage from './CardImage'
import PostCardInfo from './CardInfo'

export default function PostCard({
  post,
  priority,
  data,
}: {
  post: PostListItem
  priority?: boolean
  data?: SentCompanionContent
}) {
  const router = useRouter()
  const { openModal, closeModal } = useModalActions()
  const { handleApplyCompanion } = useApply(post.postId)
  const { mutate, isPending } = useCancelCompanion()
  const { toggleBookmark: handleToggleBookmark } = useBookmarkToggle(
    post.postId,
    post.isBookmarked,
  )
  const { handleEdit, handleDelete } = usePostManage(post.postId)
  const { data: session } = useSession()

  // 커스텀 훅으로 companionId 조회 (O(1) 성능 최적화)
  const companionId = useCompanionId(post.postId, data, !!session?.user)

  const handleCancelCompanion = async (companionId: string) => {
    mutate(companionId, {
      onSuccess: () => {
        toast.success('동행 요청이 취소 되었습니다')
      },
      onError: () => {
        toast.error('동행 요청 취소에 실패했습니다')
      },
    })
  }
  const handleOpenApplyModal = () => {
    if (!session?.user) {
      toast.error('로그인이 필요한 서비스입니다.')
      router.push('/auth/signin')
      return
    }
    openModal(
      <ApplyModal
        onClose={closeModal}
        onSubmit={(message) => {
          handleApplyCompanion(message, closeModal)
        }}
      />,
    )
  }

  const handleTitleClick = () => {
    router.push(`/posts/${post.postId}`)
  }
  const handleWriterClick = () => {
    openModal(<OtherProfile memberId={String(post.writer.memberId)} />)
  }
  const actualRecruitStatus = useMemo(() => {
    if (post.recruitStatus === 'COMPLETED' || post.recruitStatus === 'FINISH') {
      return post.recruitStatus
    }
    return isDatePassed(post.period.endDate) ? 'COMPLETED' : post.recruitStatus
  }, [post.recruitStatus, post.period.endDate])
  return (
    <div className="bg-white rounded-2xl md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex md:gap-6 md:flex-row flex-col gap-0">
        <PostCardImage
          thumbnail={post.thumbnail}
          title={post.title}
          recruitStatus={actualRecruitStatus}
          priority={priority}
        />

        <PostCardInfo
          postId={post.postId}
          title={post.title}
          nickname={post.nickname}
          tags={post.tags}
          isOwner={post.isOwner}
          currentMembers={post.currentMembers + (post.isApplied ? 1 : 0)}
          nation={post.nation}
          period={post.period}
          conditions={post.conditions}
          onTitleClick={handleTitleClick}
          onWriterClick={handleWriterClick}
          onBookmarkClick={handleToggleBookmark}
          isBookmarked={post.isBookmarked}
        />

        <PostCardActions
          isOwner={post.isOwner}
          isBookmarked={post.isBookmarked}
          recruitStatus={actualRecruitStatus}
          isApplied={post.isApplied}
          onBookmarkClick={handleToggleBookmark}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onApplyClick={handleOpenApplyModal}
          onCancel={
            companionId ? () => handleCancelCompanion(companionId) : undefined
          }
          isCanceling={isPending}
        />
      </div>
    </div>
  )
}
