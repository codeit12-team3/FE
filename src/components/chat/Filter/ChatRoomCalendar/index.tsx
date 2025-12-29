'use client'

import { format } from 'date-fns' // 표시를 위해 필요
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { IconArrowDown } from '@/assets/svgr'
import { Button } from '@/components/common'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { Calendar } from '@/components/ui/calendar'

export default function ChatRoomCalendar() {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // 데이터가 찍히는지 확인용
  const handleSelect = (range: DateRange | undefined) => {
    console.log('선택된 범위:', range)
    setDateRange(range)
    // 기간 선택이 완료(시작+끝)되면 닫고 싶다면 아래 주석 해제
    // if (range?.from && range?.to) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-64 justify-between font-normal">
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'yyyy-MM-dd')} -{' '}
                {format(dateRange.to, 'yyyy-MM-dd')}
              </>
            ) : (
              format(dateRange.from, 'yyyy-MM-dd')
            )
          ) : (
            <span>날짜를 선택하세요</span>
          )}
          <IconArrowDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          min={1}
          captionLayout="label"
          defaultMonth={dateRange?.from || new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
