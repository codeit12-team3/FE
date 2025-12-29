'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useMemo } from 'react'

export interface TabOption<T extends string> {
  value: T
  label: string
}
interface TabsContextProps<T extends string> {
  activeTab: T
  setTab: (tab: T) => void
  options: TabOption<T>[]
}
const TabsContext = createContext<TabsContextProps<string> | undefined>(
  undefined,
)

interface TabsProviderProps<T extends string> {
  children: React.ReactNode
  options: TabOption<T>[]
  defaultValue: T
  paramName: string
}
export function TabsProvider<T extends string>({
  children,
  options,
  defaultValue,
  paramName,
}: TabsProviderProps<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeTab = (searchParams.get(paramName) as T) || defaultValue

  const setTab = useCallback(
    (value: T) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(paramName, value)
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, searchParams, paramName, router],
  )

  const value = useMemo(
    () => ({ activeTab, setTab, options }),
    [activeTab, setTab, options],
  )

  return (
    <TabsContext.Provider value={value as unknown as TabsContextProps<string>}>
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs<T extends string>() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs은 TabsProvider 하위에서 동작해야 합니다')
  }
  return context as unknown as TabsContextProps<T>
}
