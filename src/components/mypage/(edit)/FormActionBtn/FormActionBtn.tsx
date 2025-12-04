'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/common/Button'

export default function FormActionBtn() {
  const router = useRouter()
  return (
    <div className="flex justify-center gap-7 my-20">
      <Button
        variant="secondary"
        size="md"
        className="w-[185px] text-lg font-extrabold cursor-pointer"
        onClick={() => router.back()}
      >
        나가기
      </Button>
      <Button
        size="md"
        className="w-[185px] text-lg font-extrabold cursor-pointer"
      >
        프로필 수정하기
      </Button>
    </div>
  )
}
