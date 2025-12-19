'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import Comment from '@/components/comment'

import { PostDetailSkeleton } from '..'
import ApplyModal from './ApplyModal'
import PostActions from './PostActions'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostManage from './PostManage'
import PostWriter from './PostWriter'

interface PostDetailProps {
  postId: string
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: response, isLoading } = usePostDetail({ postId })
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const applyCompanion = useApplyCompanion()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')
  // TODO: 백엔드에 PostDetail API에 isApplied 필드 추가 요청 완료
  // 백엔드 작업 완료 후 postDetail.isApplied로 초기값 설정 필요
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
    applyCompanion.mutate(
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
