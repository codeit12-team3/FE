'use client'

import { Book, Loader } from 'lucide-react'

import { EmptyCard } from '@/components/common'

import BookmarkCard from '../BookmarkCard'
import BookmarkSkeleton from '../BookmarkSkeleton'

export default function BookmarkList() {
  return (
    <div className="flex flex-col gap-4">
      <BookmarkSkeleton />
    </div>
  )
}
