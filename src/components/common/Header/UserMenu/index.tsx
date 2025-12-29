'use client'

import { PopoverClose } from '@radix-ui/react-popover'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { IconArrowFromShapeRightLight, IconUser } from '@/assets/svgr'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { getImageUrl } from '@/lib/common'

export default function UserMenu() {
  const { data: session } = useSession()
  const router = useRouter()

  return session ? (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex size-8 md:size-10 shrink-0 border border-gray-300 rounded-full items-center justify-center cursor-pointer">
          <Image
            src={getImageUrl(session?.user.image, true)}
            alt="프로필 이미지"
            width={50}
            height={50}
            className="size-full object-cover rounded-full"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-[120px]">
        <div className="flex flex-col">
          <PopoverClose asChild>
            <Button
              variant={'ghost'}
              size={'md'}
              className="flex items-center w-full text-xs font-medium justify-between"
              onClick={() => router.push('/member')}
            >
              내 프로필 <IconUser className="size-4" />
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button
              variant={'ghost'}
              size={'md'}
              className="flex items-center w-full text-xs font-medium justify-between"
              onClick={() =>
                signOut({
                  callbackUrl: '/signin',
                  redirect: true,
                })
              }
            >
              로그아웃 <IconArrowFromShapeRightLight className="size-4" />
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <Link
      href={'/signin'}
      className="text-xs md:text-sm font-semibold text-gray-500 hover:text-gray-700 active:text-gray-700"
    >
      로그인
    </Link>
  )
}
