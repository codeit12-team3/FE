import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

export const memberHandlers = [
  http.get(`${MOCK_URL}/members/me`, () => {
    return HttpResponse.json({
      success: true,
      status: 200,
      data: {
        memberId: '1',
        nickname: '여행왕',
        name: '홍길동',
        birth: '2000-07-20',
        gender: 'male',
        image: null,
        mbti: 'ENFP',
        accommodation: '게스트하우스',
        travelStyle: '사진찍기',
        bio: '세계여행이 꿈입니다~',
      },
      timestamp: new Date().toISOString(),
    })
  }),

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
