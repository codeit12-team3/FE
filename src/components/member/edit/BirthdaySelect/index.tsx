'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

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
      return { year: 0, month: 0, day: 0 }
    }
    const [y, m, d] = birth.split('-').map(Number)
    return { year: y || 0, month: m || 0, day: d || 0 }
  }

  const initial = parseBirthDate(birthValue)
  const [selected, setSelected] = useState({
    year: initial.year,
    month: initial.month,
    day: initial.day,
  })

  useEffect(() => {
    const SetData = () => {
      const current = parseBirthDate(birthValue)
      setSelected({
        year: current.year,
        month: current.month,
        day: current.day,
      })
    }
    SetData()
  }, [birthValue])

  const getDaysInMonth = (y: number, m: number) => {
    if (!y || !m) return []
    return Array.from({ length: new Date(y, m, 0).getDate() }, (_, i) => i + 1)
  }

  const days = getDaysInMonth(selected.year, selected.month)

  const handleYearChange = (year: number) => {
    setSelected({ year, month: 0, day: 0 })
    setValue('birth', '', { shouldDirty: true })
  }

  const handleMonthChange = (month: number) => {
    setSelected((prev) => ({ ...prev, month, day: 0 }))
    setValue('birth', '', { shouldDirty: true })
  }

  const handleDayChange = (day: number) => {
    setSelected((prev) => ({ ...prev, day }))
    if (selected.year && selected.month && day) {
      const dateStr = `${selected.year}-${String(selected.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      setValue('birth', dateStr, { shouldDirty: true })
    }
  }

  return (
    <div className="flex gap-3 mt-3">
      <div className="relative">
        <select
          value={selected.year}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="rounded-xl px-3 py-2 min-w-[135px] h-12 bg-[#EDF4FB] appearance-none pr-10"
        >
          <option value={0}>년</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>
      <div className="relative">
        <select
          value={selected.month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className="rounded-xl px-3 py-2 min-w-25 h-12 bg-[#EDF4FB] appearance-none pr-10"
        >
          <option value={0}>월</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>
      <div className="relative">
        <select
          value={selected.day}
          onChange={(e) => handleDayChange(Number(e.target.value))}
          disabled={!selected.year || !selected.month}
          className="rounded-xl px-3 py-2 min-w-25 h-12 bg-[#EDF4FB] appearance-none pr-10 disabled:opacity-50"
        >
          <option value={0}>일</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
      </div>
    </div>
  )
}
