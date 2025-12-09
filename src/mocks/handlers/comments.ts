import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'

const CURRENT_USER_ID = 999

const mockComments = [
  {
    commentId: 1,
    postId: '10',
    parentId: null,
    memberId: 999,
    imageUrl: 'https://example.com/profile.jpg',
    nickname: '홍길동',
    content: '좋은 게시글이네요!',
    createdAt: 1701100800000,
    updatedAt: 1701100800000,
    isUpdated: false,
    depth: 0,
  },
  {
    commentId: 2,
    postId: '10',
    parentId: 1,
    memberId: 456,
    imageUrl: 'https://example.com/profile2.jpg',
    nickname: '김철수',
    content: '감사합니다~',
    createdAt: 1701101000000,
    updatedAt: 1701101000000,
    isUpdated: false,
    depth: 1,
  },
]

export const commentHandlers = [
  http.get(`${MOCK_URL}/v1/posts/:postId/comments`, async ({ params }) => {
    await delay(2000)
    const { postId } = params

    if (!postId) {
      return HttpResponse.json(
        {
          success: false,
          status: 404,
          data: {
            errorCode: 'POST_NOT_FOUND',
            message: '게시글을 찾을 수 없습니다.',
          },
          timestamp: '2025-12-02',
        },
        { status: 404, statusText: 'Not Found' },
      )
    }
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: [
          {
            commentId: 1,
            parentId: null,
            memberId: 123,
            imageUrl: 'https://example.com/profile.jpg',
            nickname: '홍길동',
            content: '좋은 게시글이네요!',
            createdAt: 1701100800000,
            updatedAt: 1701100800000,
            isUpdated: false,
            depth: 0,
          },
        ],
        timestamp: new Date().toISOString(),
      },
      { status: 200, statusText: 'OK' },
    )
  }),
  http.post(
    `${MOCK_URL}/v1/posts/:postId/comments`,
    async ({ params, request }) => {
      await delay(2000)
      const { postId } = params
      const body = (await request.json()) as {
        parentId: string | null
        content: string
      }

      if (!body.content || body.content.trim() === '') {
        return HttpResponse.json(
          {
            success: false,
            status: 400,
            data: {
              errorCode: 'COMMENT_001',
              message: '댓글을 입력해주세요',
            },
            timestamp: new Date().toISOString(),
          },
          { status: 400, statusText: 'Bad Request' },
        )
      }

      if (body.content.length > 500) {
        return HttpResponse.json(
          {
            success: false,
            status: 400,
            data: {
              errorCode: 'COMMENT_003',
              message: '댓글의 최대 길이를 초과했습니다.',
            },
            timestamp: new Date().toISOString(),
          },
          { status: 400, statusText: 'Bad Request' },
        )
      }

      if (body.parentId) {
        const parentIdNum = parseInt(body.parentId)
        if (parentIdNum === 2 || parentIdNum === 4) {
          return HttpResponse.json(
            {
              success: false,
              status: 400,
              data: {
                errorCode: 'COMMENT_004',
                message: '대댓글에는 답글을 작성할 수 없습니다.',
              },
              timestamp: new Date().toISOString(),
            },
            { status: 400, statusText: 'Bad Request' },
          )
        }
      }

      return HttpResponse.json(
        {
          success: true,
          status: 201,
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 201, statusText: 'Created' },
      )
    },
  ),
  http.patch(
    `${MOCK_URL}/v1/comments/:commentId`,
    async ({ params, request }) => {
      await delay(2000)
      const { commentId } = params
      const body = (await request.json()) as { content: string }
      const comment = mockComments.find(
        (c) => c.commentId === Number(commentId),
      )
      if (!commentId) {
        return HttpResponse.json(
          {
            success: false,
            status: 400,
            data: {
              errorCode: 'COMMENT_004',
              message: '댓글을 찾을 수 없습니다.',
            },
            timestamp: '2025-12-02',
          },
          { status: 400, statusText: 'Bad Request' },
        )
      }
      if (comment?.memberId !== CURRENT_USER_ID) {
        return HttpResponse.json(
          {
            success: false,
            status: 400,
            data: {
              errorCode: 'COMMENT_005',
              message: '댓글에 대한 권한이 없습니다',
            },
            timestamp: '2025-12-02',
          },
          { status: 400, statusText: 'Bad Request' },
        )
      }
      if (comment?.memberId === null) {
        return HttpResponse.json(
          {
            success: false,
            status: 400,
            data: {
              errorCode: 'COMMENT_006',
              message: '삭제된 댓글은 수정할 수 없습니다.',
            },
            timestamp: '2025-12-02',
          },
          { status: 400, statusText: 'Bad Request' },
        )
      }
      return HttpResponse.json(
        {
          success: true,
          status: 200,
          data: null,
          timestamp: '2025-12-02',
        },
        { status: 200, statusText: 'OK' },
      )
    },
  ),
  http.delete(`${MOCK_URL}/v1/comments/:commentId`, async ({ params }) => {
    await delay(2000)
    const { commentId } = params
    const comment = mockComments.find((c) => c.commentId === Number(commentId))

    if (comment?.memberId !== CURRENT_USER_ID) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: {
            errorCode: 'COMMENT_005',
            message: '댓글에 대한 권한이 없습니다.',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400, statusText: 'Bad Request' },
      )
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 200, statusText: 'OK' },
    )
  }),
]
