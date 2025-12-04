'use client'

import { usePathname } from 'next/navigation'

import { MyPageHeader, TabLink } from '@/components/member'

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === '/member/edit') {
    return <div className="max-w-7xl mx-auto mt-17">{children}</div>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto mt-17">
        <MyPageHeader />

        <nav className="flex gap-10 border-b border-gray-200 mb-10 -mt-4">
          <TabLink href="/member">받은 동행 신청</TabLink>
          <TabLink href="/member/sent">신청한 동행</TabLink>
          <TabLink href="/member/posts">내 게시글</TabLink>
          <TabLink href="/member/bookmarks">북마크</TabLink>
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}
