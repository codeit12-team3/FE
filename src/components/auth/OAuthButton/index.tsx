import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

import { IconGoogle, IconKakao, IconNaver } from '@/assets/svgr'
import { cn } from '@/lib/common'
import { OAuth } from '@/types/auth'

const variants = cva('rounded-full flex items-center justify-center', {
  variants: {
    provider: {
      google: 'bg-white border border-[#EDF4FB]',
      kakao: 'bg-[#fee800]',
      naver: 'bg-[#03C75A]',
    },
    size: {
      sm: 'size-8 p-1',
      md: 'size-12 p-2',
      lg: 'size-16 p-4',
    },
  },
  defaultVariants: {
    provider: 'google',
    size: 'md',
  },
})

type SVGIconType = React.FC<React.SVGProps<SVGSVGElement>>

const PROVIDER_ICON: Record<OAuth, SVGIconType> = {
  google: IconGoogle,
  kakao: IconKakao,
  naver: IconNaver,
}

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  provider: OAuth
  size?: 'sm' | 'md' | 'lg'
}

export const OAuthButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, provider, size = 'md', children, ...props }, ref) => {
    const Icon = PROVIDER_ICON[provider]

    return (
      <button
        ref={ref}
        type="button"
        className={cn(variants({ provider, size }), className)}
        {...props}
      >
        <Icon />
        {children}
      </button>
    )
  },
)
OAuthButton.displayName = 'OAuthButton'
