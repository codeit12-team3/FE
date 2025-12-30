import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui'

const getSelectLabel = (
  value: string | undefined,
  options: readonly { readonly value: string; readonly label: string }[],
  defaultLabel: string,
) => {
  return value
    ? options.find((opt) => opt.value === value)?.label
    : defaultLabel
}

export default function FilterSelect({
  value,
  options,
  placeholder,
  onChange,
  className,
  includeAllOption = true,
}: {
  value: string | undefined
  options: readonly { readonly value: string; readonly label: string }[]
  placeholder: string
  onChange: (value: string) => void
  className?: string
  includeAllOption?: boolean
}) {
  return (
    <Select value={value || 'ALL'} onValueChange={onChange}>
      <SelectTrigger className={className} size="sm">
        <span className="text-xs sm:text-sm">
          {getSelectLabel(value, options, placeholder)}
        </span>
      </SelectTrigger>
      <SelectContent className="w-auto min-w-(--radix-select-trigger-width)">
        {includeAllOption && <SelectItem value="ALL">전체</SelectItem>}
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
