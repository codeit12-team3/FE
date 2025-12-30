'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import {
  useAddBookmark,
  useDeletePost,
  useRemoveBookmark,
} from '@/api/posts/posts.mutations'
import { useModalActions } from '@/stores'
import { PostListItem } from '@/types/posts'

import ApplyModal from '../../Detail/ApplyModal'
import PostCardActions from './CardActions'
import PostCardImage from './CardImage'
import PostCardInfo from './CardInfo'

export default function PostCard({
  post,
  priority = false,
}: {
  post: PostListItem
  priority?: boolean
}) {
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const applyCompanion = useApplyCompanion()
  const deletePost = useDeletePost()
  const { openModal, closeModal } = useModalActions()

  const [applyMessage, setApplyMessage] = useState('')

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (post.isBookmarked) {
      await removeBookmark.mutateAsync(post.postId)
    } else {
      await addBookmark.mutateAsync(post.postId)
    }
  }

  const handleApplyCompanion = () => {
    applyCompanion.mutate(
      {
        postId: post.postId,
        applyMessage,
      },
      {
        onSuccess: () => {
          closeModal()
        },
      },
    )
  }

  const handleOpenApplyModal = () => {
    openModal(
      <ApplyModal
        message={applyMessage}
        onChangeMessage={setApplyMessage}
        onClose={closeModal}
        onSubmit={handleApplyCompanion}
      />,
    )
  }

  const handleEdit = () => {
    router.push(`/posts/${post.postId}/edit`)
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠어요?')) return
    deletePost.mutate(String(post.postId), {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  const handleTitleClick = () => {
    router.push(`/posts/${post.postId}`)
  }

  const CARD_BASE =
    'bg-white rounded-2xl md:p-6 shadow-sm hover:shadow-md transition-shadow'

  return (
    <div className={CARD_BASE}>
      <div className="flex md:gap-6 md:flex-row flex-col gap-0">
        <PostCardImage
          thumbnail={post.thumbnail}
          title={post.title}
          priority={priority}
          recruitStatus={post.recruitStatus}
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
