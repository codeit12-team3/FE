'use client'

import { useState } from 'react'

import { useDebounce } from '@/hooks/chat/useDebounce'

import RoomList from '../RoomList/RoomList'
import SearchBar from '../SearchBar/SearchBar'

export default function ChatListContainer() {
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce(keyword, 500)

  const onChangeKeyword = (text: string) => {
    setKeyword(text)
  }

  const finalSearchKeyword = keyword === '' ? '' : debouncedKeyword

  return (
    <div className="max-w-7xl w-full flex flex-col gap-3 mx-auto px-0 md:px-1 relative">
      <SearchBar value={keyword} onChange={onChangeKeyword} />
      <RoomList searchKeyword={finalSearchKeyword} />
    </div>
  )
}
