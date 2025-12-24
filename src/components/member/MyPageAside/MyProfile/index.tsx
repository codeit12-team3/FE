'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react/jsx-runtime'

import { useMyProfileQuery } from '@/api/member'
import { IconPencil } from '@/assets/svgr'
import { Button, Skeleton } from '@/components/ui'
import {
  GENDER_MAP,
  LODGING_STYLE_MAP,
  TRIP_STYLE_MAP,
} from '@/constants/member'
import { getImageUrl } from '@/lib/common'
import { MyProfile as MyInfo } from '@/types/member'

export default function MyProfile() {
  const router = useRouter()
  const { data, isPending } = useMyProfileQuery()

  return (
    <section className="relative flex flex-col gap-4 rounded-4xl px-6 py-8 bg-white broder border-gray-200">
      {!data || isPending ? (
        <ProfileSkeleton />
      ) : (
        <ProfileContent data={data} />
      )}

      <Button
        onClick={() => router.push('/member/edit')}
        className="absolute size-6 rounded-full top-5 right-5"
      >
        <IconPencil className="size-4 text-white" />
      </Button>
    </section>
  )
}

interface ProfileContentProps {
  data: MyInfo
}
const ProfileContent = ({ data }: ProfileContentProps) => {
  return (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <Image
          className="size-12 rounded-full border border-gray-300 object-cover"
          src={getImageUrl(data.image, true)}
          width={50}
          height={50}
          alt="프로필 이미지"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <span className="truncate text-gray-800 text-sm font-semibold">
            {data.nickname}
          </span>
          <span className="truncate text-gray-500 text-xs">{data.email}</span>
        </div>
      </div>

      <div className="w-full border-t border-gray-200" />

      <div className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 text-gray-700 text-xs font-medium pl-2">
        <span className="text-gray-500">나이</span>
        <span className="truncate text-right">{`${data.birth.split('-')[0]}년생 / ${data?.age}살`}</span>
        <span className="text-gray-500">성별</span>
        <span className="truncate text-right">{GENDER_MAP[data.gender]}</span>
        <span className="text-gray-500">MBTI</span>
        <span className="truncate text-right">{data.mbti}</span>
        <span className="text-gray-500">여행 스타일</span>
        <span className="truncate text-right">
          {data.tripStyle ? TRIP_STYLE_MAP[data.tripStyle] : '-'}
        </span>
        <span className="text-gray-500">숙소 스타일</span>
        <span className="truncate text-right">
          {data.lodgingStyle ? LODGING_STYLE_MAP[data.lodgingStyle] : '-'}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 text-xs font-medium pl-2">
        <span className="text-gray-500">한줄 소개</span>
        <span className="truncate text-gray-700 p-3 bg-gray-200 rounded-xl">
          {data.introduction ? data.introduction : '-'}
        </span>
      </div>
    </>
  )
}

const ProfileSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <Skeleton className="h-12 w-12 rounded-full border border-gray-200" />
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>

      <div className="w-full border-t border-gray-100" />

      <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4 pl-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Fragment key={`skeleton-1-${i}`}>
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-20" />
          </Fragment>
        ))}
      </div>

      <div className="flex flex-col gap-2 pl-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </>
  )
}
