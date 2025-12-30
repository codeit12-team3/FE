'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useApplyCompanion } from '@/api/companions'
import {
  useAddBookmark,
  useDeletePost,
  useRemoveBookmark,
} from '@/api/posts/posts.mutations'
import {
  IconCrownSolid,
  IconHeart,
  IconHeartSolid,
  IconUser,
} from '@/assets/svgr'
import { OtherProfile } from '@/components/member'
import { Button } from '@/components/ui'
import { NATION_CODE_TO_LABEL } from '@/constants/posts'
import { getImageUrl } from '@/lib/common'
import { useModalActions } from '@/stores'
import { PostContent, PostListItem } from '@/types/posts'

import ApplyModal from '../../Detail/ApplyModal'

export default function PostCard({
  post,
  detail,
  priority = false,
}: {
  post: PostListItem
  detail?: PostContent
  priority?: boolean
}) {
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const applyCompanion = useApplyCompanion()

  const [applyMessage, setApplyMessage] = useState('')
  const deletePost = useDeletePost()
  const { openModal, closeModal } = useModalActions()

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

  const handleOtherProfile = (memberId: string) => {
    openModal(<OtherProfile memberId={memberId} />)
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

  const CARD_BASE =
    'bg-white rounded-2xl md:p-6  shadow-sm hover:shadow-md transition-shadow '

  return (
    <div className={CARD_BASE}>
      <div className="flex md:gap-6 md:flex-row flex-col gap-0 ">
        <div className="relative md:w-[188px] h-[188px] md:rounded-2xl overflow-hidden shrink-0 bg-gray-200 w-full  rounded-t-2xl ">
          <Image
            key={post.thumbnail}
            src={getImageUrl(post.thumbnail)}
            alt={post.title}
            width={188}
            height={188}
            priority={priority}
            style={{ width: '100%', height: '100%' }}
            className="object-cover aspect-video flex items-center justify-center"
          />
          {post.recruitStatus === 'COMPLETED' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <p className="text-white text-xl font-bold">모집 마감</p>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col  md:px-4 justify-between">
          <div className="xl:pb-4">
            <div className="flex gap-2.5 items-center justify-between  pb-3.5">
              <div className="flex gap-2.5  flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={handleToggleBookmark}
                className="w-10 h-10 md:hidden flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 cursor-pointer"
              >
                {post.isBookmarked ? <IconHeartSolid /> : <IconHeart />}
              </button>
            </div>

            <div className="flex gap-1.5 px-1 md:pb-1">
              <h3
                className="text-xl font-bold cursor-pointer hover:underline"
                onClick={() => router.push(`/posts/${post.postId}`)}
              >
                {post.title}
              </h3>
              {post.isOwner && (
                <IconCrownSolid className="size-6 text-blue-500 " />
              )}
            </div>
            <div className="flex gap-1.5 text-sm px-1">
              <p className="text-gray-400">작성자</p>
              <p
                className={`text-gray-600 ${detail ? 'cursor-pointer' : ''}`}
                onClick={() =>
                  detail && handleOtherProfile(String(detail.writer.memberId))
                }
              >
                {post.nickname}
              </p>
            </div>
          </div>
          <div className="flex flex-col    px-1">
            <div className="flex text-sm gap-1 md:mb-2 ">
              <IconUser className="size-4" />
              <span>
                <span className="text-blue-500">{post.currentMembers}</span>명
                신청
              </span>
            </div>

            <div className="flex items-center gap-1.5 xl:text-sm flex-wrap text-xs px-1">
              <span className="text-gray-400">위치</span>
              <span className="text-gray-600">
                {NATION_CODE_TO_LABEL[post.nation]}
              </span>

              <span className="text-gray-300 ">|</span>

              <span className="text-gray-400">날짜</span>
              <span className="text-gray-600">
                {new Date(post.period.startDate).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>

              <span className="text-gray-300 md:max-[1279px]:hidden">|</span>
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

        <div className="flex md:flex-col md:items-end md:p-0 md:justify-between flex-row items-center px-4 pb-4 gap-2">
          <button
            onClick={handleToggleBookmark}
            className="w-10 h-10 md:flex items-center justify-center  transition-colors hover:bg-gray-100 cursor-pointer hidden"
          >
            {post.isBookmarked ? <IconHeartSolid /> : <IconHeart />}
          </button>

          {post.isOwner ? (
            <div className="flex gap-2 md:flex-none flex-1 ">
              <Button
                size="md"
                variant="secondary"
                className="xl:w-34 flex-1 w-28"
                onClick={() => router.push(`/posts/${post.postId}/edit`)}
              >
                수정하기
              </Button>

              <Button
                size="md"
                variant="tertiary"
                className="xl:w-34 flex-1  w-28"
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
            <Button
              size="md"
              disabled
              className="xl:w-34 flex-1 md:flex-none w-28"
            >
              모집종료
            </Button>
          ) : post.isApplied ? (
            <Button
              size="md"
              variant="secondary"
              className="xl:w-34 flex-1 md:flex-none w-28"
            >
              신청 취소
            </Button>
          ) : (
            <Button
              size="md"
              className="xl:w-34 flex-1 md:flex-none w-28"
              onClick={handleOpenApplyModal}
            >
              신청하기
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
