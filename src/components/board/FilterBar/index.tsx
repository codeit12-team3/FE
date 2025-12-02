'use client'

import { Plus, Search } from 'lucide-react'

import FilterSelect from '../FilterSelect'

export default function FilterBar({
  onOpenModal,
}: {
  onOpenModal: () => void
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      {/* Select 필터 */}
      <div className="flex gap-2">
        <FilterSelect placeholder="국가" />
        <FilterSelect placeholder="날짜" />
        <FilterSelect placeholder="나이" />
        <FilterSelect placeholder="성별" />
      </div>

      {/* 검색창 */}
      <div className="flex-1 relative max-w-[456px]">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-bg-disabled text-text-base placeholder:text-text-input"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input" />
      </div>

      {/* 버튼 */}
      <button
        className="bg-main text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity h-10"
        onClick={onOpenModal}
      >
        <Plus className="w-5 h-5" />
        동행 구하기
      </button>
    </div>
  )
}
