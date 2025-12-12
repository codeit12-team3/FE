import Link from 'next/link'

import { SignupForm } from '@/components/auth'

export default function Page() {
  return (
    <section className="px-4 md:px-14 py-6 md:py-11 rounded-[40px] bg-white flex-1 w-full space-y-4">
      <div className="space-y-[35px]">
        <h2 className="text-2xl font-semibold text-center">회원가입</h2>
        <SignupForm />
      </div>
      <p className="text-center text-sm">
        이미 회원이신가요?{' '}
        <Link
          className="text-main underline underline-offset-1"
          href={'/signin'}
        >
          로그인
        </Link>
      </p>
    </section>
  )
}
