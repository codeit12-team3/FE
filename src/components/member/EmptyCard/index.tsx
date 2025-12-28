import { IconEmptyCard } from '@/assets/svgr'

interface Props {
  comment?: string
}

export default function EmptyCard({ comment }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <IconEmptyCard />
      <span className="font-semibold text-gray-400">{comment}</span>
    </div>
  )
}
