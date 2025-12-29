import { usePostDetail } from '@/api/posts'
import { NATION_CODE_TO_LABEL } from '@/constants/posts'

const LABEL_STYLE = 'text-sm text-gray-600 w-16'
const VALUE_STYLE = 'text-sm text-gray-800 font-semibold'
const FLEX_ROW_STYLE = 'flex gap-1.5'

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

export default function Info({ postId }: { postId: string }) {
  const { data: post } = usePostDetail({ postId })

  if (!post || !post.success) return null

  const { nation, region, period, content, conditions } = post.data
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold pl-2 text-gray-800 text-lg">여행 정보</h3>
        <div className=" rounded-3xl p-6  bg-gray-200 ">
          <div className="flex flex-col gap-2">
            <InfoRow label="여행 일정">
              <span className={VALUE_STYLE}>
                {period.startDate} - {period.endDate}
              </span>
            </InfoRow>
            <InfoRow label="여행지">
              <span className={VALUE_STYLE}>
                {NATION_CODE_TO_LABEL[nation] ?? nation},
              </span>
              <span className={VALUE_STYLE}> {region}</span>
            </InfoRow>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold pl-2 text-gray-800 text-lg">여행 소개</h3>
        <span className="pl-2 text-sm text-gray-600">{content}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold pl-2 text-gray-800 text-lg">동행조건</h3>
        <div className="pl-2 flex gap-2.5">
          <span className="px-2.5 py-1.5 text-sm text-gray-600 rounded-lg bg-gray-200">
            {conditions.genderCondition}
          </span>
          <span className="px-2.5 py-1.5 text-sm text-gray-600 rounded-lg bg-gray-200">
            {conditions.ageCondition}
          </span>
        </div>
      </div>
    </div>
  )
}
