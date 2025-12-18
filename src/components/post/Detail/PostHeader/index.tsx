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

const STAT_LABEL_STYLE = 'text-gray-500'
const STAT_VALUE_STYLE = 'text-gray-600'

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <p className={STAT_LABEL_STYLE}>
      {label} <span className={STAT_VALUE_STYLE}>{value}</span>
    </p>
  )
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
    <div className="flex flex-col items-start gap-4">
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

      <div className="flex gap-3 text-sm items-center">
        <StatItem label="게시날짜" value={formatDay(timestamp)} />
        <span className="text-text-disabled">|</span>
        <StatItem label="조회수" value={stats.viewCount} />
        <span className="text-text-disabled">|</span>
        <StatItem label="댓글" value={commentCount} />
      </div>
    </div>
  )
}
