import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'

import CommentContainer from './CommentContainer'

jest.mock('@/assets/svgr/reload.svg', () => ({
  __esModule: true,
  default: () => null,
}))

const mockMutateAsync = jest.fn().mockResolvedValue(undefined)
const mockRefetch = jest.fn()
const mockFetchNextPage = jest.fn()

jest.mock('@/features/comment/api', () => ({
  useCommentMutations: jest.fn(() => ({
    createCommentMutation: {
      mutateAsync: mockMutateAsync,
      isPending: false,
    },
  })),
  useComments: jest.fn(() => ({
    comments: [],
    isLoading: false,
    fetchNextPage: mockFetchNextPage,
    hasNextPage: false,
    isFetchingNextPage: false,
    isError: false,
    refetch: mockRefetch,
  })),
}))

jest.mock('@/features/comment/components/List/CommentList/CommentList', () => ({
  __esModule: true,
  default: ({ comments }: { comments: { commentId: number }[] }) => (
    <div data-testid="comment-list">{comments.length}개 댓글</div>
  ),
}))

const { useComments } = jest.requireMock('@/features/comment/api')

beforeEach(() => {
  jest.clearAllMocks()
  ;(useParams as jest.Mock).mockReturnValue({ postId: '1' })
  useComments.mockReturnValue({
    comments: [],
    isLoading: false,
    fetchNextPage: mockFetchNextPage,
    hasNextPage: false,
    isFetchingNextPage: false,
    isError: false,
    refetch: mockRefetch,
  })
  mockMutateAsync.mockResolvedValue(undefined)
})

describe('렌더링', () => {
  it('commentCount를 표시한다', () => {
    render(<CommentContainer commentCount={5} />)

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('댓글 작성 폼이 렌더링된다', () => {
    render(<CommentContainer commentCount={0} />)

    expect(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
    ).toBeInTheDocument()
  })

  it('CommentList가 렌더링된다', () => {
    render(<CommentContainer commentCount={0} />)

    expect(screen.getByTestId('comment-list')).toBeInTheDocument()
  })

  it('isError=true일 때 에러 메시지와 재시도 버튼이 표시된다', () => {
    useComments.mockReturnValue({
      comments: [],
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isError: true,
      refetch: mockRefetch,
    })

    render(<CommentContainer commentCount={0} />)

    expect(
      screen.getByText('댓글을 불러오는데 실패했습니다.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /다시 시도/ }),
    ).toBeInTheDocument()
  })

  it('isError=true일 때 CommentList가 렌더링되지 않는다', () => {
    useComments.mockReturnValue({
      comments: [],
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isError: true,
      refetch: mockRefetch,
    })

    render(<CommentContainer commentCount={0} />)

    expect(screen.queryByTestId('comment-list')).not.toBeInTheDocument()
  })
})

describe('댓글 작성', () => {
  it('폼 제출 시 createCommentMutation.mutateAsync가 postId와 content로 호출된다', async () => {
    const user = userEvent.setup()
    render(<CommentContainer commentCount={0} />)

    await user.type(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
      '새 댓글입니다',
    )
    await user.click(screen.getByRole('button', { name: '댓글 작성' }))

    await waitFor(() =>
      expect(mockMutateAsync).toHaveBeenCalledWith({
        postId: 1,
        content: '새 댓글입니다',
      }),
    )
  })

  it('postId가 string으로 와도 number로 변환해 호출한다', async () => {
    const user = userEvent.setup()
    ;(useParams as jest.Mock).mockReturnValue({ postId: '42' })
    render(<CommentContainer commentCount={0} />)

    await user.type(screen.getByPlaceholderText('댓글을 입력해주세요'), '댓글')
    await user.click(screen.getByRole('button', { name: '댓글 작성' }))

    await waitFor(() =>
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({ postId: 42 }),
      ),
    )
  })
})
