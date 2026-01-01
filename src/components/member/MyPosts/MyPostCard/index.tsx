'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useDeletePost } from '@/api/posts'
import { IconUser } from '@/assets/svgr'
import { Button } from '@/components/ui'
import { cn, formatDateToKorean, getImageUrl } from '@/lib/common'
import { useModalActions } from '@/stores'
import { MyPost } from '@/types/member'

interface MyPostCardProps {
  post: MyPost
  idx?: number
}

interface DeleteConfirmProps {
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirm({ onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">
          <span className="text-blue-500">동행글</span>을 삭제하시겠습니까?
        </h2>
        <p className="text-sm text-gray-500">삭제된 글은 복구할 수 없습니다.</p>
      </div>

      <div className="flex gap-2">
        <Button onClick={onConfirm} variant="tertiary" className="flex-1">
          삭제
        </Button>
        <Button onClick={onCancel} variant="secondary" className="flex-1">
          취소
        </Button>
      </div>
    </div>
  )
}

export default function MyPostCard({ post, idx = 0 }: MyPostCardProps) {
  const router = useRouter()
  const deletePost = useDeletePost()
  const { openModal, closeModal } = useModalActions()

  const getRecruitStatusInfo = () => {
    switch (post.recruitStatus) {
      case 'RECRUITING':
        return { text: '모집중', className: 'text-blue-600' }
      case 'COMPLETED':
        return { text: '모집완료', className: 'text-gray-700' }
      case 'FINISHED':
        return { text: '여행완료', className: 'text-gray-500' }
      default:
        return { text: '알수없음', className: 'text-gray-500' }
    }
  }

  const statusInfo = getRecruitStatusInfo()

  const handleDeleteClick = () => {
    openModal(
      <DeleteConfirm
        onConfirm={() => {
          deletePost.mutate(post.postId.toString())
          closeModal()
        }}
        onCancel={closeModal}
      />,
    )
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:p-6 rounded-3xl md:rounded-[40px] gap-6 bg-white border border-gray-200 md:min-h-59">
      {/* Thumbnail */}
      <Image
        width={744}
        height={188}
        priority={idx < 3}
        sizes="188px"
        className="relative w-full h-[188px] md:w-[188px] rounded-3xl rounded-b-none md:rounded-b-3xl overflow-hidden shrink-0 object-cover"
        src={getImageUrl(post.thumbnail) || '/images/cardImage_test.svg'}
        alt={post.title}
      />

      <div className="flex flex-col w-full px-4 pb-4 md:px-0 md:pb-0">
        {/* 여행 태그 */}
        <div className="flex items-center gap-2.5">
          {post.tags.map((tag) => (
            <span
              key={`${post.postId}-${tag}`}
              className="px-3 py-1.5 bg-blue-50 text-blue-500 text-xs font-semibold rounded-3xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 중단 컨텐츠 */}
        <div className="flex-1 pt-3.5 pb-[22px]">
          {/* 게시글 타이틀 */}
          <button
            onClick={() => router.push(`/posts/${post.postId}`)}
            className="text-left hover:underline focus:outline-none cursor-pointer"
          >
            <h4 className="text-black text-xl font-bold line-clamp-1">
              {post.title}
            </h4>
          </button>
        </div>

        {/* 하단 컨텐츠 */}
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-full">
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => router.push(`/posts/${post.postId}`)}
              className="w-fit flex items-center gap-1 cursor-pointer hover:underline"
            >
              <IconUser className="size-4" />
              <span className="text-sm font-medium mr-2">
                {post.currentMembers} / {post.maxMembers}
              </span>
              <span className={cn('text-sm font-medium', statusInfo.className)}>
                {statusInfo.text}
              </span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">위치</span>
                <span className="text-gray-600">{post.region}</span>
              </div>
              <div className="border-l border-gray-300 self-stretch h-auto my-[4.5px]" />
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">날짜</span>
                <span className="text-gray-600">
                  {formatDateToKorean(post.period.startDate)}
                </span>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-end gap-2 w-full md:w-auto">
            <Button
              onClick={() => router.push(`/posts/${post.postId}/edit`)}
              className="flex-1 md:w-28"
              size={'md'}
              variant={'secondary'}
            >
              수정하기
            </Button>
            <Button
              onClick={handleDeleteClick}
              className="flex-1 md:w-28"
              size={'md'}
              variant={'tertiary'}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
