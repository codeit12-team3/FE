'use client'

import { IconSearch } from '@/assets/svgr'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

interface ChatRoomSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function ChatRoomSearchBar({
  value,
  onChange,
}: ChatRoomSearchBarProps) {
  return (
    <InputGroup className="max-w-[332px] w-full h-10 rounded-full bg-gray-200 border-none shadow-none transition-all ring-blue-600">
      <InputGroupInput
        placeholder="검색어를 입력해 주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-4 text-xs placeholder:text-slate-600 text-gray-800"
      />
      <InputGroupAddon align="inline-end">
        <IconSearch className="size-6 text-gray-600" />
      </InputGroupAddon>
    </InputGroup>
  )
}
