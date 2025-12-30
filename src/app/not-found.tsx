'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex h-[calc(100vh-52px)] flex-col items-center justify-center md:h-[calc(100vh-68px)]">
      <Image
        src="/images/not-found.png"
        alt="not-found"
        width={404}
        height={300}
      />

      <span className="font-bold text-xl pb-3">페이지를 찾을 수 없습니다.</span>
      <span className="text-sm text-gray-500 font-medium">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </span>
      <span className="text-sm text-gray-500 font-medium">
        아래 페이지로 다시 시도해주세요.
      </span>
      <div className="flex gap-3 pt-12">
        <Button variant="secondary" onClick={() => router.back()}>
          이전 페이지
        </Button>
        <Button>
          <Link href="/">메인 페이지</Link>
        </Button>
      </div>
    </div>
  )
}
