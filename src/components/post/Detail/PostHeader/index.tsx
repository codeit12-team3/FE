import { Heart } from 'lucide-react'

import { useAddBookmark, usePostDetail, useRemoveBookmark } from '@/api/posts'
import { formatDay } from '@/lib/common'

import PostActions from '../PostActions'
import PostManage from '../PostManage'

interface PostHeaderProps {
  postId: string

  onOpenApplyModal: () => void
}

export default function PostHeader({
  postId,
  onOpenApplyModal,
}: PostHeaderProps) {
  const { data: post } = usePostDetail({ postId })
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
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
  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark.mutate(postId)
    } else {
      addBookmark.mutate(postId)
    }
  }

  return (
    <div className="flex flex-col items-start gap-4 pl-2">
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-500"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-5">
          {isOwner ? (
            <PostManage postId={postId} />
          ) : (
            <PostActions
              onApply={onOpenApplyModal}
              hasApplied={isApplied}
              postId={postId}
            />
          )}
          <button
            onClick={handleToggleBookmark}
            className="hover:scale-90 transition-transform cursor-pointer"
            aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
          >
            <Heart
              className={`${isBookmarked ? 'fill-blue-500' : 'fill-gray-300'} size-8`}
              strokeWidth={0}
            />
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-text-base">{title}</h1>
      <div className="flex gap-3 text-sm items-center mb-8">
        <p className="text-gray-500">
          게시날짜 <span className="text-gray-600">{formatDay(createdAt)}</span>
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
    </div>
  )
}
