'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useRemoveBookmarkInMyPage } from '@/api/member'
import { IconHeartSolid, IconUser } from '@/assets/svgr'
import { toast } from '@/components/common'
import { Button } from '@/components/ui'
import { formatDateToKorean, getImageUrl } from '@/lib/common'
import { BookmarkedPost } from '@/types/member'

interface Props {
  post: BookmarkedPost
  idx?: number
}

export default function BookmarkCard({ post, idx = 0 }: Props) {
  const router = useRouter()
  const removeBookmark = useRemoveBookmarkInMyPage()

  const handleRemoveBookmark = () => {
    removeBookmark.mutate(post.postId.toString(), {
      onSuccess: () => {
        toast.success('북마크가 해제되었습니다')
      },
      onError: () => {
        toast.error('북마크 해제에 실패했습니다')
      },
    })
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:p-6 rounded-3xl md:rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* 사진부분 */}
      <Image
        width={744}
        height={188}
        priority={idx < 3}
        sizes="188px"
        className="relative w-full h-[188px] md:w-[188px] rounded-3xl rounded-b-none md:rounded-b-3xl overflow-hidden shrink-0 object-cover"
        src={getImageUrl(post.thumbnail)}
        alt={post.title}
      />

      <div className="flex flex-col w-full px-4 pb-4 md:px-0 md:pb-0">
        {/* 태그 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            {post.tags.map((tag) => (
              <span
                key={`${post.postId}-${tag}`}
                className="px-3 py-1.5 bg-blue-50 text-blue-500 text-xs font-semibold rounded-3xl"
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <IconHeartSolid
              className="cursor-pointer"
              onClick={handleRemoveBookmark}
            />
          </div>
        </div>

        {/* 가운데 */}
        <div className="flex-1 pt-3.5 pb-[22px]">
          {/* 게시글 타이틀 */}
          <button
            onClick={() => router.push(`/posts/${post.postId}`)}
            className="text-left hover:underline focus:outline-none cursor-pointer"
          >
            <h4 className="text-black text-xl font-bold line-clamp-1">
              {post.title}
            </h4>
          </button>
          {/* 작성자 닉네임 */}
          <p className="text-gray-500 text-sm line-clamp-2 h-10">
            작성자 <span className="text-gray-600">{post.nickname}</span>
          </p>
        </div>

        {/* 하단 컨텐츠 */}
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-full">
          <div className="flex flex-col gap-2.5">
            <span className="flex text-sm font-medium">
              <IconUser className="size-4 mr-1" />
              <span className="text-blue-600">{post.currentMembers}</span> 명
              신청
            </span>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">위치</span>
                <span className="text-gray-600">{post.region}</span>
              </div>
              <div className="border-l border-gray-300 self-stretch h-auto my-[4.5px]" />
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">날짜</span>
                <span className="text-gray-600">
                  {formatDateToKorean(post.period.startDate)}
                </span>
              </div>
              <div className="border-l border-gray-300 self-stretch h-auto my-[4.5px]" />
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">나이</span>
                <span className="text-gray-600">{post.conditions.ageType}</span>
              </div>
              <div className="border-l border-gray-300 self-stretch h-auto my-[4.5px]" />
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">성별</span>
                <span className="text-gray-600">
                  {post.conditions.genderCondition}
                </span>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-end gap-2 w-full md:w-auto">
            {post.recruitStatus === 'RECRUITING' ? (
              <Button
                onClick={() => router.push(`/posts/${post.postId}`)}
                className="w-full md:w-28"
                variant={'secondary'}
                size={'md'}
              >
                신청하기
              </Button>
            ) : (
              <Button
                className="w-full md:w-28"
                variant={'secondary'}
                size={'md'}
                disabled
              >
                모집 종료
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
