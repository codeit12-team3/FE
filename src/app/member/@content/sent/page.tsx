import { MyPageTitle, SentCompanion } from '@/components/member'

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <MyPageTitle title="신청한 동행" sub />
      <SentCompanion />
    </section>
  )
}
