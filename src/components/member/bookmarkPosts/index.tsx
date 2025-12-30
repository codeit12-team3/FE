'use client'

import FilterBar from '@/components/post/FilterBar'

export default function BookmarkPosts() {
  function handletest() {
    console.log('test')
  }
  return (
    <div>
      <FilterBar onApply={handletest} />
    </div>
  )
}
