'use client'

import { PopoverClose } from '@radix-ui/react-popover'
import { LogIn, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="flex size-[54px] border-2 border-popover-border rounded-full items-center justify-center"
        >
          <Image
            src={getImageUrl(session?.user.image, true)}
            alt="프로필 이미지"
            width={50}
            height={50}
            className="size-full object-cover rounded-full"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-[120px]">
        {session ? (
          <div className="flex flex-col">
            <PopoverClose asChild>
              <Link className="w-full" href={'/member'}>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="flex items-center w-full text-xs font-medium justify-between"
                >
                  내 프로필 <User className="size-4" />
                </Button>
              </Link>
            </PopoverClose>

            <PopoverClose asChild>
              <Button
                variant={'ghost'}
                size={'sm'}
                className="flex items-center w-full text-xs font-medium justify-between"
                onClick={() => signOut()}
              >
                로그아웃 <LogOut className="size-4" />
              </Button>
            </PopoverClose>
          </div>
        ) : (
          <div className="flex flex-col">
            <PopoverClose asChild>
              <Button
                variant={'ghost'}
                size={'sm'}
                className="flex items-center w-full text-xs font-medium justify-between"
                onClick={() => router.push('/signin')}
              >
                로그인 <LogIn className="size-4" />
              </Button>
            </PopoverClose>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
