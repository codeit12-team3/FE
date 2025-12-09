import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

export const postsHandlers = [
  http.get(`${MOCK_URL}/v1/posts`, async ({ request }) => {
    await delay(2000)

    const url = new URL(request.url)

    const lastPostId = url.searchParams.get('lastPostId')
    const size = Number(url.searchParams.get('size') || 20)
    const age = url.searchParams.get('age')
    const ageType = url.searchParams.get('ageType')

    if ((age && !ageType) || (!age && ageType)) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: 'AGE_BAD_REQUEST',
            message: 'age와 ageType은 함께 전달되어야 합니다.',
          },
          timestamp: '2025-12-02',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      )
    }

    const mockData = Array.from({ length: size }).map((_, idx) => ({
      postId: lastPostId ? Number(lastPostId) + idx + 1 : idx + 1,
      title: `Mock title ${idx + 1}`,
    }))

    return HttpResponse.json({
      success: true,
      status: 200,
      data: {
        content: mockData,
        isLast: false,
        lastPostId: mockData.at(-1)?.postId ?? null,
      },
      timestamp: '2025-12-02',
    })
  }),
  http.post(`${MOCK_URL}/v1/posts`, async ({ request }) => {
    await delay(2000)

    const body = (await request.json()) as {
      startDate: string
      endDate: string
    }

    if (body.endDate > body.startDate) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            status: 'DATE_BAD_REQUEST',
            message: '시작일이 종료일보다 늦을 수 없습니다.',
          },
          timestamp: '2025-02-26T10:07:20.0734292',
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
  http.get(`${MOCK_URL}/v1/posts/:postId`, async ({ params }) => {
    await delay(2000)

    const { postId } = params

    if (!postId) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            status: 'POST_NOT_FOUND',
            message: '게시글을 찾을 수 없습니다.',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400, statusText: 'Bad Request' },
      )
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      data: {
        postId,
        title: `Mock Title ${postId}`,
        content: `Mock Content ${postId}`,
      },
      timestamp: '2025-12-02',
    })
  }),
  http.post(`${MOCK_URL}/v1/posts/:postId/bookmark`, async ({ params }) => {
    await delay(2000)
    const { postId } = params
    if (!postId) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            status: 'POST_NOT_FOUND',
            message: '게시글을 찾을 수 없습니다.',
          },
          timestamp: '2025-12-02',
        },
        { status: 400, statusText: 'Bad Request' },
      )
    }
    return HttpResponse.json({
      success: true,
      status: 201,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
  http.delete(`${MOCK_URL}/v1/posts/:postId/bookmark`, async ({ params }) => {
    await delay(2000)
    const { postId } = params
    if (!postId) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            status: 'POST_NOT_FOUND',
            message: '게시글을 찾을 수 없습니다.',
          },
          timestamp: '2025-12-02',
        },
        { status: 400, statusText: 'Bad Request' },
      )
    }
    return HttpResponse.json({
      success: true,
      status: 200,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
  http.delete(`${MOCK_URL}/v1/posts/:postId`, async ({ params }) => {
    await delay(2000)
    const { postId } = params
    if (!postId) {
      return HttpResponse.json({
        success: false,
        status: 404,
        data: {
          status: 'POST_NOT_FOUND',
          message: '게시글을 찾을 수 없습니다.',
        },
        timestamp: '2025-12-02',
      })
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      data: null,
      timeStamp: '2025-12-02',
    })
  }),
  http.patch(`${MOCK_URL}/v1/posts/:postId`, async ({ params, request }) => {
    await delay(2000)

    const { postId } = params

    const body = (await request.json()) as {
      userId?: number
      title?: string
      content?: string
    }
    if (!postId) {
      return HttpResponse.json(
        {
          success: false,
          status: 404,
          data: {
            status: 'POST_NOT_FOUND',
            message: '게시글을 찾을 수 없습니다.',
          },
          timestamp: '2025-12-02',
        },
        { status: 404 },
      )
    }
    if (body.userId !== 999) {
      return HttpResponse.json(
        {
          success: false,
          status: 401,
          data: {
            status: 'UNAUTHORIZED',
            message: '해당 게시글을 수정할 권한이 없습니다.',
          },
          timestamp: '2025-12-02',
        },
        { status: 401 },
      )
    }
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          postId,
        },
        timestamp: '2025-12-02',
      },
      { status: 200 },
    )
  }),
]
