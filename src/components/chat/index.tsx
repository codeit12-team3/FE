'use client'

import { useState } from 'react'

import { useDebounce } from '@/hooks/chat/useDebounce'

import ChatList from './List'
import SearchBar from './SearchBar'

export default function ChatRoomContainer() {
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce(keyword, 500)

  const onChangeKeyword = (text: string) => {
    setKeyword(text)
  }

  const finalSearchKeyword = keyword === '' ? '' : debouncedKeyword

  return (
    <div className="max-w-7xl w-full flex flex-col gap-6 mx-auto pt-12 px-4 md:px-6 xl:px-0">
      <SearchBar value={keyword} onChange={onChangeKeyword} />
      <ChatList searchKeyword={finalSearchKeyword} />
    </div>
  )
}
