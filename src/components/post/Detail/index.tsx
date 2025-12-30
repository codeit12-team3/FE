'use client'

import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { usePostDetail } from '@/api/posts'
import Comment from '@/components/comment'
import { useModalActions } from '@/stores'

import { PostDetailSkeleton } from '..'
import ApplyModal from './ApplyModal'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostWriter from './PostWriter'

export default function PostDetail({ postId }: { postId: string }) {
  const { data: response, isLoading } = usePostDetail({ postId })

  const applyCompanion = useApplyCompanion()
  const { openModal, closeModal } = useModalActions()

  const [applyMessage, setApplyMessage] = useState('')

  const handleApplyCompanion = () => {
    applyCompanion.mutate(
      {
        postId,
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

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (!response || !response.success || !response.data) {
    return (
      <div className="text-center py-20 text-gray-500">
        게시글을 불러올 수 없습니다.
      </div>
    )
  }

  const postDetail = response.data

  return (
    <div className="min-h-screen bg-gray-50  flex items-center justify-center xl:pt-14 md:pt-7.5 pt-6 px-4">
      <div className="max-w-7xl w-full  md:px-6">
        <div className="flex gap-6 items-start justify-center">
          <div className="w-full max-w-7xl rounded-lg ">
            <PostHeader
              postId={postId}
              onOpenApplyModal={handleOpenApplyModal}
            />
            <div className="flex md:flex-row gap-6 md:my-8 my-4 flex-col  ">
              <div className="flex-1 min-w-0">
                <PostImages images={postDetail.images} />
              </div>
              <PostWriter postId={postId} />
            </div>
            <PostInfo postId={postId} />
            <div className="bg-gray-300 w-full h-px mt-12" />
            <Comment commentCount={postDetail.commentCount} />
          </div>
        </div>
      </div>
    </div>
  )
}
