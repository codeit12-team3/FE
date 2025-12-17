'use client'

import { Heart, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAddBookmark, useRemoveBookmark } from '@/api/posts/posts.mutations'
import { Button } from '@/components/ui'
import { NATION_CODE_TO_LABEL } from '@/constants/posts'
import { getImageUrl } from '@/lib/common'
import { PostListItem } from '@/types/posts'

export default function PostCard({ post }: { post: PostListItem }) {
  const router = useRouter()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (post.isBookmarked) {
        await removeBookmark.mutateAsync(String(post.postId))
      } else {
        await addBookmark.mutateAsync(String(post.postId))
      }
    } catch (error) {
      console.error('북마크 토글 실패:', error)
    }
  }

  const TAG_STYLE = 'px-3 py-1 bg-blue-50 text-main rounded-full text-xs'
  const CARD_BASE =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-input'
  const LABEL = 'text-text-disabled'
  const VALUE = 'text-text-base'
  const INFO_ROW = 'flex items-center gap-1'

  return (
    <div className={CARD_BASE}>
      <div className="flex gap-4">
        {post.recruitStatus === 'CLOSED' ? (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-black/60 flex items-center justify-center">
            <p className="text-white">모집이 마감되었어요.</p>

            <Image
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-bg-disabled">
            <Image
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 ml-3">
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <span key={tag} className={TAG_STYLE}>
                {tag}
              </span>
            ))}
          </div>

          <h3
            className="text-lg font-semibold text-text-base mb-1"
            onClick={() => router.push(`/posts/${post.postId}`)}
          >
            {post.title}
          </h3>

          <div className="flex gap-1">
            <p className="text-sm text-text-disabled mb-3">작성자</p>
            <p className="text-sm text-text-input">{post.nickname}</p>
          </div>

          <div className="flex text-sm mb-2 gap-1 mt-8">
            <User className="w-4 h-4" />
            <span>{post.currentMembers}명 신청</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-input">
            <div className={INFO_ROW}>
              <span className={LABEL}>위치</span>
              <span className={VALUE}>{NATION_CODE_TO_LABEL[post.nation]}</span>
              <span className={VALUE}>{post.region}</span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>날짜</span>
              <span className={VALUE}>
                {new Date(post.period.startDate).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>나이</span>
              <span className={VALUE}>{post.conditions.ageType}</span>
            </div>

            <span className={LABEL}>|</span>

            <div className={INFO_ROW}>
              <span className={LABEL}>성별</span>
              <span className={VALUE}>{post.conditions.genderCondition}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleToggleBookmark}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-gray-50"
          >
            <Heart
              className={`w-6 h-6 ${
                post.isBookmarked ? 'fill-main text-main' : 'text-text-input'
              }`}
            />
          </button>

          {post.recruitStatus === 'CLOSED' ? (
            <Button
              size="sm"
              className="w-39 bg-bg-disabled text-text-disabled"
            >
              모집종료
            </Button>
          ) : (
            <Button size="sm" className="w-39">
              신청하기
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
