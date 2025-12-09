'use client'

import { createContext, useCallback, useContext, useState } from 'react'

interface SelectContextValue {
  value: string
  onChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}
const SelectContext = createContext<SelectContextValue | undefined>(undefined)

export const useSelect = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('useSlect는 SelectProvider 하위에서 사용되어야 합니다')
  }

  return context
}

interface SelectProviderProps {
  children: React.ReactNode
  defaultValue?: string | number
  value?: string | number
  onValueChange?: (value: string) => void
}
export function SelectProvider({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: SelectProviderProps) {
  // 상태 관리 (제어/비제어 모드 지원)
  const [internalValue, setInternalValue] = useState(
    defaultValue?.toString() || '',
  )
  const [open, setOpen] = useState(false)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue!.toString() : internalValue

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
    },
    [isControlled, onValueChange],
  )

  return (
    <SelectContext.Provider
      value={{
        value,
        onChange: handleChange,
        open,
        setOpen,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}
