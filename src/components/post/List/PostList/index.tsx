'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { PostContent } from '@/types/post/post.type'

import FilterBar from '../FilterBar'
import PostListSection from '../PostListSection'

export default function PostList() {
  const [posts, setPosts] = useState<PostContent[]>([])
  const [lastPostId, setLastPostId] = useState<number | null>(null)
  const [isLast, setIsLast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [filters, setFilters] = useState({
    region: undefined,
    date: undefined,
    age: undefined,
    ageType: undefined,
    gender: undefined,
    keyword: '',
  })

  useEffect(() => {
    fetchPosts(false)
  }, [])

  const fetchPosts = async (append: boolean) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await axios.get('/v1/posts', {
        params: {
          lastPostId: append ? lastPostId : undefined,
          size: 20,
          ...filters,
        },
      })
      const data = res.data
      if (append) {
        setPosts((prev) => [...prev, ...data.content])
      } else {
        setPosts(data.content)
      }
      setIsLast(data.isLast)
      if (data.content.length > 0) {
        const last = data.content[data.content.length - 1]
        setLastPostId(last.postId)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = () => {
    fetchPosts(true)
  }

  return (
    <div>
      <FilterBar />

      <PostListSection posts={posts} />

      {!isLast && posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            disabled={isLoading}
            onClick={handleLoadMore}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isLoading ? '로딩 중...' : '더보기'}
          </button>
        </div>
      )}
    </div>
  )
}
