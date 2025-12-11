'use client'

import { useState } from 'react'

import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'

interface CommentInputProps {
  nickname: string
  parentId?: number | null
  onSubmit: (value: string, parentId?: number | null) => void
  onCancel?: () => void
}

export default function CommentInput({
  nickname,
  parentId = null,
  onSubmit,
  onCancel,
}: CommentInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text.trim(), parentId)
    setText('')
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <p className="text-sm text-gray-900 mb-3">
        <span className="font-semibold">{nickname}</span>
      </p>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 남겨보세요."
        rows={3}
        className="bg-bg-input"
      />

      <div className="flex justify-end gap-2 mt-3">
        <Button variant="secondary" className="h-8" onClick={onCancel}>
          취소
        </Button>

        <Button className="h-8" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  )
}
