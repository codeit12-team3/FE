'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import {
  useAddBookmark,
  useDeletePost,
  useRemoveBookmark,
} from '@/api/posts/posts.mutations'
import { IconCrownSolid, IconUser } from '@/assets/svgr'
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
  const deletePost = useDeletePost()
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
          setIsModalOpen(false)
        },
      },
    )
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const TAG_STYLE = 'px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-500'
  const CARD_BASE =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow '

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
              <p className="text-white text-xl font-bold">모집 마감</p>
            </div>
          </div>
        ) : (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-gray-200">
            <Image
              key={post.thumbnail}
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col ">
          <div className="flex gap-2.5 mb-3.5">
            {post.tags.map((tag) => (
              <span key={tag} className={TAG_STYLE}>
                {tag}
              </span>
            ))}
          </div>
          <div className="px-1">
            <div className="flex gap-1.5">
              <h3
                className="text-xl font-bold cursor-pointer mb-1.5"
                onClick={() => router.push(`/posts/${post.postId}`)}
              >
                {post.title}
              </h3>
              {post.isOwner && <IconCrownSolid className="text-blue-500" />}
            </div>
            <div className="flex gap-1.5 text-sm">
              <p className="text-gray-400">작성자</p>
              <p className="text-gray-600">{post.nickname}</p>
            </div>
            <div className="flex flex-col gap-2.5 mt-8">
              <div className="flex text-sm gap-1 ">
                <IconUser />
                <span>
                  <span className="text-blue-500">{post.currentMembers}</span>명
                  신청
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-sm ">
                <span className="text-gray-400">위치</span>
                <span className="text-gray-600">
                  {NATION_CODE_TO_LABEL[post.nation]}
                </span>

                <span className="text-gray-300">|</span>

                <span className="text-gray-400">날짜</span>
                <span className="text-gray-600">
                  {new Date(post.period.startDate).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>

                <span className="text-gray-300">|</span>

                <span className="text-gray-400">나이</span>
                <span className="text-gray-600">{post.conditions.ageType}</span>

                <span className="text-gray-300">|</span>

                <span className="text-gray-400">성별</span>
                <span className="text-gray-600">
                  {post.conditions.genderCondition}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleToggleBookmark}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 cursor-pointer"
          >
            <Heart
              className={`size-6 ${
                post.isBookmarked ? 'fill-blue-500' : 'fill-gray-300'
              }`}
              strokeWidth={0}
            />
          </button>

          {post.isOwner ? (
            <div className="flex gap-2">
              <Button
                size="md"
                variant="secondary"
                className="w-34"
                onClick={() => router.push(`/posts/${post.postId}/edit`)}
              >
                수정하기
              </Button>

              <Button
                size="md"
                variant="tertiary"
                className="w-34"
                onClick={() => {
                  if (!confirm('정말 삭제하시겠어요?')) return
                  deletePost.mutate(String(post.postId), {
                    onSuccess: () => {
                      router.push('/')
                    },
                  })
                }}
              >
                삭제하기
              </Button>
            </div>
          ) : post.recruitStatus === 'COMPLETED' ? (
            <Button size="md" disabled className="w-34">
              모집종료
            </Button>
          ) : post.isApplied ? (
            <Button size="md" variant="secondary" className="w-34">
              신청 취소
            </Button>
          ) : (
            <Button
              size="md"
              className="w-34"
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
