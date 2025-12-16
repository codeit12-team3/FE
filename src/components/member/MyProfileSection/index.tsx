'use client'

import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMyProfileQuery } from '@/api/member/member.queries'
import { Button, Skeleton } from '@/components/ui'
import {
  GENDER_MAP,
  LODGING_STYLE_MAP,
  TRIP_STYLE_MAP,
} from '@/constants/member'
import { getImageUrl } from '@/lib/common'
import { MyProfile } from '@/types/member'

export default function MyProfileSection() {
  const router = useRouter()
  const { data, isPending } = useMyProfileQuery()

  return (
    <section className="border-2 border-popover-border rounded-xl px-6 pt-4 pb-6 bg-white space-y-3">
      {/* 프로필 섹션 타이틀 */}
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">내 프로필</h3>
        <Button
          onClick={() => router.push('/member/edit')}
          size={'icon'}
          className="rounded-full"
        >
          <Pencil className="size-4" />
        </Button>
      </div>
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <div className="size-14 rounded-full border-2 border-popover-border">
          <Image
            src={getImageUrl(data?.image, true)}
            alt="프로필 이미지"
            width={60}
            height={60}
            className="size-full object-cover p-1 rounded-full"
          />
        </div>
        <div className="flex justify-between w-full text-sm">
          {!data || isPending ? (
            <MyProfileSkeleton />
          ) : (
            <MyProfileInfo data={data} />
          )}
        </div>
      </div>
    </section>
  )
}

interface MyProfileInfoProps {
  data: MyProfile
}
const MyProfileInfo = ({ data }: MyProfileInfoProps) => {
  return (
    <>
      {/* 첫 번째 섹션: 기본 정보 */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 w-full items-center">
        <span className="font-medium">닉네임</span>
        <span className="truncate">{data.nickname}</span>

        <span className="font-medium">이메일</span>
        <span className="truncate">{data.email}</span>

        <span className="font-medium invisible">공백</span>
        <span className="invisible">-</span>
      </div>

      <div className="w-0.5 bg-popover-border mx-8 self-stretch" />

      {/* 두 번째 섹션: 개인 정보 */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 w-full items-center">
        <span className="font-medium">나이</span>
        <span>
          {data.birth.split('-')[0]}년생 / {data.age}살
        </span>

        <span className="font-medium">성별</span>
        <span>{GENDER_MAP[data.gender]}</span>

        <span className="font-medium">MBTI</span>
        <span>{data.mbti}</span>
      </div>

      <div className="w-0.5 bg-popover-border mx-8 self-stretch" />

      {/* 세 번째 섹션: 취향 정보 */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 w-full items-center">
        <span className="font-medium">여행 스타일</span>
        <span>{data.tripStyle ? TRIP_STYLE_MAP[data.tripStyle] : '-'}</span>

        <span className="font-medium">숙소 취향</span>
        <span>
          {data.lodgingStyle ? LODGING_STYLE_MAP[data.lodgingStyle] : '-'}
        </span>

        <span className="font-medium">한줄소개</span>
        <span className="truncate">{data.introduction || '-'}</span>
      </div>
    </>
  )
}

const MyProfileSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 flex-1 items-center">
        <span className="font-medium">닉네임</span>
        <Skeleton className="h-5 w-20" />

        <span className="font-medium">이메일</span>
        <Skeleton className="h-5 w-full" />

        <span className="font-medium invisible">공백</span>
        <Skeleton className="h-5 w-10 invisible" />
      </div>

      <div className="w-0.5 h-24 bg-popover-border mx-8" />

      {/* 2. 개인 정보 스켈레톤 */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 flex-1 items-center">
        <span className="font-medium">나이</span>
        <Skeleton className="h-5 w-8" />

        <span className="font-medium">성별</span>
        <Skeleton className="h-5 w-10" />

        <span className="font-medium">MBTI</span>
        <Skeleton className="h-5 w-14" />
      </div>

      <div className="w-0.5 h-24 bg-popover-border mx-8" />

      {/* 3. 취향 정보 스켈레톤 */}
      <div className="grid grid-cols-[5.5rem_1fr] gap-y-2 flex-1 items-center">
        <span className="font-medium">여행 스타일</span>
        <Skeleton className="h-5 w-32" />

        <span className="font-medium">숙소 취향</span>
        <Skeleton className="h-5 w-28" />

        <span className="font-medium">한줄소개</span>
        <Skeleton className="h-5 w-full" />
      </div>
    </>
  )
}
