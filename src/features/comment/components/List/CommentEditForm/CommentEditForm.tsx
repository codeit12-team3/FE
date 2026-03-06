import { useEffect, useState } from 'react'

import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'

interface CommentEditFormProps {
  initialContent: string
  onCancel: () => void
  onSave: (text: string) => Promise<void>
  isUpdating?: boolean
}

export default function CommentEditForm({
  initialContent,
  onCancel,
  onSave,
  isUpdating,
}: CommentEditFormProps) {
  const [text, setText] = useState(initialContent)

  useEffect(() => {
    setText(initialContent)
  }, [initialContent])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (text.trim() && !isUpdating) {
        onSave(text)
      }
    }
  }

  const isSaveDisabled = !text.trim() || isUpdating

  return (
    <>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
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
          type="button"
          className="w-26 h-10 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          취소
        </Button>
        <Button
          onClick={() => onSave(text)}
          disabled={isSaveDisabled}
          className="w-26 h-10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500"
        >
          {isUpdating ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </>
  )
}
