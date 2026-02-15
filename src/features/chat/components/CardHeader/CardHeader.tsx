import { RecruitStatus } from '@/features/chat/types/chatRoom.types'

import StatusBadge from '../StatusBadge/StatusBadge'

interface CardHeaderProps {
  title: string
  recruitStatus: RecruitStatus
  unreadCount: number
}

export default function CardHeader({
  title,
  recruitStatus,
  unreadCount,
}: CardHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-sm font-bold truncate">{title}</span>
        {unreadCount > 0 && (
          <span className="text-xs font-semibold shrink-0 bg-red-500 text-white rounded-full flex items-center justify-center w-[19px] pr-px h-4.5">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      <StatusBadge recruitStatus={recruitStatus} />
    </div>
  )
}
