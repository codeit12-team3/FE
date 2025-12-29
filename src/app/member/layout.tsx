import { MyPageTitle } from '@/components/member'

interface Props {
  children: React.ReactNode
  menu: React.ReactNode
  content: React.ReactNode
}

export default function Layout({ children, menu, content }: Props) {
  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 space-y-6 py-5 md:py-8 md:px-6 lg:py-6">
      <MyPageTitle className="hidden lg:block" title="마이페이지" />

      <main className="lg:hidden flex flex-col items-center w-full">
        {children}
      </main>

      <main className="hidden lg:flex gap-6 flex-1">
        {menu}
        <div className="flex-1 flex flex-col">{content}</div>
      </main>
    </div>
  )
}
