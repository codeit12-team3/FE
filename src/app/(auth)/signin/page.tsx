import Link from 'next/link'

import { OAuthButton, SigninForm } from '@/components/auth'

export default function Page() {
  return (
    <section className="px-4 md:px-14 py-6 md:py-11 rounded-[40px] bg-white flex-1 w-full space-y-4">
      <div className="space-y-[35px]">
        <h2 className="text-2xl font-semibold text-center">로그인</h2>
        <SigninForm />
      </div>
      <p className="text-center text-sm">
        트립어스가 처음이신가요?{' '}
        <Link
          className="text-main underline underline-offset-1"
          href={'/signin'}
        >
          회원가입
        </Link>
      </p>
      <div className="flex items-center w-full">
        <div className="grow border-t bg-text-base" />
        <span className="px-[23px]">또는</span>
        <div className="grow border-t bg-text-base" />
      </div>
      <div className="flex items-center justify-center gap-[30px]">
        <OAuthButton provider="google" size="lg" />
        <OAuthButton provider="kakao" size="lg" />
        <OAuthButton provider="naver" size="lg" />
      </div>
    </section>
  )
}
