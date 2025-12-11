import { CalendarDays } from 'lucide-react'

interface Props {
  nation: string
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

const SECTION_TITLE_STYLE = 'font-semibold mb-2 text-text-base text-lg'
const BLUE_BOX_STYLE = 'px-4 py-2 bg-blue-50 rounded-md text-sm text-text-input'
const TEXT_STYLE = 'text-sm text-text-input'

export default function PostInfo({
  nation,
  region,
  period,
  content,
  stats,
  conditions,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className={SECTION_TITLE_STYLE}>여행 지역</h3>
        <span className={`${TEXT_STYLE} mr-1`}>{nation}</span>
        <span className={TEXT_STYLE}>{region}</span>
      </div>

      <div>
        <h3 className={SECTION_TITLE_STYLE}>여행 일정</h3>
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
      </div>

      <div>
        <h3 className={SECTION_TITLE_STYLE}>모집 설명</h3>
        <div className={`${BLUE_BOX_STYLE} rounded-lg w-2/3`}>{content}</div>
      </div>

      <div>
        <h3 className={SECTION_TITLE_STYLE}>모집 정원 및 조건</h3>
        <div className="flex gap-4">
          <span>
            총 <span className="text-main">{stats.maxMembers}</span>명
          </span>
          <span className="text-main">{conditions.ageCondition}</span>
          <span className="text-main">{conditions.genderCondition}</span>
        </div>
      </div>
    </div>
  )
}
