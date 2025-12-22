import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'

interface CommentEditFormProps {
  editText: string
  onTextChange: (text: string) => void
  onCancel: () => void
  onSave: () => void
  isUpdating: boolean
}

export default function CommentEditForm({
  editText,
  onTextChange,
  onCancel,
  onSave,
  isUpdating,
}: CommentEditFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (editText.trim() && !isUpdating) {
        onSave()
      }
    }
  }

  const isSaveDisabled = !editText.trim() || isUpdating

  return (
    <>
      <Textarea
        value={editText}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isUpdating}
        placeholder="댓글을 입력해주세요"
        className="w-full h-[106px] ring-gray-200 resize-none ring-1 focus-visible:ring-1 focus-visible:ring-blue-500 p-4 bg-white text-base disabled:opacity-50 disabled:cursor-not-allowed"
        autoFocus
      />

      <div className="w-full flex items-center justify-end gap-2 text-sm">
        <Button
          onClick={onCancel}
          disabled={isUpdating}
          className="w-26 h-10 rounded-[12px] border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          취소
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaveDisabled}
          className="w-26 h-10 rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </>
  )
}
