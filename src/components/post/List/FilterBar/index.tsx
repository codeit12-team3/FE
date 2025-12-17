'use client'

import dayjs from 'dayjs'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { IconArrowDown } from '@/assets/svgr'
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

export default function FilterBar({
  onApply,
}: {
  onApply: (filters: PostFilterParams) => void
}) {
  const router = useRouter()

  const [filters, setFilters] = useState<Omit<PostFilterParams, 'keyword'>>({
    nation: '',
    startDate: '',
    ageType: undefined,
    gender: undefined,
  })

  const [keyword, setKeyword] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined)

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      <div className="flex gap-4">
        {/* 국가 */}
        <Select
          value={filters.nation || 'ALL'}
          onValueChange={(value) =>
            applyImmediately({
              nation: value === 'ALL' ? '' : value,
            })
          }
        >
          <SelectTrigger>
            <span
              className={`block truncate ${!filters.nation && 'text-text-input'}`}
            >
              {filters.nation
                ? NATION_ENUM_OPTIONS.find((v) => v.value === filters.nation)
                    ?.label
                : '국가'}
            </span>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            {NATION_ENUM_OPTIONS.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 나이 */}
        <Select
          value={filters.ageType || 'ALL'}
          onValueChange={(value) =>
            applyImmediately({
              ageType: value === 'ALL' ? undefined : (value as AgeType),
            })
          }
        >
          <SelectTrigger>
            <span
              className={`block truncate ${!filters.ageType && 'text-text-input'}`}
            >
              {filters.ageType
                ? AGE_OPTIONS.find((age) => age.value === filters.ageType)
                    ?.label
                : '나이'}
            </span>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            {AGE_OPTIONS.map((age) => (
              <SelectItem key={age.value} value={age.value}>
                {age.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 성별 */}
        <Select
          value={filters.gender || 'ALL'}
          onValueChange={(value) =>
            applyImmediately({
              gender: value === 'ALL' ? undefined : (value as GenderType),
            })
          }
        >
          <SelectTrigger>
            <span
              className={`block truncate ${!filters.gender && 'text-text-input'}`}
            >
              {filters.gender
                ? GENDER_OPTIONS.find((v) => v.value === filters.gender)?.label
                : '성별'}
            </span>
          </SelectTrigger>
          <SelectContent>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* 날짜 */}
        <Popover
          open={isDatePickerOpen}
          onOpenChange={(open) => {
            setIsDatePickerOpen(open)
            if (open) {
              // Popover가 열릴 때 현재 선택된 날짜를 tempDate에 설정
              setTempDate(
                filters.startDate ? new Date(filters.startDate) : undefined,
              )
            }
          }}
        >
          <PopoverTrigger asChild>
            <button
              className="flex w-fit items-center justify-between gap-2 rounded-xl bg-input px-4 py-3 text-base font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring h-12"
              type="button"
            >
              <span className={!filters.startDate ? 'text-text-input' : ''}>
                {filters.startDate
                  ? dayjs(filters.startDate).format('YYYY년 MM월 DD일')
                  : '날짜'}
              </span>
              <IconArrowDown className="size-6 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3">
              <DatePicker
                selected={tempDate}
                onChange={(date) => {
                  setTempDate(date || undefined)
                }}
                inline
                locale="ko"
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    applyImmediately({ startDate: '' })
                    setTempDate(undefined)
                    setIsDatePickerOpen(false)
                  }}
                  className="flex-1 h-10"
                >
                  초기화
                </Button>
                <Button
                  onClick={() => {
                    if (tempDate) {
                      applyImmediately({
                        startDate: dayjs(tempDate).format('YYYY-MM-DD'),
                      })
                    }
                    setIsDatePickerOpen(false)
                  }}
                  className="flex-1 h-10"
                >
                  확인
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* 검색 */}
      <div className="flex-1 relative max-w-[456px]">
        <InputGroup>
          <InputGroupInput
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
        </InputGroup>
      </div>

      <Button
        size="sm"
        className="gap-2 w-36"
        onClick={() => router.push('/posts/add')}
      >
        <Plus className="w-5 h-5" />
        동행 구하기
      </Button>
    </div>
  )
}
