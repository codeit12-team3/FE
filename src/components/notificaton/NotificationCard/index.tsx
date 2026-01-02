'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { OtherProfile } from '@/components/member'
import { Button } from '@/components/ui'
import { formatRelativeTime, getImageUrl } from '@/lib/common'
import { useModalActions } from '@/stores'
import { Notification } from '@/types/notifications'

interface Props {
  data: Notification
}

export default function NotificationCard({ data }: Props) {
  const router = useRouter()
  const { openModal } = useModalActions()

  return (
    <div className="w-full rounded-[20px] bg-white border border-gray-200 p-4 md:px-6 md:py-5 md:rounded-3xl">
      <div className="flex w-full gap-3 md:gap-4">
        <Image
          width={48}
          height={48}
          alt={`${data.sender.nickname}님의 프로필 이미지`}
          src={getImageUrl(data.sender.image, true)}
          className="size-12 border border-gray-200 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col gap-4 w-full min-w-0">
          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center text-gray-800 text-sm font-semibold min-w-0">
                <button
                  onClick={() => {
                    openModal(<OtherProfile memberId={data.sender.id} />)
                  }}
                  className="text-blue-500 hover:underline active:underline cursor-pointer truncate"
                >
                  {data.sender.nickname}
                </button>
                <span className="shrink truncate">님이 동행을 요청했어요.</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 shrink-0">
                {formatRelativeTime(data.timestamp)}
              </span>
            </div>
            <p className="text-xs text-gray-600 truncate">
              {data.applyMessage}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => router.push(`/member/received`)} size={'sm'}>
              요청 확인하기
            </Button>
            <Button
              onClick={() => router.push(`/posts/${data.postId}`)}
              variant={'secondary'}
              size={'sm'}
            >
              게시글 확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
