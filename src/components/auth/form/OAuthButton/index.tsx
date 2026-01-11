'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { ButtonHTMLAttributes, forwardRef } from 'react'

import { IconGoogle, IconKakao, IconNaver } from '@/assets/svgr'
import { cn } from '@/lib/common'
import { useModalActions } from '@/stores'
import { OAuth } from '@/types/auth'

type SVGIconType = React.FC<React.SVGProps<SVGSVGElement>>

const PROVIDER_ICON: Record<OAuth, SVGIconType> = {
  google: IconGoogle,
  kakao: IconKakao,
  naver: IconNaver,
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: OAuth
}

const OAuthButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, provider, ...props }, ref) => {
    const Icon = PROVIDER_ICON[provider]

    const { openModal } = useModalActions()

    const handleOAuthSignin = async () => {
      if (provider === 'google') {
        await signIn(provider, {
          redirect: true,
          callbackUrl: '/',
        })
      } else {
        openModal(<UnimplementedModal />)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'rounded-full flex items-center justify-center cursor-pointer',
          className,
        )}
        {...props}
        onClick={handleOAuthSignin}
      >
        <Icon className="size-8" />
      </button>
    )
  },
)
OAuthButton.displayName = 'OAuthButton'

export default OAuthButton

const UnimplementedModal = () => {
  const handleOAuthSignin = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <div className="space-y-[38px]">
      <div className="relative">
        <Image
          src={'/images/unimplemented-feature.png'}
          width={434}
          height={178}
          alt="미구현 기능 이미지"
          className="w-full h-auto object-contain"
        />
        <p className="absolute text-gray-300 font-bold text-4xl top-1/2 left-1/2 -translate-x-1/2">
          Oops!
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-gray-700 font-bold text-xl text-center">
          준비중인 기능입니다.
        </p>
        <p className="text-gray-500 text-sm font-medium text-center">
          <button
            onClick={handleOAuthSignin}
            className="text-blue-500 font-semibold cursor-pointer hover:underline active:underline"
          >
            Google OAuth
          </button>
          를 이용해주세요
        </p>
      </div>
    </div>
  )
}
