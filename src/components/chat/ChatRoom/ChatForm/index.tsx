'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { IconSendSolid } from '@/assets/svgr'
import { Button } from '@/components/common'
import { Input } from '@/components/ui'
import { useWS } from '@/providers/WebSocketContext'

export default function ChatForm() {
  const params = useParams()
  const searchParams = useSearchParams()

  const chatRoomId = Number(params.roomId)
  const chatParticipantId = Number(searchParams.get('chatParticipantId'))

  const { sendMessage } = useWS()
  const [text, setText] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    sendMessage({
      chatRoomId,
      chatParticipantId,
      message: text,
      messageType: 'CHAT',
    })
    setText('')
  }
  return (
    <form
      onSubmit={handleSend}
      className="w-full md:sticky fixed bottom-0 left-0 items-center gap-2 px-4 py-2 flex"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메시지를 입력해주세요"
        className="rounded-full flex-1 text-sm font-normal h-10 md:h-12 bg-white"
      />
      <Button
        width="fit"
        type="submit"
        className="bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 p-0 rounded-full font-semibold shrink-0"
      >
        <IconSendSolid className="text-white w-4 h-4 md:w-6 md:h-6 mt-px pr-px" />
      </Button>
    </form>
  )
}
