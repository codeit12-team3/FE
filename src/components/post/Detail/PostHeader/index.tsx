import { formatDay } from '@/lib/common'

interface PostHeaderProps {
  tags: string[]
  title: string
  timestamp: string
  stats: {
    viewCount: number
  }
  commentCount: number
}

export default function PostHeader({
  tags,
  title,
  timestamp,
  stats,
  commentCount,
}: PostHeaderProps) {
  return (
    <div className="flex flex-col items-start mb-6 gap-4">
      <div className="flex gap-4 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm hover:bg-main hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>
      <h1 className="text-xl font-bold text-text-base pl-3">{title}</h1>

      <div className="flex  gap-4 text-sm text-text-input pl-3">
        <p>게시날짜 {formatDay(timestamp)} </p>
        <p>조회수 {stats.viewCount} </p>
        <p>댓글 {commentCount}</p>
      </div>
    </div>
  )
}
