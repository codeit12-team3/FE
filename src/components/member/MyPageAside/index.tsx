import { cn } from '@/lib/common'

import MyPageTitle from '../MyPageTitle'
import MyProfile from './MyProfile'
import SubMenu from './SubMenu'

interface Props {
  className?: string
}

export default function MyPageAside({ className }: Props) {
  return (
    <aside className={cn('md:max-w-60 w-full space-y-4', className)}>
      <MyPageTitle className="md:hidden" title="마이페이지" />
      <MyProfile />
      <SubMenu />
    </aside>
  )
}
