'use client'

import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui'

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  if (type === 'password') {
    return (
      <InputGroup className={className}>
        <InputGroupInput
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
        <InputGroupAddon align={'inline-end'}>
          <InputGroupButton
            type="button"
            size={'xs'}
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            tabIndex={-1}
          >
            {isVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    )
  }

  return <Input ref={ref} type={type} className={className} {...props} />
})
PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
