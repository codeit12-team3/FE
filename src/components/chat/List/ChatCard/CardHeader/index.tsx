import { Badge } from '@/components/common/Badge'
import { cn } from '@/lib/common'
import { RecruitStatus } from '@/types/chat/chats.types'

interface ChatHeaderProps {
  recruitStatus: RecruitStatus
  tags: string[]
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

export default function CardHeader({ recruitStatus, tags }: ChatHeaderProps) {
  const status = RECRUIT_STATUS.find((status) => status.key === recruitStatus)
  return (
    <div className="w-full flex items-center justify-between sm:p-0">
      <div className="flex items-center gap-1">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className="border-none text-xs bg-blue-50 text-blue-500"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {status && (
        <Badge className={cn(`${status.color}`, 'border-none text-xs')}>
          {status.label}
        </Badge>
      )}
    </div>
  )
}
