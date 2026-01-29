import { RecruitStatus } from '@/features/chat/types/chatRoom.types'

export const RECRUIT_STATUS_META: Record<
  RecruitStatus,
  {
    label: string
    color: string
  }
> = {
  RECRUITING: {
    label: '모집 중',
    color: 'bg-blue-50 text-blue-500',
  },
  COMPLETED: {
    label: '모집 마감',
    color: 'bg-gray-200 text-gray-600',
  },
  FINISH: {
    label: '여행 종료',
    color: 'bg-gray-200 text-gray-600',
  },
}
