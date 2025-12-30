'use client'

import { Button } from '@/components/common'
import { Input } from '@/components/ui'

export default function ChatForm() {
  return (
    <form className="fixed bottom-0 left-0 w-full h-20 py-3 bg-gray-200 border-t border-gray-300">
      <div className="max-w-7xl w-full h-full mx-auto flex items-center gap-4 px-4">
        <Input
          placeholder="메시지를 입력해주세요"
          className="rounded-2xl flex-1 p-4 text-base font-normal bg-white"
        />
        <Button
          width="fit"
          className="w-[118px] h-14 bg-blue-500 text-white rounded-2xl text-base font-semibold shrink-0"
        >
          보내기
        </Button>
      </div>
    </form>
  )
}
