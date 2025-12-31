import Link from 'next/link'

import { SigninForm } from '@/components/auth'
import { OAuthButton } from '@/components/auth/form'

export default function Page() {
  return (
    <section className="max-w-[440px] px-4 md:px-10 py-8 rounded-4xl bg-white flex-1 w-full space-y-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-center">로그인</h2>
      <div className="space-y-3">
        <SigninForm />
        <p className="text-center text-xs font-medium">
          트립어스가 처음이신가요?{' '}
          <Link
            className="text-blue-500 underline underline-offset-1"
            href={'/signup'}
          >
            회원가입
          </Link>
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center w-full">
          <div className="grow border-t border-gray-300" />
          <span className="px-2 text-gray-500 text-xs">또는</span>
          <div className="grow border-t border-gray-300" />
        </div>
        <div className="flex items-center justify-center gap-6">
          <OAuthButton provider="google" />
          <OAuthButton provider="kakao" />
          <OAuthButton provider="naver" />
        </div>
      </div>
    </section>
  )
}
