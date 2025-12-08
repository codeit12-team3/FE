'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import { IconArrowDown } from '@/assets/svgr'
import { cn } from '@/lib/common'

import { SelectProvider, useSelect } from './select.context'

const HiddenSelect = forwardRef<
  HTMLSelectElement,
  React.InputHTMLAttributes<HTMLSelectElement>
>((props, ref) => {
  const { value } = useSelect()
  const internalRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle(ref, () => internalRef.current as HTMLSelectElement)

  useEffect(() => {
    const el = internalRef.current
    if (el && el.value !== value) {
      el.value = value
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, [value])

  return (
    <select
      ref={internalRef}
      className="sr-only"
      value={value}
      onChange={() => {}}
      tabIndex={-1}
      {...props}
    >
      <option value={value}>{value}</option>
    </select>
  )
})
HiddenSelect.displayName = 'HiddenSelect'

interface SelectRootProps extends React.ComponentProps<typeof SelectProvider> {
  className?: string
  selectProps?: React.InputHTMLAttributes<HTMLSelectElement>
}
const SelectRoot = forwardRef<HTMLSelectElement, SelectRootProps>(
  (
    { children, className, selectProps, value, onChange, ...providerProps },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
      <SelectProvider value={value} onChange={onChange} {...providerProps}>
        <SelectContainer ref={containerRef} className={className}>
          <HiddenSelect ref={ref} {...selectProps} />
          {children}
        </SelectContainer>
      </SelectProvider>
    )
  },
)
SelectRoot.displayName = 'SelectRoot'

const SelectContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { setOpen } = useSelect()
  const internalRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => internalRef.current as HTMLDivElement)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        internalRef.current &&
        !internalRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setOpen])

  return (
    <div
      ref={internalRef}
      className={cn('relative w-full font-medium', className)}
      {...props}
    >
      {children}
    </div>
  )
})
SelectContainer.displayName = 'SelectContainer'

const SelectTrigger = ({
  className,
  children,
  'aria-invalid': invalid,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, setOpen, value } = useSelect()
  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn(
        'flex h-12 w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3',
        open ? 'border-main border shadow-sm' : '',
        String(invalid) === 'true' && 'border-danger',
        value ? 'bg-main text-white' : 'bg-bg-input text-text-base',
        className,
      )}
      {...props}
    >
      {children}
      <IconArrowDown
        className={cn('size-6 transition-transform', open && 'rotate-180')}
      />
    </div>
  )
}

const SelectValue = ({
  placeholder = '선택해주세요',
  suffix,
}: {
  placeholder?: string
  suffix?: string
}) => {
  const { value } = useSelect()
  return (
    <span className={cn('block truncate', !value && 'text-text-input')}>
      {value ? `${value}${suffix || ''}` : placeholder}
    </span>
  )
}

const SelectContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open } = useSelect()
  if (!open) return null

  return (
    <div
      className={cn(
        ' absolute shadow-xl top-full z-50 mt-1 bg-white max-h-60 w-full overflow-auto rounded-xl animate-in fade-in-80 zoom-in-95 no-scrollbar',
        className,
      )}
      {...props}
    >
      <div className="p-1 divide-y-2 divide-bg-input">{children}</div>
    </div>
  )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}
const SelectItem = ({
  className,
  children,
  value,
  ...props
}: SelectItemProps) => {
  const { onChange, value: selectedValue } = useSelect()
  const isSelected = selectedValue === value

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onChange(value)
      }}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center px-4 py-3 outline-none',
        isSelected && 'bg-bg-input',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValue }
