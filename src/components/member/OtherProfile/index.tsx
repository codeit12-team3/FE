'use client'

import Image from 'next/image'

import { useGetOtherProfile } from '@/api/member'
import { Skeleton } from '@/components/ui'
import { GENDER_MAP } from '@/constants/member'
import { getImageUrl } from '@/lib/common'
import { Profile } from '@/types/member'

interface Props {
  memberId: string
}

export default function OtherProfile({ memberId }: Props) {
  const { data, isPending } = useGetOtherProfile(memberId)

  return (
    <div className="flex flex-col gap-6">
      {isPending || !data ? (
        <OtherProfileSkeleton />
      ) : (
        <OtherProfileContent data={data} />
      )}
    </div>
  )
}

const OtherProfileContent = ({ data }: { data: Profile }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {/* 이미지 영역 */}
        <Image
          className="size-28 rounded-full border border-gray-200"
          width={112}
          height={112}
          alt={`${data?.nickname}의 프로필 이미지`}
          src={getImageUrl(data.image, true)}
        />

        {/* 정보 영역 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-800 text-lg font-semibold">
            {data?.nickname}
          </span>
          <p className="text-gray-500 text-sm font-medium text-center">
            {data.age}살 • {GENDER_MAP[data.gender]} • {data.mbti}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* 소개 영역 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-gray-500 text-xs font-medium">한줄 소개</span>
          <p className="text-gray-700 text-sm font-medium truncate p-3 rounded-xl bg-gray-200">
            {data.introduction ? data.introduction : '-'}
          </p>
        </div>

        {/* 스타일 영역 */}
        <div className="flex justify-center gap-2 px-3 py-4 border border-gray-300 rounded-xl">
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-gray-500 text-xs font-medium">
              여행 스타일
            </span>
            <span className="text-gray-600 text-sm font-semibold">
              {data.tripStyle ? data.tripStyle : '-'}
            </span>
          </div>

          <div className="w-px bg-gray-200" />

          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-gray-500 text-xs font-medium">숙소 취향</span>
            <span className="text-gray-600 text-sm font-semibold">
              {data.lodgingStyle ? data.lodgingStyle : '-'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

const OtherProfileSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {/* 이미지 영역: size-28 (112px) */}
        <Skeleton className="h-28 w-28 rounded-full" />

        {/* 정보 영역: 닉네임 + 메타정보 */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-7 w-24" /> {/* 닉네임 (text-lg) */}
          <Skeleton className="h-5 w-40" /> {/* 나이/성별/MBTI (text-sm) */}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* 소개 영역 */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-12" /> {/* 라벨 '한줄 소개' */}
          {/* 본문: p-3(12px*2) + text-sm(20px) = 44px (h-11) */}
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* 스타일 영역: 테두리 박스 구조 유지 */}
        <div className="flex justify-center gap-2 px-3 py-4 border border-gray-200 rounded-xl">
          <div className="flex-1 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-14" /> {/* 라벨 */}
            <Skeleton className="h-5 w-16" /> {/* 값 */}
          </div>

          {/* 구분선은 스켈레톤 대신 정적 요소 유지 (레이아웃 잡기 위함) */}
          <div className="w-px h-10 bg-gray-100" />

          <div className="flex-1 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>
    </>
  )
}
