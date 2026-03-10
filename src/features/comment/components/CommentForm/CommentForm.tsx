'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button, toast } from '@/components/common'
import { Textarea } from '@/components/ui'
import { getImageUrl } from '@/lib/common/image'

export type CommentFormMode = 'create' | 'reply' | 'edit'

export interface CommentFormProps {
  mode: CommentFormMode
  initialValue?: string
  userImage: string | null
  isSubmitting: boolean
  onSubmit: (value: string) => Promise<void>
  onClose?: () => void
  autoFocus?: boolean
}

export const COMMENT_FORM_CONFIG: Record<
  CommentFormMode,
  {
    placeholder: string
    submitText: string
  }
> = {
  create: {
    placeholder: '댓글을 입력해주세요',
    submitText: '댓글 작성',
  },
  reply: {
    placeholder: '답글을 입력해주세요',
    submitText: '답글 작성',
  },
  edit: {
    placeholder: '수정할 내용을 입력해주세요',
    submitText: '수정 완료',
  },
}

export default function CommentForm({
  mode,
  initialValue = '',
  onSubmit,
  onClose,
  isSubmitting,
  userImage,
}: CommentFormProps) {
  const [text, setText] = useState(initialValue)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const config = COMMENT_FORM_CONFIG[mode]
  const trimmedText = text.trim()
  const isSubmitDisabled = isSubmitting || !trimmedText
  const showCancelButton = mode === 'reply'

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitDisabled) return

    try {
      await onSubmit(trimmedText)
      setText('')

      if (onClose) {
        onClose()
      }
    } catch {
      toast.error('작업을 완료하지 못했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex items-start gap-[15px]">
        <Image
          src={getImageUrl(userImage, true)}
          alt="user profile"
          width={40}
          height={40}
          className="size-10 rounded-full border border-gray-200 bg-white"
        />

        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={config.placeholder}
          disabled={isSubmitting}
          className="h-[106px] flex-1 resize-none bg-white p-4 text-base ring-1 ring-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-blue-500"
        />
      </div>

      <div className="flex w-full items-center justify-end gap-2">
        {showCancelButton && (
          <Button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            variant="secondary"
            className="h-10 w-26 rounded-xl border border-gray-300 bg-white text-gray-600"
          >
            취소
          </Button>
        )}

        <Button
          variant="default"
          className="h-10 w-26 rounded-xl bg-blue-500"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {config.submitText}
        </Button>
      </div>
    </form>
  )
}
