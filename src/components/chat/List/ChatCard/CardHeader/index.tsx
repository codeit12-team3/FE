import { RecruitStatus } from '@/types/chat/chats.types'

import StatusBadge from '../StatusBadge'

// ChatCardHeader.tsx
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
    <div className="flex items-center gap-2.5 pb-1">
      <span className="md:text-xl text-base font-bold">{title}</span>
      {unreadCount > 0 && (
        <span className="text-sm font-semibold bg-red-500 text-white rounded-full flex items-center justify-center w-[21px] h-5">
          {unreadCount}
        </span>
      )}
      <StatusBadge recruitStatus={recruitStatus} />
    </div>
  )
}
