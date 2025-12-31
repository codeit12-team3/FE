import Image from 'next/image'

import { usePostDetail } from '@/api/posts'
import { getImageUrl } from '@/lib/common'

export default function PostWriter({ postId }: { postId: string }) {
  const { data: post } = usePostDetail({ postId })
  if (!post || !post.success) return null
  const {
    writer: { age, gender, mbti, birth, nickname, profileImage },
  } = post.data

  return (
    <>
      <div className="flex md:px-8 px-6 border md:pt-10 md:pb-12 py-8 bg-white border-slate-100 rounded-3xl h-35 md:h-71 lg:w-75 md:w-59.5">
        <div className="flex md:flex-col gap-5 items-start md:justify-center w-full">
          <div className="flex md:gap-5 gap-3">
            <div className="md:size-10 relative rounded-full overflow-hidden border border-gray-100 shrink-0 size-10">
              <Image
                src={getImageUrl(profileImage)}
                alt="user profile"
                fill
                sizes="(max-width: 768px) 40px, 80px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-2 items-center ">
              <span className="font-semibold bg-blue-50 text-blue-500 py-1.5 px-2.5 rounded-full text-xs">
                작성자
              </span>
              <span className="font-semibold text-sm md:text-base">
                {nickname}
              </span>
            </div>
          </div>
          <div className="border border-gray-200 h-px w-full hidden md:flex" />
          <div>
            <div className="flex flex-col gap-2  text-sm">
              <div className="flex gap-1.5">
                <span className="w-10 text-gray-600">나이</span>
                <span className="text-gray-800">
                  {birth}년생 / {age}살
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-10 text-gray-600">성별</span>
                <span className="text-gray-800">
                  {gender === 'MALE' ? '남성' : '여성'}
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-10 text-gray-600">MBTI</span>
                <span className="text-gray-800">{mbti}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
