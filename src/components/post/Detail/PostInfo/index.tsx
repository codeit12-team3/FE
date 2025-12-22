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

const LABEL_STYLE = 'text-sm text-text-input w-16'
const VALUE_STYLE = 'text-sm text-text-base'
const GRID_ROW_STYLE = 'grid grid-cols-2 gap-7'
const FLEX_ROW_STYLE = 'flex gap-1.5'

const InfoSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div>
    <h3 className="font-semibold pb-2 px-2 text-text-base text-lg">{title}</h3>
    {children}
  </div>
)

const InfoRow = ({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) => (
  <div className={`${FLEX_ROW_STYLE} ${className}`}>
    <span className={LABEL_STYLE}>{label}</span>
    <span className={VALUE_STYLE}>{children}</span>
  </div>
)

export default function Info({
  nation,
  region,
  period,
  content,
  conditions,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <span className="pl-2">{content}</span>
      <InfoSection title="여행 정보">
        <div className="bg-bg-disabled rounded-3xl p-6 space-y-3">
          <div className={GRID_ROW_STYLE}>
            <InfoRow label="여행 시작">{period.startDate}</InfoRow>
            <InfoRow label="여행 종료">{period.endDate}</InfoRow>
          </div>
          <div className={GRID_ROW_STYLE}>
            <div className="flex gap-1">
              <span className={LABEL_STYLE}>여행지</span>
              <span className="text-sm pl-1">
                {NATION_CODE_TO_LABEL[nation] ?? nation}
              </span>
              <span className={VALUE_STYLE}>{region}</span>
            </div>
            <InfoRow label="모집 정원">{conditions.ageCondition}</InfoRow>
          </div>
          <InfoRow label="모집 조건">{conditions.genderCondition}</InfoRow>
        </div>
      </InfoSection>
    </div>
  )
}
