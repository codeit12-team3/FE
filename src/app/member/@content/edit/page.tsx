import { MyPageTitle, ProfileEdit } from '@/components/member'

export default function Page() {
  return (
    <div className="w-full mx-auto">
      <MyPageTitle title="프로필 수정" sub />
      <ProfileEdit />
    </div>
  )
}
