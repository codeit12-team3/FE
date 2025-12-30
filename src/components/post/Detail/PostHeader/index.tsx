import { usePostDetail } from '@/api/posts'
import { IconHeart, IconHeartSolid } from '@/assets/svgr'
import { useBookmarkToggle } from '@/hooks/posts'
import { formatDay } from '@/lib/common'

import PostActions from '../PostActions'
import PostManage from '../PostManage'

interface PostHeaderProps {
  postId: string
  onOpenApplyModal: () => void
  onCancel?: () => void
  isCanceling?: boolean
}

export default function PostHeader({
  postId,
  onCancel,
  isCanceling,
  onOpenApplyModal,
}: PostHeaderProps) {
  const { data: post } = usePostDetail({ postId })
  const { toggleBookmark: handleToggleBookmark } = useBookmarkToggle(
    postId,
    post?.success ? post.data.isBookmarked : false,
  )

  if (!post || !post.success) return null

  const {
    tags,
    title,
    isOwner,
    isApplied,
    isBookmarked,
    createdAt,
    stats,
    commentCount,
  } = post.data

  return (
    <div className="flex flex-col items-start gap-4 pl-2">
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex gap-3 flex-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleToggleBookmark}
          className="hover:scale-90 transition-transform cursor-pointer md:hidden flex items-end pt-1"
          aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
        >
          {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
        </button>

        <div className="hidden md:flex gap-5">
          {isOwner ? (
            <PostManage postId={postId} />
          ) : (
            <PostActions
              onApply={onOpenApplyModal}
              hasApplied={isApplied}
              postId={postId}
              onCancel={onCancel}
              isCanceling={isCanceling}
            />
          )}
          <button
            onClick={handleToggleBookmark}
            className="hover:scale-90 transition-transform cursor-pointer"
            aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
          >
            {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
          </button>
        </div>
      </div>
      <h1 className="md:text-3xl text-xl font-bold text-text-base">{title}</h1>
      <div className="flex flex-col md:flex-row gap-3 text-sm items-start md:items-center w-full justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-gray-500">
            게시날짜{' '}
            <span className="text-gray-600">{formatDay(createdAt)}</span>
          </p>
          <span className="text-text-disabled">|</span>
          <p className="text-gray-500">
            조회수 <span className="text-gray-600">{stats.viewCount}</span>
          </p>
          <span className="text-text-disabled">|</span>
          <p className="text-gray-500">
            댓글 <span className="text-gray-600">{commentCount}</span>
          </p>
        </div>

        <div className="flex md:hidden gap-5 w-full justify-between items-center">
          {isOwner && <PostManage postId={postId} />}
        </div>
      </div>
    </div>
  )
}
