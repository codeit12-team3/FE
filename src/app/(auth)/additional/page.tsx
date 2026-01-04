import { AdditionalForm } from '@/components/auth'

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { email } = await searchParams
  return (
    <section className="max-w-[440px] px-4 md:px-10 py-8 rounded-4xl bg-white flex-1 w-full space-y-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-center">추가 정보</h2>
      <div className="space-y-3">
        <AdditionalForm initialEmail={email || ''} />
      </div>
    </section>
  )
}
