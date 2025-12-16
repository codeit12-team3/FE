import { CalendarDays } from 'lucide-react'

import { NATION_CODE_TO_LABEL, NationCode } from '@/constants/posts'

interface Props {
  nation: NationCode
  region: string
  period: {
    startDate: string
    endDate: string
  }
  content: string
  stats: {
    maxMembers: number
    currentMembers: number
  }
  conditions: {
    ageCondition: string
    genderCondition: string
  }
}

const BLUE_BOX_STYLE = 'px-4 py-2 bg-blue-50 rounded-md text-sm text-text-input'
const TEXT_STYLE = 'text-sm text-text-input'

const InfoSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div>
    <h3 className="font-semibold mb-2 text-text-base text-lg">{title}</h3>
    {children}
  </div>
)

export default function Info({
  nation,
  region,
  period,
  content,
  stats,
  conditions,
}: Props) {
  return (
    <div className="space-y-8">
      <InfoSection title="여행 지역">
        <span className={TEXT_STYLE}>
          {NATION_CODE_TO_LABEL[nation] ?? nation}
        </span>
        <span className={TEXT_STYLE}>{region}</span>
      </InfoSection>

      <InfoSection title="여행 일정">
        <div className="grid grid-cols-2 gap-4 w-2/3">
          <div className={`${BLUE_BOX_STYLE} flex gap-2`}>
            <CalendarDays className="text-main size-5" />
            {period.startDate}
          </div>
          <div className={`${BLUE_BOX_STYLE} flex gap-2`}>
            <CalendarDays className="text-main size-5" />
            {period.endDate}
          </div>
        </div>
      </InfoSection>

      <InfoSection title="모집 설명">
        <div className={`${BLUE_BOX_STYLE} rounded-lg w-2/3`}>{content}</div>
      </InfoSection>

      <InfoSection title="모집 정원 및 조건">
        <div className="flex gap-4">
          <span>
            총 <span className="text-main">{stats.maxMembers}</span>명
          </span>
          <span className="text-main">{conditions.ageCondition}</span>
          <span className="text-main">{conditions.genderCondition}</span>
        </div>
      </InfoSection>
    </div>
  )
}
