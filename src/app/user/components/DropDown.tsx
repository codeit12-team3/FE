'use client'

import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/common'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-main text-white hover:bg-main',
        secondary: 'bg-bg-disabled text-text-input hover:bg-bg-disabled',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
)

type Option = {
  label: string
  value: string
}

type DropdownProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((o) => o.value === value) || {
    label: placeholder,
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          buttonVariants({
            variant: value !== 'all' && value !== '' ? 'primary' : 'secondary',
          }),
        )}
      >
        <span>{selected.label}</span>
        <ChevronDown
          className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full mt-2 w-full z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full px-4 py-3 text-left transition-colors hover:bg-blue-50',
                  value === option.value && 'bg-white text-main font-medium',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
