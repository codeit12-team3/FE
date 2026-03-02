'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/common'

import { useIsMobile } from '../../hook/useIsMobile'

interface ChatLayoutClientProps {
  sidebar: React.ReactNode
  chatRoom: React.ReactNode
}

export default function ChatLayoutClient({
  sidebar,
  chatRoom,
}: ChatLayoutClientProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const isChatting = pathname !== '/chat' && pathname.startsWith('/chat/')

  return (
    <div className="max-w-7xl mx-auto flex w-full h-[calc(100vh-68px)] overflow-hidden bg-white">
      <aside
        className={cn(
          'max-w-[744px] md:w-[375px] w-full flex-col bg-white md:flex border-r border-gray-200',
          isMobile && isChatting ? 'hidden' : 'flex',
        )}
      >
        {sidebar}
      </aside>

      <main
        className={cn(
          'bg-gray-50 flex-1 flex flex-col min-h-0',
          isMobile && !isChatting ? 'hidden' : 'flex',
        )}
      >
        {chatRoom}
      </main>
    </div>
  )
}
