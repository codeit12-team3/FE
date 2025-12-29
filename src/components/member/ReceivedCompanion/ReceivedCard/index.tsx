'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useUpdateCompanionStatus } from '@/api/companions'
import { IconUser } from '@/assets/svgr'
import { toast } from '@/components/common'
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
    status: Exclude<CompanionState, 'PENDING'>,
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
    <div className="w-full flex flex-col md:flex-row md:p-6 rounded-3xl md:rounded-[40px] gap-6 bg-white border border-gray-200">
      {/* Thumbnail */}
      <Image
        width={744}
        height={188}
        priority={idx < 3}
        sizes="188px"
        className="relative w-full h-[188px] md:w-[188px] rounded-3xl rounded-b-none md:rounded-b-3xl overflow-hidden shrink-0 object-cover"
        src={getImageUrl(thumbnail)}
        alt={`${title} 게시글의 Thumbnail`}
      />

      <div className="flex flex-col w-full px-4 pb-4 md:px-0 md:pb-0">
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
          <p className="text-gray-500 text-sm line-clamp-2 h-10">
            {applyMessage}
          </p>
        </div>

        {/* 하단 컨텐츠 */}
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between w-full">
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
            <div className="flex items-end gap-2 w-full md:w-auto">
              <Button
                onClick={() => handleUpdateCompanion(companionId, 'APPROVED')}
                className="flex-1 md:w-28"
                size={'md'}
                disabled={isPending}
              >
                수락하기
              </Button>
              <Button
                onClick={() => handleUpdateCompanion(companionId, 'DENIED')}
                className="flex-1 md:w-28"
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
