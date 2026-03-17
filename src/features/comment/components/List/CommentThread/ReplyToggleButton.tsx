import { IconChevronDown } from '@/assets/svgr'

interface ReplyToggleButtonProps {
  expanded: boolean
  onClick: () => void
}

export default function ReplyToggleButton({
  expanded,
  onClick,
}: ReplyToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-expanded={expanded}
      className="ml-[39px] flex w-fit items-center gap-1 rounded-full px-4 py-2.5 text-base font-semibold text-blue-500 hover:bg-gray-200"
    >
      <span>{expanded ? '답글 접기' : '답글 보기'}</span>
      <IconChevronDown className={expanded ? 'size-5 rotate-180' : 'size-5'} />
    </button>
  )
}
