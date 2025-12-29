import { Badge } from '@/components/common/Badge'

interface ChatHeaderProps {
  tags: string[]
  recruitStatus: 'COMPLETED' | 'RECRUITING' | 'FINISH'
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

export default function CardHeader({ tags, recruitStatus }: ChatHeaderProps) {
  const status = RECRUIT_STATUS.find((status) => status.key === recruitStatus)
  return (
    <div className="flex items-start justify-between">
      <ul>
        {tags.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {status && <Badge className={status.color}>{status.label}</Badge>}
      </div>
    </div>
  )
}
