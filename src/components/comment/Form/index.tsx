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
}

export default function CommentWriteForm({
  parentId = null,
  onSubmit,
  onCancel,
}: CommentWriteFormProps) {
  const { data } = useMyProfileQuery()

  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text, parentId)
    setText('')
  }

  return (
    <form className="w-full flex flex-col gap-[15px]" onSubmit={handleSubmit}>
      <div className="flex items-start gap-[15px]">
        <Image
          src={
            data?.image?.startsWith('blob:')
              ? data?.image
              : getImageUrl(data?.image)
          }
          alt="userprofile"
          width={40}
          height={40}
          className="rounded-full border border-gray-200 bg-white"
        />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 h-[106px] border border-gray-200 resize-none p-4 placeholder:text-gray-500 bg-white text-base"
        />
      </div>

      <div className="w-full flex items-center justify-end gap-2 mt-3">
        <Button className="w-26 h-10 rounded-2xl" type="submit">
          댓글 작성
        </Button>
      </div>
    </form>
  )
}
