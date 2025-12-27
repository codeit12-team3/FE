'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { IconArrowDown, IconSearch } from '@/assets/svgr'
import {
  Button,
  InputGroup,
  InputGroupInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui'
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_ENUM_OPTIONS,
} from '@/constants/posts'
import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

const getSelectLabel = (
  value: string | undefined,
  options: readonly { readonly value: string; readonly label: string }[],
  defaultLabel: string,
) => {
  return value
    ? options.find((opt) => opt.value === value)?.label
    : defaultLabel
}

const FilterSelect = ({
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
}) => (
  <Select value={value || 'ALL'} onValueChange={onChange}>
    <SelectTrigger className={className} size="sm">
      <span>{getSelectLabel(value, options, placeholder)}</span>
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

const FilterDatePicker = ({
  date,
  onApply,
  triggerClassName,
}: {
  date: string | undefined
  onApply: (date: string) => void
  triggerClassName?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined)

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          setTempDate(date ? new Date(date) : undefined)
        }
      }}
    >
      <PopoverTrigger className={triggerClassName}>
        <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-3 font-medium rounded-xl h-10 text-sm text-gray-800">
          <span className="text-gray-800">
            {date ? `${dayjs(date).format('YYYY년 MM월 DD일')}` : '날짜'}
          </span>
          <IconArrowDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <DatePicker
            selected={tempDate}
            onChange={(date: Date | null) => {
              setTempDate(date || undefined)
            }}
            inline
            locale="ko"
          />
          <div className="flex gap-2">
            <Button
              variant="tertiary"
              onClick={() => {
                onApply('')
                setTempDate(undefined)
                setIsOpen(false)
              }}
              className="flex-1 h-10"
            >
              초기화
            </Button>
            <Button
              onClick={() => {
                if (tempDate) {
                  onApply(dayjs(tempDate).format('YYYY-MM-DD'))
                }
                setIsOpen(false)
              }}
              className="flex-1 h-10"
            >
              확인
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function FilterBar({
  onApply,
}: {
  onApply: (filters: PostFilterParams) => void
}) {
  const router = useRouter()

  const [filters, setFilters] = useState<Omit<PostFilterParams, 'keyword'>>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
  })

  const [keyword, setKeyword] = useState('')

  const applyImmediately = (
    next: Partial<Omit<PostFilterParams, 'keyword'>>,
  ) => {
    const updated = { ...filters, ...next }
    setFilters(updated)
    onApply({ ...updated, keyword })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onApply({ ...filters, keyword })
    }, 500)
    return () => clearTimeout(timer)
  }, [keyword, filters, onApply])

  const TRIGGER = 'w-22 text-sm text-gray-800 font-medium'

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-2 justify-between">
      <div className="flex gap-2 ">
        {/* 국가 */}
        <FilterSelect
          value={filters.nation}
          options={NATION_ENUM_OPTIONS}
          placeholder="국가"
          onChange={(value) =>
            applyImmediately({
              nation: value === 'ALL' ? '' : value,
            })
          }
          className={TRIGGER}
        />

        {/* 나이 */}
        <FilterSelect
          value={filters.ageType}
          options={AGE_OPTIONS}
          placeholder="나이"
          onChange={(value) =>
            applyImmediately({
              ageType: value === 'ALL' ? undefined : (value as AgeType),
            })
          }
          className={TRIGGER}
        />

        {/* 성별 */}
        <FilterSelect
          value={filters.gender}
          options={GENDER_OPTIONS}
          placeholder="성별"
          onChange={(value) =>
            applyImmediately({
              gender: value === 'ALL' ? undefined : (value as GenderType),
            })
          }
          className={TRIGGER}
          includeAllOption={false}
        />
        {/* 날짜 */}
        <FilterDatePicker
          date={filters.date}
          onApply={(date) => applyImmediately({ date })}
          triggerClassName="w-auto min-w-22 text-sm text-gray-800 font-medium"
        />
      </div>

      {/* 검색 */}
      <div className="flex-1 relative max-w-[456px]">
        <InputGroup className="h-10">
          <InputGroupInput
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </InputGroup>
      </div>

      <Button
        size="md"
        className="gap-2 w-36"
        onClick={() => router.push('/posts/add')}
      >
        동행 구하기
      </Button>
    </div>
  )
}
