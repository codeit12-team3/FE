import { MyPageTitle, ReceivedCompanion } from '@/components/member'

export default function Page() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <MyPageTitle title="받은 동행 신청" back />
      <ReceivedCompanion />
    </section>
  )
}
