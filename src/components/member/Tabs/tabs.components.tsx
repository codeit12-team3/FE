'use client'

import { cn } from '@/lib/common'

import { useTabs } from './tabs.context'

export default function Tabs<T extends string>() {
  const { activeTab, setTab, options } = useTabs<T>()

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
            onClick={() => setTab(tab.value)}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
