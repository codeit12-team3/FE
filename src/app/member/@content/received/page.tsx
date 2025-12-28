import { MyPageTitle, ReceivedCompanion } from '@/components/member'

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <MyPageTitle title="받은 동행 신청" sub />
      <ReceivedCompanion />
    </section>
  )
}
