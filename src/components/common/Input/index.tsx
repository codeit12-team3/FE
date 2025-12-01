'use client'

import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState, type ComponentProps } from 'react'

import { cn } from '@/lib/common'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  (
    {
      className,
      type = 'text',
      'aria-invalid': invalid,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword ? (show ? 'text' : 'password') : type

    return (
      <div
        className={cn(
          'flex items-center gap-2.5 w-full h-12 px-4 rounded-xl bg-gray-50 transition-all text-slate-700',
          'border border-transparent',
          'focus-within:border-main focus-within:shadow-sm',
          String(invalid) === 'true' && 'border-danger',
          disabled && 'cursor-not-allowed pointer-events-none',
          className,
        )}
      >
        <input
          ref={ref}
          type={inputType}
          aria-invalid={invalid}
          disabled={disabled}
          className={cn(
            'flex-1 font-medium text-base placeholder:text-slate-500 placeholder:font-medium',
            'bg-transparent border-none outline-none',
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => !disabled && setShow((prev) => !prev)}
            aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {show ? <EyeOff className="size-6" /> : <Eye className="size-6" />}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
