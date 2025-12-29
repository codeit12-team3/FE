import { Button } from '@/components/common'

import CardInfo from '../CardInfo'
import LastMessage from '../LastMessage'

interface CardFooterProps {
  nation: string
  region: string
  startDate: string
  onJoinChat?: () => void
}

export default function CardFooter({
  nation,
  region,
  startDate,
  onJoinChat,
}: CardFooterProps) {
  return (
    <div className="w-full flex items-end justify-end gap-3 pt-1 sm:p-0">
      <Button
        variant="default"
        size="sm"
        onClick={onJoinChat}
        className="bg-blue-500 w-full rounded-xl sm:w-34"
      >
        채팅 입장하기
      </Button>
    </div>
  )
}
