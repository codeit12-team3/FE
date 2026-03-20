import { delay, http, HttpResponse } from 'msw'

import { MOCK_URL } from '@/constants/common'
import { Comment, Reply } from '@/features/comment/types'

const CURRENT_USER_ID = 999

export const mockComments: Comment[] = [
  {
    commentId: 1,
    memberId: 101,
    imageUrl: 'https://picsum.photos/id/10/200/200',
    nickname: '코딩하는고양이',
    content:
      'Zustand로 상태 관리하는 게 정말 편리하네요! 좋은 정보 감사합니다.',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z',
    isUpdated: false,
    commentsCount: 2,
  },
  {
    commentId: 2,
    memberId: 102,
    imageUrl: 'https://picsum.photos/id/20/200/200',
    nickname: '리액트마스터',
    content: '혹시 Next.js 15 버전에서도 테스트해 보셨나요? 궁금합니다.',
    createdAt: '2026-03-15T10:30:00Z',
    updatedAt: '2026-03-15T11:00:00Z',
    isUpdated: true,
    commentsCount: 0,
  },
  {
    commentId: 3,
    memberId: 103,
    imageUrl: 'https://picsum.photos/id/30/200/200',
    nickname: '데브옵스조아',
    content: '배포 환경에서 환경 변수 설정하는 법도 다뤄주시면 좋겠어요.',
    createdAt: '2026-03-16T12:00:00Z',
    updatedAt: '2026-03-16T12:00:00Z',
    isUpdated: false,
    commentsCount: 5,
  },
  {
    commentId: 4,
    memberId: 104,
    imageUrl: 'https://picsum.photos/id/40/200/200',
    nickname: '디자인꿈나무',
    content: 'UI가 정말 깔끔하네요. 사용하신 폰트 정보 알 수 있을까요?',
    createdAt: '2026-03-16T15:45:00Z',
    updatedAt: '2026-03-16T15:45:00Z',
    isUpdated: false,
    commentsCount: 0,
  },
  {
    commentId: 5,
    memberId: 105,
    imageUrl: 'https://picsum.photos/id/50/200/200',
    nickname: '버그잡는사냥꾼',
    content:
      '모바일 환경에서 메뉴 버튼 클릭 시 레이아웃이 살짝 깨지는 것 같아요.',
    createdAt: '2026-03-17T09:00:00Z',
    updatedAt: '2026-03-17T09:20:00Z',
    isUpdated: true,
    commentsCount: 1,
  },
]

export const mockReplies: Reply[] = [
  {
    commentId: 11,
    memberId: 201,
    parentId: 1,
    imageUrl: 'https://picsum.photos/id/11/200/200',
    nickname: '답글러1',
    content: 'Zustand 저도 써봤는데 보일러플레이트가 적어서 정말 좋더라고요!',
    createdAt: '2026-03-15T10:05:00Z',
    updatedAt: '2026-03-15T10:05:00Z',
    isUpdated: false,
    commentsCount: 0,
  },
  {
    commentId: 12,
    memberId: 202,
    parentId: 1,
    imageUrl: 'https://picsum.photos/id/12/200/200',
    nickname: '답글러2',
    content: '맞아요, Redux보다 훨씬 가볍고 직관적인 것 같습니다.',
    createdAt: '2026-03-15T10:10:00Z',
    updatedAt: '2026-03-15T10:10:00Z',
    isUpdated: false,
    commentsCount: 0,
  },
  {
    commentId: 13,
    memberId: 203,
    parentId: 3,
    imageUrl: 'https://picsum.photos/id/13/200/200',
    nickname: '인프라요정',
    content: 'Vercel 사용하시면 Settings에서 환경 변수 설정이 가능해요.',
    createdAt: '2026-03-16T12:30:00Z',
    updatedAt: '2026-03-16T12:30:00Z',
    isUpdated: false,
    commentsCount: 0,
  },
  {
    commentId: 14,
    memberId: 204,
    parentId: 5,
    imageUrl: 'https://picsum.photos/id/14/200/200',
    nickname: 'QA엔지니어',
    content: '해당 현상 아이폰 환경에서 재현되는 것 확인했습니다.',
    createdAt: '2026-03-17T09:40:00Z',
    updatedAt: '2026-03-17T09:40:00Z',
    isUpdated: false,
    commentsCount: 0,
  },
  {
    commentId: 15,
    memberId: 205,
    parentId: 2,
    imageUrl: 'https://picsum.photos/id/15/200/200',
    nickname: '테스트고수',
    content: 'renderHook을 사용해 보시면 테스트가 훨씬 쉬워질 거예요!',
    createdAt: '2026-03-18T11:45:00Z',
    updatedAt: '2026-03-18T11:45:00Z',
    isUpdated: false,
    commentsCount: 0,
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
