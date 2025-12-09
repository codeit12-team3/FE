import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import z from 'zod'

import { renewalToken, signinEmail } from '@/api/auth'

import { authConfig } from './auth.config'

async function refreshAcessToken(token: JWT): Promise<JWT> {
  try {
    const res = await renewalToken(token.tokenResponse.refreshToken)

    if (!res.success || !res.data) {
      throw new Error('Refresh Failed')
    }

    const newTokenRes = res.data.tokenResponse

    return {
      ...token,
      tokenResponse: {
        ...token.tokenResponse,
        accessToken: newTokenRes.accessToken,
        refreshToken:
          newTokenRes.refreshToken ?? token.tokenResponse.refreshToken,
        accessTokenExpiration: newTokenRes.accessTokenExpiration,
        refreshTokenExpiration: newTokenRes.refreshTokenExpiration,
      },
      expiresAt: new Date(newTokenRes.accessTokenExpiration).getTime(),
    }
  } catch (e) {
    console.error('토큰 갱신 실패', e)

    return {
      ...token,
      error: 'RefreshTokenError',
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials)

        if (parsed.success) {
          const { email, password } = parsed.data

          try {
            const res = await signinEmail({ email, password })

            if (res.success && res.data) {
              return res.data
            }
          } catch (e) {
            console.error(e)
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.nickname = user.nickname
        token.birth = user.birth
        token.gender = user.gender
        token.mbti = user.mbti
        token.tokenResponse = user.tokenResponse
        token.expiresAt = new Date(
          user.tokenResponse.accessTokenExpiration,
        ).getTime()

        return token
      }

      if (Date.now() < (token.expiresAt as number) - 10000) {
        return token
      }

      return await refreshAcessToken(token)
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email
        session.user.nickname = token.nickname
        session.user.birth = token.birth
        session.user.gender = token.gender
        session.user.mbti = token.mbti
        session.user.tokenResponse = token.tokenResponse
      }

      if (token.error) {
        session.error = token.error
      }

      return session
    },
  },
})
