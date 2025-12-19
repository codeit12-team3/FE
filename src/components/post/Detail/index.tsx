'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import Comment from '@/components/comment'
import { Button } from '@/components/ui'

import { PostDetailSkeleton } from '..'
import PostActions from './PostActions'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostManage from './PostManage'
import PostWriter from './PostWriter'

interface PostDetailProps {
  postId: string
}

interface ApplyCompanionModalProps {
  message: string
  onChangeMessage: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}

function ApplyCompanionModal({
  message,
  onChangeMessage,
  onClose,
  onSubmit,
}: ApplyCompanionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">동행 신청 메시지</h2>

        <textarea
          value={message}
          onChange={(e) => onChangeMessage(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          placeholder="신청 메시지를 입력해주세요"
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onSubmit}>신청하기</Button>
        </div>
      </div>
    </div>
  )
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: response, isLoading } = usePostDetail({ postId })
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const applyCompanionMutation = useApplyCompanion()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')
  const [hasApplied, setHasApplied] = useState(false)

  const handleToggleBookmark = () => {
    if (!postDetail) return
    if (postDetail.isBookmarked) {
      removeBookmark.mutate(postId)
    } else {
      addBookmark.mutate(postId)
    }
  }

  const handleApplyCompanion = () => {
    applyCompanionMutation.mutate(
      {
        postId,
        applyMessage,
      },
      {
        onSuccess: () => {
          setHasApplied(true)
          alert('동행 신청이 완료되었습니다!')
          setIsModalOpen(false)
          setApplyMessage('')
        },
        onError: (error) => {
          alert(`신청 실패: ${error.message}`)
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

  const headerProps = {
    tags: postDetail.tags,
    title: postDetail.title,
    timestamp: postDetail.createdAt,
    stats: { viewCount: postDetail.stats.viewCount },
    commentCount: postDetail.commentCount,
    isBookmarked: postDetail.isBookmarked,
    onToggleBookmark: handleToggleBookmark,
  }

  const infoProps = {
    nation: postDetail.nation,
    region: postDetail.region,
    period: postDetail.period,
    content: postDetail.content,
    stats: {
      maxMembers: postDetail.stats.maxMembers,
      currentMembers: postDetail.stats.currentMembers,
    },
    conditions: postDetail.conditions,
  }

  const writerProps = {
    nickname: postDetail.writer.nickname,
    age: postDetail.writer.age,
    gender: postDetail.writer.gender as 'MALE' | 'FEMALE',
    mbti: postDetail.writer.mbti,
    birth: postDetail.writer.birth,
  }
  return (
    <div className="min-h-screen bg-bg-input p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="flex gap-6 items-start justify-center">
          <div className="w-full max-w-2xl rounded-lg py-8">
            <PostHeader {...headerProps} />
            <PostImages images={postDetail.images} />
            <PostInfo {...infoProps} />
            <div className="bg-gray-300 w-full h-px mt-12" />
            <Comment postId={postId} />
          </div>

          <div className="w-80 sticky space-y-6 py-8">
            <PostWriter writer={writerProps} />

            {postDetail.isOwner ? (
              <PostManage
                postId={postId}
                status={postDetail.recruitStatus}
                onEdit={() => router.push(`/posts/${postId}/edit`)}
                onChangeStatus={() => {}}
              />
            ) : (
              <PostActions
                onApply={() => setIsModalOpen(true)}
                hasApplied={hasApplied}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ApplyCompanionModal
          message={applyMessage}
          onChangeMessage={setApplyMessage}
          onClose={handleCloseModal}
          onSubmit={handleApplyCompanion}
        />
      )}
    </div>
  )
}
