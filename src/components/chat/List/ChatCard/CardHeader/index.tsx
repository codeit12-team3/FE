import { RecruitStatus } from '@/types/chat/chats.types'

import StatusBadge from '../StatusBadge'

interface CardHeaderProps {
  title: string
  recruitStatus: RecruitStatus
  unreadCount: number
}

export function CardHeader({
  title,
  recruitStatus,
  unreadCount,
}: CardHeaderProps) {
  return (
    <div className="w-full flex items-center gap-2.5">
      <span className="md:text-xl text-base font-bold truncate min-w-0">
        {title}
      </span>
      {unreadCount > 0 && (
        <span className="text-sm font-semibold shrink-0 bg-red-500 text-white rounded-full flex items-center justify-center w-[21px] h-5">
          {unreadCount}
        </span>
      )}
      <StatusBadge recruitStatus={recruitStatus} />
    </div>
  )
}
