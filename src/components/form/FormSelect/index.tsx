'use client'

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

    return (
      <Select value={field.value || ''} onValueChange={field.onChange}>
        <SelectTrigger ref={ref} className={className} aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          <SelectGroup>
            {normalizedOptions.map(({ label, value }) => (
              <SelectItem key={`${name}-${value}`} value={value}>
                {label}
                {suffix}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
)
FormSelect.displayName = 'FormSelect'

export default FormSelect
