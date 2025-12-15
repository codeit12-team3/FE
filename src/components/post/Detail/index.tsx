'use client'

import { notFound, useRouter } from 'next/navigation'

import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import Comment from '@/components/comment'
import { Button } from '@/components/common'
import { ApiResponse } from '@/types/common/api-response.type'
import { PostContent } from '@/types/posts'

import PostDetailSkeleton from './PostDetailSkeleton'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostTags from './PostTags'
import PostWriter from './PostWriter'

interface PostDetailProps {
  postId: string
  initialData: ApiResponse<PostContent>
}

export default function PostDetail({ postId, initialData }: PostDetailProps) {
  const {
    data: postDetail,
    isLoading,
    error,
  } = usePostDetail({ postId, initialData })
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (error || !postDetail) {
    notFound()
  }

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

  const headerProps = {
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
    <div className="min-h-screen bg-bg-base py-8 px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-bg-base rounded-lg p-8 border border-[#DDDDDD]">
        <PostHeader {...headerProps} />

        <PostImages images={postDetail.images} />

        <PostTags tags={postDetail.tags} />

        <PostInfo {...infoProps} />

        <PostWriter writer={writerProps} />

        <div className="flex gap-3 items-center justify-center my-8">
          <>
            <Button variant="secondary" size="md" className="w-68" onClick={() => router.back()}>
              뒤로가기
            </Button>
            {postDetail.isOwner ? (
              <Button
                size="md"
                className="w-68"
                onClick={() => router.push(`/posts/${postId}/edit`)}
              >
                수정하기
              </Button>
            ) : (
              <Button size="md" className="w-68">
                동행 참여하기
              </Button>
            )}
          </>
        </div>

        <Comment postId={postId} />
      </div>
    </div>
  )
}
