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

interface Props extends React.ComponentProps<'input'> {
  rightElement: React.ReactNode
}
const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ className, type, disabled, rightElement, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    if (rightElement) {
      return (
        <InputGroup className={className} disabled={disabled}>
          <InputGroupInput
            ref={ref}
            type={type}
            disabled={disabled}
            {...props}
          />
          <InputGroupAddon align={'inline-end'}>{rightElement}</InputGroupAddon>
        </InputGroup>
      )
    }

    if (type === 'password') {
      return (
        <InputGroup className={className} disabled={disabled}>
          <InputGroupInput
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            disabled={disabled}
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

    return (
      <Input
        ref={ref}
        type={type}
        className={className}
        disabled={disabled}
        {...props}
      />
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
