'use client'

import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_ENUM_OPTIONS,
} from '@/constants/posts/rule.const'
import { ChatRoomFilters } from '@/types/chat/chats.types'

import ChatRoomCalendar from '../ChatRoomCalendar'
import ChatRoomSearchBar from '../ChatRoomSearchBar'
import { ChatRoomSelect } from '../ChatRoomSelect'

interface ChatRoomFilterBarProps {
  filters: ChatRoomFilters
  setFilters: React.Dispatch<React.SetStateAction<ChatRoomFilters>>
}

export default function ChatRoomFilterBar({
  filters,
  setFilters,
}: ChatRoomFilterBarProps) {
  const handleUpdate = (key: keyof ChatRoomFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <aside className="flex justify-between w-full">
      <div className="flex items-center gap-2">
        <ChatRoomSelect
          label="국가"
          value={filters.nation}
          options={NATION_ENUM_OPTIONS}
          onValueChange={(val) => handleUpdate('nation', val)}
        />
        <ChatRoomSelect
          label="나이"
          value={filters.age}
          options={AGE_OPTIONS}
          onValueChange={(val) => handleUpdate('age', val)}
        />
        <ChatRoomSelect
          label="성별"
          value={filters.gender}
          options={GENDER_OPTIONS}
          onValueChange={(val) => handleUpdate('gender', val)}
        />
      </div>

      <ChatRoomSearchBar
        value={filters.keyword || ''}
        onChange={(val) => handleUpdate('keyword', val)}
      />
    </aside>
  )
}
