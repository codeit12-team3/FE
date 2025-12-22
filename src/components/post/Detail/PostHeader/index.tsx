import { Heart } from 'lucide-react'

import { cn, formatDay } from '@/lib/common'

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
}

export default function PostHeader({
  tags,
  title,
  timestamp,
  stats,
  isBookmarked,
  commentCount,
  onToggleBookmark,
}: PostHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-4 pl-2">
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-blue-50 text-main rounded-full text-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleBookmark}
          className="hover:scale-90 transition-transform"
        >
          <Heart
            className={cn(
              'size-8',
              isBookmarked ? 'fill-main text-main' : 'fill-gray-300 ',
            )}
            strokeWidth={0}
          />
        </button>
      </div>
      <h1 className="text-3xl font-bold text-text-base">{title}</h1>

      <div className="flex gap-3 text-sm items-center mb-8">
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
