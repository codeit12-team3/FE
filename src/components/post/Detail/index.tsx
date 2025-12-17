'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import Comment from '@/components/comment'
import { Button } from '@/components/ui'
import { cn } from '@/lib/common'

import PostDetailSkeleton from './PostDetailSkeleton'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostManage from './PostManage'
import PostWriter from './PostWriter'

interface PostDetailProps {
  postId: string
}

function ApplyCompanionModal({
  message,
  onChangeMessage,
  onClose,
  onSubmit,
}: {
  message: string
  onChangeMessage: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}) {
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
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')

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

  const handleToggleBookmark = async () => {
    try {
      if (postDetail.isBookmarked) {
        await removeBookmark.mutateAsync(postId)
      } else {
        await addBookmark.mutateAsync(postId)
      }
    } catch (error) {
      console.error('북마크 토글 실패:', error)
    }
  }
  const handleApplyCompanion = () => {
    applyCompanionMutation.mutate({
      postId,
      applyMessage,
    })
    console.log('동행 신청 성공')
    setIsApplyModalOpen(false)
    setApplyMessage('')
  }

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
    <div className="min-h-screen bg-bg-input py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-8  rounded-lg p-8 ">
            <PostHeader {...headerProps} />
            <PostImages images={postDetail.images} />
            <PostInfo {...infoProps} />
            <Comment />
          </div>

          <div className="col-span-4 sticky  space-y-6">
            <PostWriter writer={writerProps} />
            <div className="space-y-3">
              {postDetail.isOwner ? (
                <PostManage
                  postId={postId}
                  status={postDetail.recruitStatus}
                  onEdit={() => router.push(`/posts/${postId}/edit`)}
                  onChangeStatus={() => {}}
                />
              ) : (
                <div className="flex gap-3 justify-center">
                  <Button size="md" onClick={() => setIsApplyModalOpen(true)}>
                    동행 참여하기
                  </Button>

                  <button
                    onClick={handleToggleBookmark}
                    className="hover:scale-110 transition-transform rounded-full border p-2"
                    aria-label={
                      postDetail.isBookmarked ? '북마크 취소' : '북마크 추가'
                    }
                  >
                    <Heart
                      className={cn(
                        'size-8 text-text-input',
                        postDetail.isBookmarked && 'fill-main text-main',
                      )}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isApplyModalOpen && (
        <ApplyCompanionModal
          message={applyMessage}
          onChangeMessage={setApplyMessage}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleApplyCompanion}
        />
      )}
    </div>
  )
}
