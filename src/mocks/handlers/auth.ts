import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

export const authHandlers = [
  http.post(`${MOCK_URL}/v1/auth/email/code`, async ({ request }) => {
    await delay(2000)

    const body = (await request.json()) as { email: string }

    if (body.email === 'error@error.com') {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '에러',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      )
    }

    return HttpResponse.json({
      success: true,
      status: 201,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
  http.post(`${MOCK_URL}/v1/auth/email/verify`, async ({ request }) => {
    await delay(2000)

    const body = (await request.json()) as {
      email: string
      emailVerifyCode: string
    }

    if (body.emailVerifyCode === '000000') {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '에러',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      )
    }

    return HttpResponse.json({
      success: true,
      status: 201,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
  http.post(`${MOCK_URL}/v1/auth/login`, async ({ request }) => {
    console.log('🔐 [MSW] 로그인 요청 받음')
    await delay(2000)

    const body = (await request.json()) as {
      email: string
      password: string
    }
    console.log('📧 [MSW] 로그인 이메일:', body.email)

    if (body.email === 'error@error.com') {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '이메일 또는 비밀번호를 확인해주세요',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 401,
          statusText: 'Bad Request',
        },
      )
    }

    // 리프레시 토큰 테스트용: short@test.com 이메일은 5초 후 만료
    const isShortExpiry = body.email === 'short@test.com'
    const now = new Date()
    const accessExpiry = new Date(
      now.getTime() + (isShortExpiry ? 15000 : 24 * 60 * 60 * 1000),
    )
    const refreshExpiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7일

    return HttpResponse.json({
      success: true,
      status: 201,
      data: {
        email: `${body.email}`,
        nickname: 'test',
        birth: '2025-12-02',
        gender: '남',
        mbti: 'INTP',
        tokenResponse: {
          accessToken: 'mock_access_token_12345',
          refreshToken: 'mock_refresh_token_67890',
          accessTokenExpiration: accessExpiry.getTime(),
          refreshTokenExpiration: refreshExpiry.getTime(),
        },
      },
      timestamp: new Date().toISOString(),
    })
  }),

  // 리프레시 토큰
  http.post(`${MOCK_URL}/v1/auth/refresh`, async ({ cookies }) => {
    console.log('🔄 [MSW] 토큰 갱신 요청 받음:', {
      refreshToken: cookies.refreshToken,
    })
    await delay(2000)

    const refreshToken = cookies.refreshToken

    if (!refreshToken || refreshToken === 'invalid_token') {
      console.log('❌ [MSW] 토큰 갱신 실패: 유효하지 않은 토큰')
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '리프레시 토큰이 없거나 만료되었습니다',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 401,
          statusText: 'Bad Request',
        },
      )
    }

    console.log('✅ [MSW] 토큰 갱신 성공')

    const now = new Date()
    const accessExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    const refreshExpiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    return HttpResponse.json({
      success: true,
      status: 201,
      data: {
        tokenResponse: {
          accessToken: 'new_mock_access_token_12345',
          refreshToken: 'new_mock_refresh_token_67890',
          accessTokenExpiration: accessExpiry.getTime(),
          refreshTokenExpiration: refreshExpiry.getTime(),
        },
      },
      timestamp: '2025-12-09',
    })
  }),

  http.post(`${MOCK_URL}/v1/auth/signup`, async ({ request }) => {
    await delay(2000)

    const body = (await request.json()) as { email: string }

    if (body.email === 'error@error.com') {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '에러',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      )
    }

    return HttpResponse.json({
      success: true,
      status: 201,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
]
