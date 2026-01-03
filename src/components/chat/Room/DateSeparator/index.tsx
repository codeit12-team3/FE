import { formatFullKoreanDate } from '@/lib/common'

export default function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="mx-4 text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full text-nowrap">
        {formatFullKoreanDate(date)}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}
