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
  onCancel?: () => void
  isCanceling?: boolean
  meetsConditions: boolean
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
  onCancel,
  isCanceling,
  meetsConditions,
}: PostCardActionsProps) {
  return (
    <div className="flex md:flex-col md:items-end md:p-0 md:justify-between flex-row items-center px-4 pb-4 gap-2">
      <button
        onClick={onBookmarkClick}
        className=" md:flex items-center justify-center transition-colors hover:scale-90  cursor-pointer hidden"
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
        <Button
          size="md"
          disabled
          className="lg:w-34 flex-1 md:flex-none w-28 cursor-not-allowed"
        >
          모집종료
        </Button>
      ) : isApplied ? (
        <Button
          size="md"
          variant="secondary"
          className="lg:w-34 flex-1 md:flex-none w-28"
          onClick={onCancel}
          disabled={isCanceling}
        >
          신청 취소
        </Button>
      ) : !meetsConditions ? (
        <Button
          size="md"
          disabled
          className="lg:w-34 flex-1 md:flex-none w-28 pointer-events-auto! cursor-not-allowed!"
        >
          신청 불가
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
