import { MyPageTitle } from '@/components/member'
import MyPosts from '@/components/member/MyPosts'

export default function MyPostsPage() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <MyPageTitle title="내 게시글" back />
      <MyPosts />
    </section>
  )
}
