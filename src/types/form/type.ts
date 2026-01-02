// 폼데이뚜피커
import { Dayjs } from 'dayjs'
import { FieldValues, Path } from 'react-hook-form'

export interface CalendarPopupProps {
  currentMonth: Dayjs
  setCurrentMonth: (month: Dayjs) => void
  tempSelected: Dayjs | null
  setTempSelected: (date: Dayjs | null) => void
  onConfirm: () => void
  onCancel: () => void
  eventsOnDates: Date[]
  minDate?: Date
  maxDate?: Date
  showAbove?: boolean
}

export interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  placeholder?: string
  maxDate?: Date
  minDate?: Date
  openToDate?: Date
  dateFormat?: string
  required?: boolean
  className?: string
  inputClassName?: string
  iconClassName?: string
  eventsOnDates?: Date[]
}
