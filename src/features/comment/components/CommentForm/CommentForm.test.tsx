import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CommentForm from './CommentForm'

jest.mock('@/lib/common/image', () => ({
  getImageUrl: jest.fn(() => 'https://test.com/profile.jpg'),
}))

jest.mock('@/components/common', () => ({
  ...jest.requireActual('@/components/common'),
  toast: { error: jest.fn(), success: jest.fn() },
}))

const { toast } = jest.requireMock('@/components/common')

const defaultProps = {
  mode: 'create' as const,
  userImage: null,
  isSubmitting: false,
  onSubmit: jest.fn().mockResolvedValue(undefined),
}

beforeEach(() => {
  jest.clearAllMocks()
  defaultProps.onSubmit = jest.fn().mockResolvedValue(undefined)
})

describe('mode별 렌더링', () => {
  it('mode=create: placeholder와 버튼 텍스트가 올바르게 렌더링된다', () => {
    render(<CommentForm {...defaultProps} mode="create" />)

    expect(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '댓글 작성' }),
    ).toBeInTheDocument()
  })

  it('mode=reply: 취소 버튼이 노출된다', () => {
    render(<CommentForm {...defaultProps} mode="reply" />)

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '답글 작성' }),
    ).toBeInTheDocument()
  })

  it('mode=create: 취소 버튼이 없다', () => {
    render(<CommentForm {...defaultProps} mode="create" />)

    expect(
      screen.queryByRole('button', { name: '취소' }),
    ).not.toBeInTheDocument()
  })

  it('mode=edit: initialValue가 textarea에 채워진다', () => {
    render(
      <CommentForm
        {...defaultProps}
        mode="edit"
        initialValue="기존 댓글 내용"
      />,
    )

    expect(screen.getByDisplayValue('기존 댓글 내용')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '수정 완료' }),
    ).toBeInTheDocument()
  })
})

describe('제출 버튼 활성화 / 비활성화', () => {
  it('빈 텍스트일 때 제출 버튼이 disabled다', () => {
    render(<CommentForm {...defaultProps} />)

    expect(screen.getByRole('button', { name: '댓글 작성' })).toBeDisabled()
  })

  it('텍스트 입력 후 제출 버튼이 활성화된다', async () => {
    const user = userEvent.setup()
    render(<CommentForm {...defaultProps} />)

    await user.type(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
      '안녕하세요',
    )

    expect(screen.getByRole('button', { name: '댓글 작성' })).toBeEnabled()
  })

  it('공백만 입력하면 제출 버튼이 disabled다', async () => {
    const user = userEvent.setup()
    render(<CommentForm {...defaultProps} />)

    await user.type(screen.getByPlaceholderText('댓글을 입력해주세요'), '   ')

    expect(screen.getByRole('button', { name: '댓글 작성' })).toBeDisabled()
  })

  it('isSubmitting=true일 때 textarea와 버튼이 모두 disabled다', () => {
    render(
      <CommentForm {...defaultProps} isSubmitting={true} initialValue="내용" />,
    )

    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: '댓글 작성' })).toBeDisabled()
  })
})

describe('제출 동작', () => {
  it('onSubmit이 trim된 텍스트로 호출된다', async () => {
    const user = userEvent.setup()
    render(<CommentForm {...defaultProps} />)

    await user.type(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
      '  안녕하세요  ',
    )
    await user.click(screen.getByRole('button', { name: '댓글 작성' }))

    expect(defaultProps.onSubmit).toHaveBeenCalledWith('안녕하세요')
  })

  it('제출 성공 후 textarea가 초기화된다', async () => {
    const user = userEvent.setup()
    render(<CommentForm {...defaultProps} />)

    const textarea = screen.getByPlaceholderText('댓글을 입력해주세요')
    await user.type(textarea, '안녕하세요')
    await user.click(screen.getByRole('button', { name: '댓글 작성' }))

    await waitFor(() => expect(textarea).toHaveValue(''))
  })

  it('제출 성공 후 onDeActivate가 호출된다', async () => {
    const user = userEvent.setup()
    const onDeActivate = jest.fn()
    render(
      <CommentForm
        {...defaultProps}
        mode="reply"
        onDeActivate={onDeActivate}
      />,
    )

    await user.type(
      screen.getByPlaceholderText('답글을 입력해주세요'),
      '답글입니다',
    )
    await user.click(screen.getByRole('button', { name: '답글 작성' }))

    await waitFor(() => expect(onDeActivate).toHaveBeenCalledTimes(1))
  })

  it('제출 실패 시 toast.error가 호출된다', async () => {
    const user = userEvent.setup()
    defaultProps.onSubmit.mockRejectedValueOnce(new Error('서버 에러'))
    render(<CommentForm {...defaultProps} />)

    await user.type(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
      '안녕하세요',
    )
    await user.click(screen.getByRole('button', { name: '댓글 작성' }))

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        '작업을 완료하지 못했습니다. 다시 시도해주세요.',
      ),
    )
  })

  it('빠른 연속 클릭 시 onSubmit이 1번만 호출된다', async () => {
    const user = userEvent.setup()
    let resolveSubmit!: () => void
    const slowOnSubmit = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve
        }),
    )
    render(<CommentForm {...defaultProps} onSubmit={slowOnSubmit} />)

    await user.type(
      screen.getByPlaceholderText('댓글을 입력해주세요'),
      '안녕하세요',
    )

    const submitBtn = screen.getByRole('button', { name: '댓글 작성' })
    await user.click(submitBtn)
    await user.click(submitBtn)
    await user.click(submitBtn)

    resolveSubmit()
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalledTimes(1))
  })
})
