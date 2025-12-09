'use client'

import { Heart, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/common/Button'
import { PostContent } from '@/types/posts'

export default function PostCard({ post }: { post: PostContent }) {
  const router = useRouter()
  const tagStyle = 'px-3 py-1 bg-blue-50 text-main rounded-full text-xs'
  const cardBase =
    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border'

  return (
    <div
      className={cardBase}
      onClick={() => router.push(`/posts/${post.postId}`)}
    >
      <div className="flex gap-4">
        {post.recruitStatus === 'CLOSED' ? (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0  bg-black/60 flex items-center justify-center">
            <p className="text-white">모집이 마감되었어요.</p>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-bg-disabled">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 ml-3">
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <span key={tag} className={tagStyle}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-text-base mb-1">
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
            <div className="flex items-center gap-1">
              <span className="text-text-disabled">위치</span>
              <span className="text-text-base">{post.region}</span>
            </div>

            <span className="text-text-disabled">|</span>

            <div className="flex items-center gap-1">
              <span className="text-text-disabled">날짜</span>
              <span className="text-text-base">
                {new Date(post.period.startDate).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <span className="text-text-disabled">|</span>

            <div className="flex items-center gap-1">
              <span className="text-text-disabled">나이</span>
              <span className="text-text-base">
                {post.conditions.ageCondition}
              </span>
            </div>

            <span className="text-text-disabled">|</span>

            <div className="flex items-center gap-1">
              <span className="text-text-disabled">성별</span>
              <span className="text-text-base">
                {post.conditions.genderCondition}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-bg-input rounded-full transition-colors">
            <Heart
              className={`w-6 h-6 ${
                post.bookmarked ? 'fill-main text-main' : 'text-text-input'
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
