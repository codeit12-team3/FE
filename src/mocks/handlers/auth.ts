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
    await delay(2000)

    const body = (await request.json()) as {
      email: string
      password: string
    }

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
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          accessTokenExpiration: '2025-12-09T14:30:00',
          refreshTokenExpiration: '2025-12-16T14:30:00',
        },
      },
      timestamp: '2025-12-02',
    })
  }),
  http.post(`${MOCK_URL}/v1/auth/refresh`, async ({ request, cookies }) => {
    await delay(2000)

    const refreshToken = cookies.refreshToken

    if (!refreshToken || refreshToken === 'invalid_token') {
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

    return HttpResponse.json({
      success: true,
      status: 201,
      data: {
        tokenResponse: {
          accessToken: 'new_mock_access_token_12345',
          refreshToken: 'new_mock_refresh_token_67890',
          accessTokenExpiration: '2025-12-09T14:30:00',
          refreshTokenExpiration: '2025-12-16T14:30:00',
        },
      },
      timestamp: '2025-12-02',
    })
  }),
]
