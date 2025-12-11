import { CalendarDays } from 'lucide-react'

interface Props {
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

export default function PostInfo({
  region,
  period,
  content,
  stats,
  conditions,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className=" font-semibold mb-2 text-text-base text-lg">
          여행 지역
        </h3>
        <p className="text-sm text-text-input">{region}</p>
      </div>

      <div>
        <h3 className=" font-semibold mb-2 text-text-base text-lg">
          여행 일정
        </h3>
        <div className="grid grid-cols-2 gap-4 w-2/3">
          <div>
            <div className="px-4 py-2 bg-blue-50 rounded-md text-sm text-text-input flex gap-2">
              <CalendarDays className="text-main size-5" />
              {period.startDate}
            </div>
          </div>

          <div>
            <div className="px-4 py-2 bg-blue-50 rounded-md text-sm text-text-input flex gap-2">
              <CalendarDays className="text-main size-5" />
              {period.endDate}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className=" font-semibold mb-2 text-text-base text-lg">
          모집 설명
        </h3>
        <div className="px-4 py-4 bg-blue-50 rounded-lg text-sm text-text-input w-2/3">
          {content}
        </div>
      </div>

      <div className="font-semibold">
        <h3 className="  mb-4 text-text-base text-lg">모집 정원 및 조건</h3>

        <div className="flex gap-4 ">
          <span>
            총 <span className="text-main">{stats.maxMembers}</span>명
          </span>
          <span>
            <span className="text-main">{conditions.ageCondition}</span>
          </span>
          <span className="text-main">{conditions.genderCondition}</span>
        </div>
      </div>
    </div>
  )
}
