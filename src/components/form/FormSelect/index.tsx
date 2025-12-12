'use client'

import { CircleAlert } from 'lucide-react'
import { memo, useMemo } from 'react'
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { cn } from '@/lib/common'

type Option = string | { label: string; value: string }

interface Props<T extends FieldValues> {
  name: Path<T>
  options: readonly Option[]
  placeholder?: string
  className?: string
  suffix?: string
}

const FormSelect = memo(
  <T extends FieldValues>({
    name,
    options,
    placeholder,
    className,
    suffix,
  }: Props<T>) => {
    const { control } = useFormContext<T>()

    const {
      field: { ref, ...field },
      fieldState: { error },
    } = useController({ name, control })

    const normalizedOptions = useMemo(
      () =>
        options.map((option) =>
          typeof option === 'string'
            ? { label: option, value: option }
            : option,
        ),
      [options],
    )

    const isError = !!error

    return (
      <div className={cn('space-y-2 w-full', className)}>
        <div className="space-y-1 w-full">
          <Select value={field.value || ''} onValueChange={field.onChange}>
            <SelectTrigger
              ref={ref}
              id={name}
              aria-invalid={isError ? 'true' : 'false'}
              className={cn(isError && 'border-destructive')}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="max-h-60">
              <SelectGroup>
                {normalizedOptions.map(({ label: optLabel, value }) => (
                  <SelectItem key={`${name}-${value}`} value={value}>
                    {optLabel}
                    {suffix}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
            {isError && <CircleAlert className="size-4" />}
            {error?.message}
          </p>
        </div>
      </div>
    )
  },
)

FormSelect.displayName = 'FormSelect'
export default FormSelect
