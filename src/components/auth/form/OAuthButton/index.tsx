import { ButtonHTMLAttributes, forwardRef } from 'react'

import { IconGoogle, IconKakao, IconNaver } from '@/assets/svgr'
import { cn } from '@/lib/common'
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

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'rounded-full flex items-center justify-center cursor-pointer',
          className,
        )}
        {...props}
      >
        <Icon className="size-8" />
      </button>
    )
  },
)
OAuthButton.displayName = 'OAuthButton'

export default OAuthButton
