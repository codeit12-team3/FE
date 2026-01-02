import { IconEmptyCard } from '@/assets/svgr'

interface Props {
  comment?: string
}

export default function EmptyCard({ comment }: Props) {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <IconEmptyCard className="w-32 h-[102px] md:w-40 md:h-32" />
      <span className="font-semibold text-gray-400">{comment}</span>
    </div>
  )
}
