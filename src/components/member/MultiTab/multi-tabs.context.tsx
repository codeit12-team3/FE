'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useMemo } from 'react'

interface MultiTabsContextProps {
  getActiveTab: (paramName: string) => string | undefined
  setTab: (paramName: string, value: string | undefined) => void
  resetTabs: () => void
}

const MultiTabsContext = createContext<MultiTabsContextProps | undefined>(
  undefined,
)

interface MultiTabsProviderProps {
  children: React.ReactNode
}

export function MultiTabsProvider({ children }: MultiTabsProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getActiveTab = useCallback(
    (paramName: string) => searchParams.get(paramName) || undefined,
    [searchParams],
  )

  const setTab = useCallback(
    (paramName: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(paramName, value)
      } else {
        params.delete(paramName)
      }

      params.delete('page')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, searchParams, router],
  )

  const resetTabs = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [pathname, router])

  const value = useMemo(
    () => ({ getActiveTab, setTab, resetTabs }),
    [getActiveTab, setTab, resetTabs],
  )

  return (
    <MultiTabsContext.Provider value={value}>
      {children}
    </MultiTabsContext.Provider>
  )
}

export function useMultiTabs() {
  const context = useContext(MultiTabsContext)
  if (!context) {
    throw new Error('useMultiTabs는 MultiTabsProvider 하위에서 사용해야 합니다')
  }
  return context
}
