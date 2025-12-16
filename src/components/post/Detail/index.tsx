'use client'

import { useRouter } from 'next/navigation'

import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import Comment from '@/components/comment'
import { Button } from '@/components/common'

import PostDetailSkeleton from './PostDetailSkeleton'
import PostHeader from './PostHeader'
import PostImages from './PostImages'
import PostInfo from './PostInfo'
import PostTags from './PostTags'
import PostWriter from './PostWriter'

interface PostDetailProps {
  postId: string
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: response, isLoading } = usePostDetail({ postId })
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

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
    if (!postId) {
      console.error('postId is undefined')
      return
    }
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
            <Button
              variant="secondary"
              size="md"
              className="w-68"
              onClick={() => router.back()}
            >
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
        {/* 
        <Comment postId={postId} /> */}
      </div>
    </div>
  )
}
