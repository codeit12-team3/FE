import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

export const authHandlers = [
  http.post(`${MOCK_URL}/auth/email/code`, async ({ request }) => {
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
  http.post(`${MOCK_URL}/auth/email/verify`, async ({ request }) => {
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
  http.post(`${MOCK_URL}/auth/login`, async ({ request }) => {
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
          accessTokenExpiration: 1800000,
          refreshTokenExpiration: 1209600000,
        },
      },
      timestamp: '2025-12-02',
    })
  }),
]
