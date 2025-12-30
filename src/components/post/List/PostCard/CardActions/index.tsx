import { IconHeart, IconHeartSolid } from '@/assets/svgr'
import { Button } from '@/components/ui'

interface PostCardActionsProps {
  isOwner: boolean
  isBookmarked: boolean
  recruitStatus: 'RECRUITING' | 'COMPLETED' | 'FINISH'
  isApplied: boolean
  onBookmarkClick: (e: React.MouseEvent) => void
  onEditClick: () => void
  onDeleteClick: () => void
  onApplyClick: () => void
}

export default function PostCardActions({
  isOwner,
  isBookmarked,
  recruitStatus,
  isApplied,
  onBookmarkClick,
  onEditClick,
  onDeleteClick,
  onApplyClick,
}: PostCardActionsProps) {
  return (
    <div className="flex md:flex-col md:items-end md:p-0 md:justify-between flex-row items-center px-4 pb-4 gap-2">
      <button
        onClick={onBookmarkClick}
        className="w-10 h-10 md:flex items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer hidden"
      >
        {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
      </button>

      {isOwner ? (
        <div className="flex gap-2 md:flex-none flex-1">
          <Button
            size="md"
            variant="secondary"
            className="lg:w-34 flex-1 w-28"
            onClick={onEditClick}
          >
            수정하기
          </Button>

          <Button
            size="md"
            variant="tertiary"
            className="lg:w-34 flex-1 w-28"
            onClick={onDeleteClick}
          >
            삭제하기
          </Button>
        </div>
      ) : recruitStatus === 'COMPLETED' ? (
        <Button size="md" disabled className="lg:w-34 flex-1 md:flex-none w-28">
          모집종료
        </Button>
      ) : isApplied ? (
        <Button
          size="md"
          variant="secondary"
          className="lg:w-34 flex-1 md:flex-none w-28"
        >
          신청 취소
        </Button>
      ) : (
        <Button
          size="md"
          className="lg:w-34 flex-1 md:flex-none w-28"
          onClick={onApplyClick}
        >
          신청하기
        </Button>
      )}
    </div>
  )
}
