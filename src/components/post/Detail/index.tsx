'use client'

import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { usePostDetail } from '@/api/posts'
import Comment from '@/components/comment'

import { PostDetailSkeleton } from '..'
import ApplyModal from './ApplyModal'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostWriter from './PostWriter'

export default function PostDetail({ postId }: { postId: string }) {
  const { data: response, isLoading } = usePostDetail({ postId })

  const applyCompanion = useApplyCompanion()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')

  const handleApplyCompanion = () => {
    applyCompanion.mutate(
      {
        postId,
        applyMessage,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false)
        },
      },
    )
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
    <div className="min-h-screen bg-gray-50  flex items-center justify-center pt-14">
      <div className="max-w-7xl w-full">
        <div className="flex gap-6 items-start justify-center">
          <div className="w-full max-w-7xl rounded-lg py-8">
            <PostHeader
              postId={postId}
              onOpenApplyModal={() => setIsModalOpen(true)}
            />
            <PostImages images={postDetail.images} />
            <PostInfo postId={postId} />
            <PostWriter postId={postId} />
            <div className="bg-gray-300 w-full h-px mt-12" />
            <Comment commentCount={response.data.commentCount} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ApplyModal
          message={applyMessage}
          onChangeMessage={setApplyMessage}
          onClose={handleCloseModal}
          onSubmit={handleApplyCompanion}
        />
      )}
    </div>
  )
}
