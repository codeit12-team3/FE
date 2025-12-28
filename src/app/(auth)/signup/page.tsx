import Link from 'next/link'

import { SignupForm } from '@/components/auth'

export default function Page() {
  return (
    <section className="max-w-[440px] px-4 md:px-10 py-8 rounded-4xl bg-white flex-1 w-full space-y-3 border border-gray-200">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center">회원가입</h2>
        <SignupForm />
      </div>
      <p className="text-center text-xs font-medium">
        이미 회원이신가요?{' '}
        <Link
          className="text-blue-500 underline underline-offset-1"
          href={'/signin'}
        >
          로그인
        </Link>
      </p>
    </section>
  )
}
