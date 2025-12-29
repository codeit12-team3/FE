import { MyPageTitle } from '@/components/member'

interface Props {
  children: React.ReactNode
  menu: React.ReactNode
  content: React.ReactNode
}

export default function Layout({ children, menu, content }: Props) {
  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-8 space-y-6">
      <MyPageTitle className="hidden md:block" title="마이페이지" />

      <main className="md:hidden flex flex-col items-center w-full">
        {children}
      </main>

      <main className="hidden md:flex gap-6 flex-1">
        {menu}
        <div className="flex-1 flex flex-col">{content}</div>
      </main>
    </div>
  )
}
