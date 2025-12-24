'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useUpdateCompanionStatus } from '@/api/companions'
import { IconUser } from '@/assets/svgr'
import { Button } from '@/components/ui'
import { formatDateToKorean, getImageUrl } from '@/lib/common'
import { CompanionState, ReceivedCompanionContent } from '@/types/companions'

interface Props {
  data: ReceivedCompanionContent
  idx: number
}

export default function RecievedCard({ data, idx }: Props) {
  const router = useRouter()

  const { id, title, thumbnail, tags, region, startDate } = data.postResponse
  const { companionId, nickname, applyMessage, status } =
    data.guestCompanionResponse

  const { mutate, isPending } = useUpdateCompanionStatus()

  const handleUpdateCompanion = async (
    companionId: string,
    status: 'APPROVE' | 'DENIED',
  ) => {
    mutate(
      {
        companionId,
        status,
      },
      {
        onSuccess: () => {
          toast.success('요청이 처리되었습니다')
        },
      },
    )
  }

  return (
    <div className="w-full flex p-6 max-h-[236px] rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail */}
      <div className="relative size-[188px] rounded-3xl overflow-hidden shrink-0">
        <Image
          fill
          priority={idx < 3}
          sizes="188px"
          className="object-cover"
          src={getImageUrl(thumbnail)}
          alt={`${title} 게시글의 Thumbnail`}
        />
      </div>

      <div className="flex flex-col w-full">
        {/* 여행 태그 */}
        <div className="flex items-center gap-2.5">
          {tags.map((tag) => (
            <span
              key={`id-${tag}`}
              className="px-3 py-1.5 bg-blue-50 text-blue-500 text-xs font-semibold rounded-3xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 중단 컨텐츠 */}
        <div className="flex-1 pt-3.5 pb-[22px]">
          {/* 게시글 타이틀 */}
          <button
            onClick={() => router.push(`/posts/${id}`)}
            className="text-left hover:underline focus:outline-none cursor-pointer"
          >
            <h4 className="text-black text-xl font-bold line-clamp-1">
              {title}
            </h4>
          </button>
          {/* 신청 메시지 */}
          <p className="text-gray-500 text-sm line-clamp-2">{applyMessage}</p>
        </div>

        {/* 하단 컨텐츠 */}
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1">
              <IconUser className="size-4" />
              <span className="text-sm font-medium">{nickname}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">지역</span>
                <span className="text-gray-600">{region}</span>
              </div>
              <div className="border-l border-gray-300 self-stretch h-auto my-[4.5px]" />
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-400">날짜</span>
                <span className="text-gray-600">
                  {formatDateToKorean(startDate)}
                </span>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          {status === 'PENDING' && (
            <div className="flex items-end gap-2">
              <Button
                onClick={() => handleUpdateCompanion(companionId, 'APPROVE')}
                className="md:w-28"
                size={'md'}
                disabled={isPending}
              >
                수락하기
              </Button>
              <Button
                onClick={() => handleUpdateCompanion(companionId, 'DENIED')}
                className="md:w-28"
                variant={'secondary'}
                size={'md'}
                disabled={isPending}
              >
                거절하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
