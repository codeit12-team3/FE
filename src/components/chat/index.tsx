'use client'

import { useState } from 'react'

import { useDebounce } from '@/hooks/chat/useDebounce'
import { ChatRoomFilters } from '@/types/chat/chats.types'

import ChatRoomFilterBar from './Filter/ChatRoomFilterBar'
import ChatList from './List'

export default function ChatRoomContainer() {
  const [filters, setFilters] = useState<ChatRoomFilters>({
    nation: '',
    age: '',
    gender: '',
    date: '',
    keyword: '',
  })
  const debouncedKeyword = useDebounce(filters.keyword, 500)
  const finalFilters = {
    ...filters,
    keyword: filters.keyword === '' ? '' : debouncedKeyword,
  }
  return (
    <div className="max-w-7xl w-full flex flex-col gap-6 mx-auto pt-12 px-4 md:px-6 xl:px-0">
      <ChatRoomFilterBar filters={filters} setFilters={setFilters} />
      <ChatList filters={finalFilters} />
    </div>
  )
}
