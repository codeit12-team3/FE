import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

export const memberHandlers = [
  http.post(`${MOCK_URL}/member/nickname/check`, async ({ request }) => {
    await delay(2000)

    const body = (await request.json()) as { nickname: string }

    if (body.nickname === '에러') {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: '',
            message: '이미 존재하는 닉네임입니다.',
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
