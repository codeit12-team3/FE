'use client'

import { useRouter } from 'next/navigation'

import { OtherProfile } from '@/components/member'
import { useApply, useBookmarkToggle, usePostManage } from '@/hooks/posts'
import { useModalActions } from '@/stores'
import { PostListItem } from '@/types/posts'

import ApplyModal from '../../Detail/ApplyModal'
import PostCardActions from './CardActions'
import PostCardImage from './CardImage'
import PostCardInfo from './CardInfo'

export default function PostCard({
  post,
  priority,
}: {
  post: PostListItem
  priority?: boolean
}) {
  const router = useRouter()
  const { openModal, closeModal } = useModalActions()
  const { handleApplyCompanion } = useApply(post.postId)

  const { toggleBookmark: handleToggleBookmark } = useBookmarkToggle(
    post.postId,
    post.isBookmarked,
  )

  const { handleEdit, handleDelete } = usePostManage(post.postId)

  const handleOpenApplyModal = () => {
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

  return (
    <div className="bg-white rounded-2xl md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex md:gap-6 md:flex-row flex-col gap-0">
        <PostCardImage
          thumbnail={post.thumbnail}
          title={post.title}
          recruitStatus={post.recruitStatus}
          priority={priority}
        />

        <PostCardInfo
          postId={post.postId}
          title={post.title}
          nickname={post.nickname}
          tags={post.tags}
          isOwner={post.isOwner}
          currentMembers={post.currentMembers}
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
          recruitStatus={post.recruitStatus}
          isApplied={post.isApplied}
          onBookmarkClick={handleToggleBookmark}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onApplyClick={handleOpenApplyModal}
        />
      </div>
    </div>
  )
}
