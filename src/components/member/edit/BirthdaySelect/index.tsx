'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProfileEditFormData } from '@/types/member/schema'

const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i,
)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

export default function BirthdaySelect() {
  const { setValue, watch } = useFormContext<ProfileEditFormData>()
  const birthValue = watch('birth')

  const parseBirthDate = (birth: string) => {
    if (!birth || birth === '') {
      return { year: '', month: '', day: '' }
    }
    const [y, m, d] = birth.split('-')
    const monthNum = parseInt(m)
    const dayNum = parseInt(d)

    return {
      year: y || '',
      month: !isNaN(monthNum) ? String(monthNum) : '',
      day: !isNaN(dayNum) ? String(dayNum) : '',
    }
  }

  const [selected, setSelected] = useState({ year: '', month: '', day: '' })

  useEffect(() => {
    const syncBirthValue = () => {
      const current = parseBirthDate(birthValue)
      setSelected(current)
    }
    syncBirthValue()
  }, [birthValue])

  const getDaysInMonth = (y: string, m: string) => {
    const year = parseInt(y)
    const month = parseInt(m)
    if (!year || !month || isNaN(year) || isNaN(month)) return []
    return Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1,
    )
  }

  const days = getDaysInMonth(selected.year, selected.month)

  const handleYearChange = (year: string) => {
    if (year === 'none') {
      setSelected({ year: '', month: '', day: '' })
      setValue('birth', '', { shouldDirty: true })
    } else {
      setSelected({ year, month: '', day: '' })
    }
  }

  const handleMonthChange = (month: string) => {
    if (month === 'none') {
      setSelected((prev) => ({ ...prev, month: '', day: '' }))
      setValue('birth', '', { shouldDirty: true })
    } else {
      setSelected((prev) => ({ ...prev, month, day: '' }))
    }
  }

  const handleDayChange = (day: string) => {
    if (day === 'none') {
      setSelected((prev) => ({ ...prev, day: '' }))
      setValue('birth', '', { shouldDirty: true })
    } else {
      const year = parseInt(selected.year)
      const month = parseInt(selected.month)
      const dayNum = parseInt(day)

      if (!isNaN(year) && !isNaN(month) && !isNaN(dayNum)) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
        setSelected((prev) => ({ ...prev, day }))
        setValue('birth', dateStr, { shouldDirty: true })
      }
    }
  }

  return (
    <div className="flex gap-3">
      <Select
        key={`year-${selected.year}`}
        value={selected.year || 'none'}
        onValueChange={handleYearChange}
      >
        <SelectTrigger className="min-w-[135px]">
          <SelectValue placeholder="년" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">년</SelectItem>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        key={`month-${selected.month}`}
        value={selected.month || 'none'}
        onValueChange={handleMonthChange}
        disabled={!selected.year}
      >
        <SelectTrigger className="min-w-25">
          <SelectValue placeholder="월" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">월</SelectItem>
          {months.map((m) => (
            <SelectItem key={m} value={String(m)}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        key={`day-${selected.day}`}
        value={selected.day || 'none'}
        onValueChange={handleDayChange}
        disabled={!selected.year || !selected.month}
      >
        <SelectTrigger className="min-w-25">
          <SelectValue placeholder="일" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">일</SelectItem>
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
