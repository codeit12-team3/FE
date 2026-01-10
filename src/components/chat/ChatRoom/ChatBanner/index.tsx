import { useSearchParams } from 'next/navigation'

import CardThumbnail from '@/components/common/CardThumbnail'
import { RecruitStatus } from '@/types/posts'

import StatusBadge from '../../ChatList/RoomItem/StatusBadge'

export default function ChatInfoBanner() {
  const searchParams = useSearchParams()

  const thumbnail = searchParams.get('thumbnail')
  const title = searchParams.get('title')
  const region = searchParams.get('region')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const recruitStatus = searchParams.get('recruitStatus')
  return (
    <div className="bg-white sticky flex items-center p-4 md:p-6 gap-3 md:gap-6 z-10 border-b border-gray-200">
      <CardThumbnail imageUrl={thumbnail} variant="chatroom" />
      <div className="flex-1 flex flex-col  text-slate-800 gap-1">
        <div className="flex gap-2 md:justify-between items-center">
          <span className="font-semibold text-base md:text-xl">{title}</span>
          <StatusBadge recruitStatus={recruitStatus as RecruitStatus} />
        </div>

        <div className="text-xs md:text-sm flex items-center gap-2 md:gap-4 text-gray-600">
          <p>
            <span className="text-gray-400 pr-1 md:pr-1.5">위치</span>
            {region}
          </p>
          <p>
            <span className="text-gray-400 pr-1 md:pr-1.5">날짜</span>
            {startDate} - {endDate}
          </p>
        </div>
      </div>
    </div>
  )
}
