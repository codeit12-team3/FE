import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn, formatDay } from '@/lib/common'

import PostActions from '../PostActions'
import PostManage from '../PostManage'

interface PostHeaderProps {
  tags: string[]
  title: string
  timestamp: string
  stats: {
    viewCount: number
  }
  commentCount: number
  isBookmarked: boolean
  onToggleBookmark: () => void
  postId: string
  isOwner: boolean
  isApplied: boolean
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
  onOpenApplyModal: () => void
}

export default function PostHeader({
  tags,
  title,
  timestamp,
  stats,
  isBookmarked,
  commentCount,
  onToggleBookmark,
  postId,
  isOwner,
  isApplied,
  recruitStatus,
  onOpenApplyModal,
}: PostHeaderProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-start gap-4 pl-2">
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-blue-50 text-main rounded-full text-xs text-blue-500"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex gap-5">
          <button
            onClick={onToggleBookmark}
            className="hover:scale-90 transition-transform"
          >
            <Heart
              className={cn(
                'size-8',
                isBookmarked ? 'fill-blue-500 ' : 'fill-gray-300 ',
              )}
              strokeWidth={0}
            />
          </button>
          {isOwner ? (
            <PostManage
              postId={postId}
              status={recruitStatus}
              onEdit={() => router.push(`/posts/${postId}/edit`)}
              onChangeStatus={() => {}}
            />
          ) : (
            <PostActions onApply={onOpenApplyModal} hasApplied={isApplied} />
          )}
        </div>
      </div>
      <h1 className="text-3xl font-bold text-text-base">{title}</h1>

      <div className="flex gap-3 text-sm items-center">
        <p className="text-gray-500">
          게시날짜 <span className="text-gray-600">{formatDay(timestamp)}</span>
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
