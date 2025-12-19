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
  conditions,
  stats,
}: Props) {
  return (
    <div className="flex flex-col gap-4 pb-12">
      <span>{content}</span>
      <InfoSection title="여행 정보">
        <div className="bg-bg-disabled rounded-3xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex  gap-2">
              <span className={TEXT_STYLE}>여행 시작</span>
              <span className="text-sm text-text-base">{period.startDate}</span>
            </div>
            <div className="flex  gap-2">
              <span className={TEXT_STYLE}>여행 종료</span>
              <span className="text-sm text-text-base">{period.endDate}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex  gap-1">
              <span className={TEXT_STYLE}>여행지</span>
              <span className="text-sm pl-1">
                {NATION_CODE_TO_LABEL[nation] ?? nation}
              </span>
              <span className="text-sm text-text-base">{region}</span>
            </div>
            <div className="flex  gap-2">
              <span className={TEXT_STYLE}>모집 정원</span>
              <span className="text-sm text-text-base">
                {stats.maxMembers}명
              </span>
            </div>
          </div>
          <div className="flex  gap-2">
            <span className={TEXT_STYLE}>모집 조건</span>
            <span className="text-sm text-text-base">
              {conditions.ageCondition}
            </span>
          </div>
        </div>
      </InfoSection>
    </div>
  )
}
