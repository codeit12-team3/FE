import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/select.components'

interface FilterOption {
  readonly value: string
  readonly label: string
}

interface ChatRoomSelectProps {
  label: string
  value: string | undefined
  options: readonly FilterOption[]
  onValueChange: (value: string) => void
}

export function ChatRoomSelect({
  label,
  value,
  options,
  onValueChange,
}: ChatRoomSelectProps) {
  const currentLabel = options.find((opt) => opt.value === value)?.label

  return (
    <SelectRoot value={value} onValueChange={onValueChange} className="w-fit">
      <SelectTrigger className="w-22 h-10 bg-white text-xs pl-3 py-2.5 pr-2.5">
        <SelectValue
          placeholder={label}
          suffix={currentLabel ? ` ${currentLabel}` : ''}
        />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="text-xs rounded-lg h-9 hover:bg-gray-100 hover:text-gray-900 active:bg-blue-50 active:text-blue-600 px-2.5"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
