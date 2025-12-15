import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'
import { PostListItem } from '@/types/posts'

export const postsHandlers = [
  http.get(`${MOCK_URL}/v1/posts`, async ({ request }) => {
    await delay(2000)

    const url = new URL(request.url)

    const lastItemId = url.searchParams.get('lastItemId')
    const size = Number(url.searchParams.get('size') || 20)

    const keyword = url.searchParams.get('keyword')
    const nation = url.searchParams.get('nation')
    const ageType = url.searchParams.get('ageType')
    const gender = url.searchParams.get('gender')

    const startId = lastItemId ? Number(lastItemId) + 1 : 1

    let mockData: PostListItem[] = Array.from({ length: size }).map(
      (_, idx) => {
        const id = startId + idx

        return {
          postId: id,
          title: `Mock title ${id}`,
          nation: id % 2 === 0 ? '한국' : '일본',
          region: id % 2 === 0 ? '서울' : '도쿄',
          period: {
            startDate: '2025-01-01',
            endDate: '2025-01-02',
          },
          recruitStatus: 'RECRUITING',
          tags: ['힐링', '여행'],
          nickname: 'mockUser',
          currentMembers: 1,
          maxMembers: 3,
          conditions: {
            ageType: id % 2 === 0 ? 'TWENTY' : 'THIRTY',
            genderCondition: id % 2 === 0 ? 'MALE' : 'FEMALE',
          },
          isBookmarked: false,
          thumbnail: '/mock.png',
        }
      },
    )

    if (keyword) {
      mockData = mockData.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase()),
      )
    }

    if (nation) {
      mockData = mockData.filter((post) => post.nation === nation)
    }

    if (ageType) {
      mockData = mockData.filter((post) => post.conditions.ageType === ageType)
    }

    if (gender) {
      mockData = mockData.filter(
        (post) => post.conditions.genderCondition === gender,
      )
    }

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
      title: string
      content: string
      nation: string
      region: string
      startDate: string
      endDate: string
      maxMembers: number
      tags: string[]
      images: string[]
      genderType: string
      ageType: string
    }

    if (body.startDate > body.endDate) {
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

    const mockPostId = Math.floor(Math.random() * 1000) + 1

    return HttpResponse.json(
      {
        success: true,
        status: 201,
        data: {
          postId: mockPostId.toString(),
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: 201,
      },
    )
  }),

  http.post(`${MOCK_URL}/v1/images/presigned-url`, async ({ request }) => {
    console.log('🖼️ [MSW] Presigned URL 요청 받음')
    await delay(500)

    const body = (await request.json()) as {
      images: Array<{
        imageId: string
        imageType: string
        imageDirectory: string
      }>
    }

    const urls = body.images.map((img) => ({
      presignedUrl: `https://mock-s3.amazonaws.com/upload/${img.imageId}`,
      image: `https://mock-cdn.example.com/${img.imageDirectory.toLowerCase()}/${img.imageId}.${img.imageType.toLowerCase()}`,
    }))

    return HttpResponse.json({
      success: true,
      status: 200,
      data: {
        urls,
      },
      timestamp: new Date().toISOString(),
    })
  }),

  http.put('https://mock-s3.amazonaws.com/upload/:imageId', async () => {
    console.log('📤 [MSW] S3 업로드 완료')
    await delay(800)
    return new HttpResponse(null, { status: 200 })
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

    const id = Number(postId)

    return HttpResponse.json({
      success: true,
      status: 200,
      data: {
        title: `Mock Title ${postId}`,
        content: `이것은 게시글 ${postId}번의 상세 내용입니다. 여행을 함께 떠나실 분을 모집합니다!`,
        nation: id % 2 === 0 ? '한국' : '일본',
        region: id % 2 === 0 ? '서울' : '도쿄',
        period: {
          startDate: '2025-01-01',
          endDate: '2025-01-02',
        },
        stats: {
          maxMembers: 5,
          currentMembers: 2,
          viewCount: 42,
        },
        recruitStatus: 'RECRUITING',
        tags: ['힐링', '여행', '맛집'],
        nickname: 'mockUser',
        isOwner: false,
        conditions: {
          ageCondition: id % 2 === 0 ? 'TWENTY' : 'THIRTY',
          genderCondition: id % 2 === 0 ? 'MALE' : 'FEMALE',
        },
        isBookmarked: false,
        bookmarkCount: 10,
        commentCount: 5,
        images: ['/mock.png', '/mock.png'],
        writer: {
          memberId: 1,
          nickname: 'mockUser',
          profileImage: '/mock.png',
          birth: 1990,
          age: 35,
          gender: id % 2 === 0 ? 'MALE' : 'FEMALE',
          mbti: 'ENFP',
        },
        thumbnail: ['/mock.png'],
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        timestamp: '2025-12-02',
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
