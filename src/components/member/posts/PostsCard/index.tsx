import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMyPosts } from '@/api/posts'
import { Button } from '@/components/common/Button'
import { getImageUrl } from '@/lib/common'

export default function PostsCard() {
  const { data, isLoading } = useMyPosts()
  const router = useRouter()

  const post =
    data?.data && 'content' in data.data ? data.data.content[0] : null

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (!post) {
    return <div>게시글이 없습니다.</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  return (
    <div className="h-61 rounded-4xl border-2 bg-white flex p-6">
      <div className="relative w-[188px] h-[188px] rounded-2xl overflow-hidden shrink-0 bg-bg-disabled mr-6">
        <Image
          src={getImageUrl(post.thumbnail) || '/images/default-thumbnail.png'}
          alt="게시글 이미지"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#EDF4FB] text-main text-sm font-semibold rounded-3xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h2
          className="text-xl font-semibold cursor-pointer"
          onClick={() => router.push(`/posts/${post.postId}`)}
        >
          {post.title}
        </h2>
        <span className="text-text-disabled mr-1.5 text-sm font-medium">
          모집상태
        </span>
        <span className="text-text-input text-sm font-medium">
          {post.recruitStatus === 'RECRUITING' ? '모집중' : '모집 완료'}
        </span>

        <div className="flex justify-between items-end mt-10">
          <div>
            <div className="flex items-center mb-1">
              <Image
                src="/images/UserIcon.svg"
                alt="신청자"
                width={16}
                height={16}
              />
              <span className="font-medium text-sm text-main ml-1.5">
                {post.currentMembers}
              </span>
              <span className="font-medium text-sm">/{post.maxMembers}명</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-text-disabled mr-1.5">위치</span>
              <span className="text-text-input">{post.region}</span>
              <div className="border-l h-4 mx-3"></div>
              <span className="text-text-disabled mr-1.5">날짜</span>
              <span className="text-text-input">
                {formatDate(post.period.startDate)} -{' '}
                {formatDate(post.period.endDate)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="md" className="w-39">
              수정하기
            </Button>
            <Button size="md" variant="secondary" className="w-39">
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
