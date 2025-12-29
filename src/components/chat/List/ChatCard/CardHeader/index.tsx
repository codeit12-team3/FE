import { Badge } from '@/components/common/Badge'
import { cn } from '@/lib/common'
import { RecruitStatus } from '@/types/chat/chats.types'

interface ChatHeaderProps {
  recruitStatus: RecruitStatus
}

const RECRUIT_STATUS = [
  {
    key: 'RECRUITING',
    label: '모집 중',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    key: 'COMPLETED',
    label: '모집 마감',
    color: 'bg-gray-200 text-gray-600',
  },
  {
    key: 'FINISH',
    label: '여행 종료',
    color: 'bg-gray-200 text-gray-600',
  },
] as const

export default function CardHeader({ recruitStatus }: ChatHeaderProps) {
  const status = RECRUIT_STATUS.find((status) => status.key === recruitStatus)
  return (
    <div className="w-full flex items-center gap-4 justify-end">
      {status && (
        <Badge className={cn(`${status.color}`, 'border-none text-xs')}>
          {status.label}
        </Badge>
      )}
    </div>
  )
}
