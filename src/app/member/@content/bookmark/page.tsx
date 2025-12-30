import { MyPageTitle } from '@/components/member'
import BookmarkPosts from '@/components/member/bookmarkPosts'

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <MyPageTitle title="찜한 게시글" sub />
      <BookmarkPosts />
    </section>
  )
}
