import { Button } from '@/components/common'

import AvatarStack from '../AvatarStack'
import CardInfo from '../CardInfo'

interface CardFooterProps {
  nation: string
  region: string
  startDate: string
  participantImage: string[]
  onJoinChat?: () => void
}

export default function CardFooter({
  nation,
  region,
  startDate,
  participantImage,
  onJoinChat,
}: CardFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <CardInfo nation={nation} region={region} startDate={startDate} />

      <AvatarStack participantImage={participantImage} />

      <Button onClick={onJoinChat}>입장하기</Button>
    </div>
  )
}
