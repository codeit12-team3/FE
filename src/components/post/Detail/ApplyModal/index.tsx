import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui'

interface ApplyModalContentProps {
  onClose: () => void
  onSubmit: (message: string) => void
}

export default function ApplyModal({
  onClose,
  onSubmit,
}: ApplyModalContentProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        동행 신청 메시지
      </h2>

      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-gray-500 rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="신청 메시지를 입력해주세요"
        rows={4}
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button onClick={() => onSubmit(message)}>신청하기</Button>
      </div>
    </>
  )
}
