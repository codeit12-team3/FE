'use client'

import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'

import { useCancelCompanion } from '@/api/companions'
import { usePostDetail } from '@/api/posts'
import Comment from '@/components/comment'
import { toast } from '@/components/common'
import { useApply, useCompanionId } from '@/hooks/posts'
import { checkConditionsMatch } from '@/lib/common'
import { useModalActions } from '@/stores'
import { SentCompanionContent } from '@/types/companions'
import { GenderType, PostContent } from '@/types/posts'

import { PostDetailSkeleton } from '..'
import ErrorFallback from '../Error/ErrorFallback'
import ApplyModal from './ApplyModal'
import ImageModal from './ImageModal'
import PostActions from './PostActions'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostWriter from './PostWriter'

export default function PostDetail({
  postId,
  data,
}: {
  postId: string
  data?: SentCompanionContent
}) {
  const { data: session } = useSession()
  const { data: response, isLoading, refetch } = usePostDetail({ postId })
  const [imageModalState, setImageModalState] = useState<{
    isOpen: boolean
    initialIndex: number
  }>({ isOpen: false, initialIndex: 0 })

  const companionId = useCompanionId(postId, data, true)
  const { handleApplyCompanion } = useApply(postId)
  const { openModal, closeModal } = useModalActions()
  const { mutate, isPending } = useCancelCompanion()

  const postDetail = response?.data
  const post = postDetail as PostContent
  const meetsConditions = useMemo(() => {
    const userBirth = session?.user?.birth
    const userGender = session?.user?.gender
    const conditions = post?.conditions

    if (!userBirth || !userGender || !conditions) return true

    return checkConditionsMatch(userBirth, userGender as GenderType, {
      ageType: conditions.ageCondition,
      genderCondition: conditions.genderCondition,
    })
  }, [session?.user?.birth, session?.user?.gender, post?.conditions])

  const handleCancelCompanion = async (companionId: string) => {
    mutate(companionId, {
      onSuccess: () => {
        toast.success('동행 요청이 취소 되었습니다')
      },
    })
  }

  const handleOpenApplyModal = () => {
    if (!session?.user) {
      toast.error('로그인이 필요한 서비스입니다.')
      return
    }
    if (!meetsConditions) {
      toast.error('해당 게시글의 조건과 맞지 않아 신청할 수 없습니다.')
      return
    }
    openModal(
      <ApplyModal
        onClose={closeModal}
        onSubmit={(message) => {
          handleApplyCompanion(message, closeModal)
        }}
      />,
    )
  }

  const handleImageClick = (index: number) => {
    setImageModalState({ isOpen: true, initialIndex: index })
  }

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (!response || !response.success || !postDetail) {
    return (
      <ErrorFallback message="게시글을 불러올 수 없습니다." onRetry={refetch} />
    )
  }

  const imageList =
    post.images && post.images.length > 0
      ? post.images
      : ['/images/thumbnail-default.png']

  return (
    <>
      <div className="min-h-screen bg-gray-50  flex items-center justify-center lg:pt-14 md:pt-7.5 pt-6 px-4 relative">
        <div className="max-w-7xl w-full  md:px-6">
          <div className="flex gap-6 items-start justify-center">
            <div className="w-full max-w-7xl rounded-lg ">
              <PostHeader
                postId={postId}
                onOpenApplyModal={handleOpenApplyModal}
                onCancel={
                  companionId
                    ? () => handleCancelCompanion(companionId)
                    : undefined
                }
                isCanceling={isPending}
              />
              <div className="flex md:flex-row lg:gap-6 md:gap-4 md:my-8 my-4 flex-col  ">
                <div className="flex-1 min-w-0 ">
                  <PostImages images={imageList} onClick={handleImageClick} />
                </div>
                <PostWriter postId={postId} />
              </div>
              <PostInfo postId={postId} />
              <div className="bg-gray-300 w-full h-px mt-12" />
              <div className="md:pb-0 pb-16">
                <Comment commentCount={post.commentCount} />
              </div>
            </div>
          </div>
          {post.isOwner === false && (
            <div className="md:hidden left-0 bg-gray-50 fixed w-full bottom-0 px-6 py-4 border-t border-gray-200">
              <PostActions
                onApply={handleOpenApplyModal}
                postId={postId}
                hasApplied={post.isApplied}
                onCancel={
                  companionId
                    ? () => handleCancelCompanion(companionId)
                    : undefined
                }
                isCanceling={isPending}
                meetsConditions={meetsConditions}
              />
            </div>
          )}
        </div>
      </div>
      {imageModalState.isOpen && (
        <ImageModal
          images={imageList}
          onClose={() => setImageModalState({ isOpen: false, initialIndex: 0 })}
          initialIndex={imageModalState.initialIndex}
        />
      )}
    </>
  )
}
