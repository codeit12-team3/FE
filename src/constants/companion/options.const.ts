import { TabOption } from '@/components/member/Tabs'
import { CompanionState } from '@/types/companions'

export const COMPANION_STATUS_LABEL: Record<CompanionState, string> = {
  PENDING: '대기',
  APPROVED: '수락',
  DENIED: '거절',
} as const

export const COMPANION_STATUS: TabOption<CompanionState>[] = [
  { value: 'PENDING', label: COMPANION_STATUS_LABEL.PENDING },
  { value: 'APPROVED', label: COMPANION_STATUS_LABEL.APPROVED },
  { value: 'DENIED', label: COMPANION_STATUS_LABEL.DENIED },
] as const
