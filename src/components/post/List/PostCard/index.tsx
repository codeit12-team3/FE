'use client'

import { Heart, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import { useAddBookmark, useRemoveBookmark } from '@/api/posts/posts.mutations'
import { Button } from '@/components/ui'
import { NATION_CODE_TO_LABEL } from '@/constants/posts'
import { getImageUrl } from '@/lib/common'
import { PostListItem } from '@/types/posts'

import ApplyModal from '../../Detail/ApplyModal'

export default function PostCard({ post }: { post: PostListItem }) {
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const applyCompanion = useApplyCompanion()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applyMessage, setApplyMessage] = useState('')
  // TODO: 백엔드에 PostList API에 isApplied 필드 추가 요청 완료
  // 백엔드 작업 완료 후 post.isApplied로 초기값 설정 필요
  const [hasApplied, setHasApplied] = useState(false)
  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (post.isBookmarked) {
      await removeBookmark.mutateAsync(String(post.postId))
    } else {
      await addBookmark.mutateAsync(String(post.postId))
    }
  }
  const handleApplyCompanion = () => {
    applyCompanion.mutate(
      {
        postId: String(post.postId),
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

  const TAG_STYLE = 'px-3 py-1 bg-blue-50 text-main rounded-full text-xs'
  const CARD_BASE =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-input'
  const LABEL = 'text-text-disabled'
  const VALUE = 'text-text-base'
  const INFO_ROW = 'flex items-center gap-1'

  return (
    <div className={CARD_BASE}>
      <div className="flex gap-6">
        {post.recruitStatus === 'COMPLETED' ? (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0">
            <Image
              key={post.thumbnail}
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <p className="text-white">모집이 마감되었어요.</p>
            </div>
          </div>
        ) : (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-bg-disabled">
            <Image
              key={post.thumbnail}
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className={TAG_STYLE}>
                {tag}
              </span>
            ))}
          </div>

          <h3
            className="text-lg font-semibold text-text-base cursor-pointer"
            onClick={() => router.push(`/posts/${post.postId}`)}
          >
            {post.title}
          </h3>

          <div className="flex gap-1">
            <p className="text-sm text-text-disabled">작성자</p>
            <p className="text-sm text-text-input">{post.nickname}</p>
          </div>

          <div className="flex text-sm gap-1 mt-6">
            <User className="w-4 h-4" />
            <span>{post.currentMembers}명 신청</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-input">
            <div className={INFO_ROW}>
              <span className={LABEL}>위치</span>
              <span className={VALUE}>{NATION_CODE_TO_LABEL[post.nation]}</span>
              <span className={VALUE}>{post.region}</span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>날짜</span>
              <span className={VALUE}>
                {new Date(post.period.startDate).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>나이</span>
              <span className={VALUE}>{post.conditions.ageType}</span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>성별</span>
              <span className={VALUE}>{post.conditions.genderCondition}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleToggleBookmark}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-gray-50"
          >
            <Heart
              className={`size-6 ${
                post.isBookmarked ? 'fill-main text-main' : 'fill-gray-300'
              }`}
              strokeWidth={0}
            />
          </button>

          {post.recruitStatus === 'COMPLETED' ? (
            <Button
              size="md"
              className="w-39 bg-bg-disabled text-text-disabled"
              disabled
            >
              모집종료
            </Button>
          ) : hasApplied ? (
            // TODO: 백엔드 작업 후 post.isApplied || hasApplied 조건으로 변경
            <Button
              size="md"
              className="w-39 bg-bg-disabled text-text-disabled"
              disabled
            >
              신청 취소
            </Button>
          ) : (
            <Button
              size="md"
              className="w-39"
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
            >
              신청하기
            </Button>
          )}
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
