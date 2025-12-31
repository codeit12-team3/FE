import { Badge } from '@/components/common/Badge'
import { cn } from '@/lib/common'
import { RecruitStatus } from '@/types/chat/chats.types'

interface StatusBadgeProps {
  recruitStatus: RecruitStatus
}

const RECRUIT_STATUS = [
  {
    key: 'RECRUITING',
    label: '동행 모집중',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    key: 'COMPLETED',
    label: '동행 모집마감',
    color: 'bg-gray-200 text-gray-600',
  },
  {
    key: 'FINISH',
    label: '여행 종료',
    color: 'bg-gray-200 text-gray-600',
  },
] as const

export default function StatusBadge({ recruitStatus }: StatusBadgeProps) {
  const status = RECRUIT_STATUS.find((status) => status.key === recruitStatus)
  return (
    <>
      {status && (
        <Badge className={cn(`${status.color}`, 'border-none text-xs md:m-0')}>
          {status.label}
        </Badge>
      )}
    </>
  )
}
