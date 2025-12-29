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
    <div className="flex items-end justify-between gap-3">
      <CardInfo nation={nation} region={region} startDate={startDate} />
      <div className="flex flex-col items-end gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={onJoinChat}
          className="bg-blue-500 w-34 rounded-xl"
        >
          채팅 입장하기
        </Button>
      </div>
    </div>
  )
}
