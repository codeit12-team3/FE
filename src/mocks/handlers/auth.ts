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
]
