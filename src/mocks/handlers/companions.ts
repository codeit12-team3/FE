import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

const CURRENT_USER_ID = 999

const mockPosts = [
  { postId: '10', recruitStatus: 'ACTIVE', writerId: 999 },
  { postId: '20', recruitStatus: 'CLOSED', writerId: 123 },
]

const mockCompanions = [
  { companionId: 1, postId: '10', userId: CURRENT_USER_ID, status: 'PENDING' },
  { companionId: 2, postId: '20', userId: CURRENT_USER_ID, status: 'REJECTED' },
]

export const companionsHandlers = [
  http.post(
    `${MOCK_URL}/v1/companions/posts/:postId`,
    async ({ params, request }) => {
      await delay(2000)
      const { postId } = params
      const body = (await request.json()) as { applyMessage: string }
      const targetPost = mockPosts.find((p) => p.postId === postId)

      if (!targetPost) {
        return HttpResponse.json({
          success: false,
          status: 404,
          data: {
            status: 'POST_NOT_FOUND',
            message: '존재하지 않는 게시글입니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      if (targetPost.recruitStatus === 'CLOSED') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'POST_CLOSED',
            message: '모집이 종료된 게시글입니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      if (targetPost.writerId === CURRENT_USER_ID) {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'MY_POST',
            message: '본인의 게시글에는 신청할 수 없습니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      const myHistory = mockCompanions.find(
        (c) => c.postId === postId && c.userId === CURRENT_USER_ID,
      )

      if (myHistory?.status === 'PENDING') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'ALREADY_APPLIED',
            message: '이미 신청한 게시글입니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      if (myHistory?.status === 'REJECTED') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'REJECTED_USER',
            message: '이미 거절된 동행입니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      if (myHistory?.status === 'EXITED') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'ALREADY_EXITED',
            message: '나간 동행은 재참여가 불가합니다.',
          },
          timestamp: '2025-12-02',
        })
      }

      const newCompanion = {
        companionId: mockCompanions.length + 1,
        postId: String(postId),
        userId: CURRENT_USER_ID,
        status: 'PENDING' as const,
        applyMessage: body.applyMessage,
      }
      mockCompanions.push(newCompanion)

      return HttpResponse.json({
        success: true,
        status: 201,
        data: {
          postId: String(postId),
          status: 'PENDING',
        },
        timestamp: new Date().toISOString(),
      })
    },
  ),
  http.patch(
    `${MOCK_URL}/v1/companions/:companionId`,
    async ({ params, request }) => {
      await delay(2000)
      const { companionId } = params
      const body = (await request.json()) as { status: 'APPROVE' | 'DENIED' }
      const companion = mockCompanions.find(
        (c) => c.companionId === Number(companionId),
      )

      if (!companion) {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'COMPANION_007',
            message: '해당 동행을 수락할 권한이 없습니다.',
          },
          timestamp: '2025-12-02',
        })
      }
      const post = mockPosts.find((p) => p.postId === companion.postId)
      if (!post) {
        return HttpResponse.json({
          success: false,
          status: 404,
          data: {
            status: 'POST_NOT_FOUND',
            message: '존재하지 않는 게시글입니다.',
          },
          timestamp: '2025-12-02',
        })
      }
      if (post.writerId !== CURRENT_USER_ID) {
        return HttpResponse.json({
          success: false,
          status: 403,
          data: {
            status: 'COMPANION_007',
            message: '해당 동행을 수락할 권한이 없습니다.',
          },
          timestamp: '2025-12-02',
        })
      }
      if (companion.status !== 'PENDING') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'NOT_PENDING_STATUS',
            message: '승인 대기 중인 신청이 아닙니다.',
          },
          timestamp: '2025-12-02',
        })
      }
      if (body.status !== 'APPROVE' && body.status !== 'DENIED') {
        return HttpResponse.json({
          success: false,
          status: 400,
          data: {
            status: 'INVALID_STATUS',
            message:
              '유효하지 않은 상태값입니다. APPROVE 또는 DENIED만 가능합니다.',
          },
          timestamp: '2025-12-02',
        })
      }
      return HttpResponse.json({
        success: true,
        status: 200,
        data: null,
        timestamp: '2025-12-02',
      })
    },
  ),
  http.delete(`${MOCK_URL}/v1/companions/:companionId`, async ({ params }) => {
    await delay(2000)
    const { companionId } = params
    const companion = mockCompanions.find(
      (c) => c.companionId === Number(companionId),
    )
    if (!companionId) {
      return HttpResponse.json({
        success: false,
        status: 404,
        data: {
          status: 'COMPANION_001',
          message: '동행 신청을 찾을 수 없습니다.',
        },
        timestamp: '2025-12-02',
      })
    }
    if (companion?.status !== 'PENDING') {
      return HttpResponse.json({
        success: false,
        status: 400,
        data: {
          status: 'COMPANION_008',
          message: '승인 대기 중인 신청이 아닙니다.',
        },
        timestamp: new Date().toISOString(),
      })
    }
    if (companion?.status !== 'PENDING') {
      return HttpResponse.json({
        success: false,
        status: 400,
        data: {
          status: 'COMPANION_010',
          message: '본인이 신청한 동행이 아닙니다.',
        },
        timestamp: '2025-12-02',
      })
    }
    return HttpResponse.json({
      success: true,
      status: 200,
      data: null,
      timestamp: '2025-12-02',
    })
  }),
]
