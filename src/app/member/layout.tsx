'use client'

import { usePathname } from 'next/navigation'

import { MyPageHeader, MyProfileSection, TabLink } from '@/components/member'

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
    <main className="flex-1 max-w-7xl mx-auto w-full px-8 space-y-6">
      <h2 className="text-2xl font-semibold mt-6">마이페이지</h2>
      <MyProfileSection />

      <nav className="flex gap-10 border-b border-gray-200">
        <TabLink href="/member">받은 동행 신청</TabLink>
        <TabLink href="/member/sent">신청한 동행</TabLink>
        <TabLink href="/member/posts">내 게시글</TabLink>
        <TabLink href="/member/bookmarks">북마크</TabLink>
      </nav>
      {children}
    </main>
  )
}
