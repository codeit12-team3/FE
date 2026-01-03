'use client'

import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import { IconArrowDown, IconArrowLeft, IconArrowRight } from '@/assets/svgr'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { cn } from '@/lib/common/cn'

dayjs.locale('ko')

export default function FilterDate({
  date,
  onApply,
  triggerClassName,
}: {
  date: string | undefined
  onApply: (date: string) => void
  triggerClassName?: string
}) {
  {
    const [isOpen, setIsOpen] = useState(false)
    const [tempSelected, setTempSelected] = useState<Dayjs | null>(null)
    const [currentMonth, setCurrentMonth] = useState(dayjs())
    const [, setViewMode] = useState<'date' | 'year'>('date')

    const startOfMonth = currentMonth.startOf('month')
    const endOfMonth = currentMonth.endOf('month')
    const startDate = startOfMonth.startOf('week')
    const endDate = endOfMonth.endOf('week')

    const days: Dayjs[] = []
    let day = startDate
    while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
      days.push(day)
      day = day.add(1, 'day')
    }

    return (
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (open) {
            setTempSelected(date ? dayjs(date) : null)
            if (date) {
              setCurrentMonth(dayjs(date))
            }
          }
        }}
      >
        <PopoverTrigger className={triggerClassName}>
          <div className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-3 font-medium rounded-xl h-10 text-sm text-gray-800">
            <span className="text-gray-800 text-xs md:text-sm">
              {date ? `${dayjs(date).format('YYYY.MM.DD')}` : '날짜'}
            </span>
            <IconArrowDown
              className={cn(
                'size-5 transition-transform duration-200',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div>
            <div className="py-5 px-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(currentMonth.subtract(1, 'month'))
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="이전 달"
                >
                  <IconArrowLeft width={20} height={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('year')}
                  className="text-lg font-semibold text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition-colors cursor-pointer"
                >
                  {currentMonth.format('YYYY년 M월')}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="다음 달"
                >
                  <IconArrowRight width={20} height={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {['일', '월', '화', '수', '목', '금', '토'].map(
                  (day, index) => (
                    <div
                      key={day}
                      className={cn(
                        'text-center text-sm font-medium py-2.5 px-2',
                        {
                          'text-red-500': index === 0,
                          'text-blue-500': index === 6,
                          'text-gray-800': index !== 0 && index !== 6,
                        },
                      )}
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 mb-1">
                {days.map((day) => {
                  const isCurrentMonth = day.month() === currentMonth.month()
                  const isSelected =
                    tempSelected && day.isSame(tempSelected, 'day')
                  const isSunday = day.day() === 0
                  const isSaturday = day.day() === 6
                  const disabled = !isCurrentMonth

                  return (
                    <button
                      key={day.format()}
                      type="button"
                      onClick={() => !disabled && setTempSelected(day)}
                      disabled={disabled}
                      className={cn(
                        'relative w-10 h-10 rounded-full flex flex-col items-center justify-center transition-colors',
                        {
                          'text-gray-500 cursor-not-allowed': disabled,
                          'hover:bg-gray-100': !disabled && !isSelected,
                          'bg-blue-500 text-white': isSelected,
                          'text-red-500':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            isSunday,
                          'text-blue-500':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            isSaturday,
                          'text-gray-800':
                            !isSelected &&
                            isCurrentMonth &&
                            !disabled &&
                            !isSunday &&
                            !isSaturday,
                        },
                      )}
                    >
                      <span className="text-sm">{day.date()}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            {/* 버튼 */}
            <div className="flex gap-3 p-4 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  onApply('')
                  setTempSelected(null)
                  setIsOpen(false)
                }}
                className="flex-1"
              >
                초기화
              </Button>
              <Button
                type="button"
                variant="default"
                size="md"
                onClick={() => {
                  if (tempSelected) {
                    onApply(tempSelected.format('YYYY-MM-DD'))
                  }
                  setIsOpen(false)
                }}
                className="flex-1"
              >
                확인
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
}
