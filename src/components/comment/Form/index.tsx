'use client'

import { useState } from 'react'

import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'

import UserInfo from './UserInfo'

interface CommentWriteFormProps {
  parentId?: number | null
  onSubmit: (value: string, parentId?: number | null) => void
  onCancel?: () => void
}

export default function CommentWriteForm({
  parentId = null,
  onSubmit,
  onCancel,
}: CommentWriteFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text.trim(), parentId)
    setText('')
  }

  return (
    <form
      className="w-[693px] bg-blue-50 rounded-lg p-4 flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <UserInfo />

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 남겨보세요."
        className="w-full h-6 resize-none"
      />

      <div className="w-full flex items-center justify-end gap-2 mt-3">
        <Button
          variant="secondary"
          className="h-8"
          onClick={onCancel}
          type="button"
        >
          취소
        </Button>
        <Button className="h-8" type="submit">
          등록
        </Button>
      </div>
    </form>
  )
}
