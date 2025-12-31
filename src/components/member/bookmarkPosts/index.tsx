'use client'

import FilterBar from '@/components/post/FilterBar'

import BookmarkList from './BookmarkList'

export default function BookmarkPosts() {
  function handletest() {
    console.log('test')
  }
  return (
    <div>
      <FilterBar onApply={handletest} />
      <BookmarkList />
    </div>
  )
}
