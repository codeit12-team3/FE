import { SigninEmailRes } from '../auth'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends SigninEmailRes {}

  interface Session {
    user: SigninEmailRes & DefaultSession['user']
    error?: 'RefreshTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends SigninEmailRes {
    expiresAt: number
    error?: 'RefreshTokenError'
  }
}
