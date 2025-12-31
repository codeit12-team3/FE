import { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

import { AUTH_PATH, PUBLIC_PATH } from '@/constants/auth'

function isMatchedPath(pathname: string, paths: (string | RegExp)[]) {
  return paths.some((path) =>
    typeof path === 'string' ? path === pathname : path.test(pathname),
  )
}

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const curPath = nextUrl.pathname
      const isLoggedIn = !!auth?.user

      // 토큰 갱신 실패 마킹시 강제로 로그아웃 처리
      if (auth?.error === 'RefreshTokenError') {
        const signInUrl = new URL('/signin', nextUrl)
        signInUrl.searchParams.set('callbackUrl', curPath)

        const response = NextResponse.redirect(signInUrl)

        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('__Secure-next-auth.session-token')
        response.cookies.delete('next-auth.csrf-token')
        response.cookies.delete('__Secure-next-auth.csrf-token')

        return response
      }

      const isPublicPath = isMatchedPath(curPath, PUBLIC_PATH)
      const isAuthPath = isMatchedPath(curPath, AUTH_PATH)
      // 로그인 상태에서 인증 페이지 접근 시 홈으로 리다이렉트
      if (isLoggedIn && isAuthPath) {
        return Response.redirect(new URL('/', nextUrl))
      }
      // 공개 경로는 항상 허용
      if (isPublicPath) {
        return true
      }
      // 비로그인 상태에서 비공개 경로 접근 시 로그인 페이지로 리다이렉트
      if (!isLoggedIn) {
        const signInUrl = new URL('/signin', nextUrl)
        signInUrl.searchParams.set('callbackUrl', curPath)
        return Response.redirect(signInUrl)
      }
      return true
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
