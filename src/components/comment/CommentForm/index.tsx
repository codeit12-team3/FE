'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useMyProfileQuery } from '@/api/member/member.queries'
import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'
import { getImageUrl } from '@/lib/common/image'

interface CommentWriteFormProps {
  parentId?: number | null
  onSubmit: (value: string, parentId?: number | null) => void
  onCancel?: () => void
  isSubmitting: boolean
}

const FORM_CONFIG = {
  comment: {
    placeholder: '댓글을 입력해주세요',
    submitText: '댓글 작성',
  },
  reply: {
    placeholder: '답글을 입력해주세요',
    submitText: '답글 작성',
  },
} as const

export default function CommentForm({
  parentId,
  onSubmit,
  onCancel,
  isSubmitting,
}: CommentWriteFormProps) {
  const { data } = useMyProfileQuery()
  const [text, setText] = useState('')

  const isReply = !!parentId
  const formType = isReply ? 'reply' : 'comment'
  const config = FORM_CONFIG[formType]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    onSubmit(text, parentId)
    setText('')
    onCancel?.()
  }

  return (
    <form className="w-full flex flex-col gap-2 " onSubmit={handleSubmit}>
      <div className="flex items-start gap-[15px]">
        <Image
          src={getImageUrl(data?.image, true)}
          alt="userprofile"
          width={40}
          height={40}
          className="rounded-full border border-black/5 bg-white"
        />

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={config.placeholder}
          disabled={isSubmitting}
          className="flex-1 h-[106px] ring-gray-200 resize-none ring-1 focus-visible:ring-1 focus-visible:ring-blue-500 focus p-4 placeholder:text-gray-500 bg-white text-base"
        />
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        {isReply && (
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            variant="secondary"
            className="w-26 h-10 rounded-[12px] border border-gray-300 bg-white text-gray-600"
          >
            취소
          </Button>
        )}

        <Button
          variant="default"
          className="w-26 h-10 rounded-[12px] bg-blue-500"
          type="submit"
        >
          {config.submitText}
        </Button>
      </div>
    </form>
  )
}
