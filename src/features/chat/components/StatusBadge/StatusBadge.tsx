import { Badge } from '@/components/common/Badge'
import { RecruitStatus } from '@/features/chat/types/chatRoom.types'
import { cn } from '@/lib/common'

import { RECRUIT_STATUS_META } from '../../constants/recruitStatus'

interface StatusBadgeProps {
  recruitStatus: RecruitStatus
}

export default function StatusBadge({ recruitStatus }: StatusBadgeProps) {
  const status = RECRUIT_STATUS_META[recruitStatus]

  if (!status) return null
  return (
    <Badge className={cn(status.color, 'border-none m-0')}>
      {status.label}
    </Badge>
  )
}
