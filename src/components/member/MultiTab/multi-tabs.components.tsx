'use client'

import { cn } from '@/lib/common'

import { useMultiTabs } from './multi-tabs.context'

export interface TabOption<T extends string> {
  value: T
  label: string
}

interface FilterTabsProps<T extends string> {
  options: TabOption<T>[]
  paramName: string
  defaultValue?: T
}

export default function FilterTabs<T extends string>({
  options,
  paramName,
  defaultValue,
}: FilterTabsProps<T>) {
  const { getActiveTab, setTab } = useMultiTabs()
  const activeTab = (getActiveTab(paramName) as T) || defaultValue

  return (
    <nav className="flex items-center gap-2" aria-label="Tabs">
      {options.map((tab) => {
        const isSelected = activeTab === tab.value

        return (
          <button
            type="button"
            className={cn(
              'rounded-xl py-2.5 px-4 text-sm font-semibold cursor-pointer bg-gray-200 text-gray-500',
              'hover:bg-gray-300 hover:text-gray-500',
              'active:bg-gray-300 text-gray-500',
              isSelected && 'bg-blue-500! text-white!',
            )}
            key={tab.value}
            onClick={() => setTab(paramName, tab.value)}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
