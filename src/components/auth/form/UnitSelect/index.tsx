'use client'

import { memo } from 'react'
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

interface Props<T extends FieldValues> {
  name: Path<T>
  options: readonly string[]
  placeholder?: string
  className?: string
  suffix?: string
}

const UnitSelect = memo(
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

    return (
      <Select value={field.value || ''} onValueChange={field.onChange}>
        <SelectTrigger ref={ref} className={className} aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={`${name}-${option}`} value={option}>
                {option}
                {suffix}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
)
UnitSelect.displayName = 'UnitSelect'

export default UnitSelect
