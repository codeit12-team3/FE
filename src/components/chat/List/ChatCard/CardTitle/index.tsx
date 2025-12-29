interface CardTitleProps {
  postTitle: string
  owner: string
  unreadCount?: number
}

export default function CardTitle({
  postTitle,
  owner,
  unreadCount,
}: CardTitleProps) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="flex items-center gap-1.5">
        <p className="text-xl font-bold text-black -tracking-[0.4px]">
          {postTitle}
        </p>

        {typeof unreadCount === 'number' && unreadCount > 0 && (
          <span className="text-sm font-semibold text-white w-5 h-5 bg-red-500 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      <p className="font-medium text-sm -tracking-[0.28px] text-gray-600">
        <span className="pr-2.5 text-gray-400">작성자</span>
        {owner}
      </p>
    </div>
  )
}
