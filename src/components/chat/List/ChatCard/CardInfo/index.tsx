import { Fragment } from 'react/jsx-runtime'

interface CardInfoProps {
  nation: string
  region: string
  startDate: string
}

interface InfoItemProps {
  label: string
  value: string
}

const InfoItem = ({ label, value }: InfoItemProps) => {
  return (
    <div className="flex gap-1.5 items-center text-sm font-medium -tracking-[0.28px] pr-2.5">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  )
}

export default function CardInfo({ nation, region, startDate }: CardInfoProps) {
  const infoItems = [
    { label: '위치', value: `${nation} ${region}` },
    { label: '날짜', value: startDate },
  ]

  return (
    <div className="flex gap-2.5 items-start">
      {infoItems.map((item, index) => (
        <Fragment key={item.label}>
          <InfoItem label={item.label} value={item.value} />
          {index < infoItems.length - 1 && (
            <span className="h-[11px] w-px bg-gray-300"></span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
