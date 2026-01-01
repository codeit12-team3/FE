import { MyPageTitle } from '@/components/member'
import BookmarkPosts from '@/components/member/BookmarkPosts'

export default function BookmarksPage() {
  return (
    <section className="flex flex-col gap-4">
      <MyPageTitle title="찜한 게시글" back />
      <BookmarkPosts />
    </section>
  )
}
