import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

let mockMember = {
  memberId: '1',
  nickname: '여행왕',
  birth: '2000-07-20',
  gender: 'MALE',
  image: null,
  mbti: 'ENFP',
  lodgingStyle: 'BUDGET_FRIENDLY',
  tripStyle: 'HEALING',
  introduction: '세계여행이 꿈입니다~',
}

export const memberHandlers = [
  // 불러오는거 테스트
  http.get(`${MOCK_URL}/v1/members/me`, () => {
    return HttpResponse.json({
      success: true,
      status: 200,
      data: mockMember,
      timestamp: new Date().toISOString(),
    })
  }),

  //수정하는거 테스트
  http.patch(`${MOCK_URL}/v1/members/me`, async ({ request }) => {
    const updates = (await request.json()) as Partial<typeof mockMember>
    mockMember = { ...mockMember, ...updates }

    await delay(800)

    return HttpResponse.json({
      success: true,
      status: 200,
      data: mockMember,
      timestamp: new Date().toISOString(),
    })
  }),

  http.get(`${MOCK_URL}/v1/members/nickname/check`, async ({ request }) => {
    await delay(2000)

    const url = new URL(request.url)
    const nickname = url.searchParams.get('nickname')

    if (nickname === '에러') {
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
