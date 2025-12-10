import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import { authConfig } from './lib/next-auth'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const res = NextResponse.next()

  res.headers.set('x-url', req.url)
  res.headers.set('x-pathname', req.nextUrl.pathname)

  return res
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
