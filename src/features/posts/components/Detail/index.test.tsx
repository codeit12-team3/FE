import userEvent from '@testing-library/user-event'
import { useParams, useRouter } from 'next/navigation'

import {
  mockPostDetail as mockPostData,
  render,
  renderPost,
  screen,
} from '@/tests/utils/post'

import PostDetail from '.'
import PostDetailSkeleton from '../Skeleton/PostDetailSkeleton'

jest.mock('../Detail/PostManage', () => {
  const MockPostManage = ({ postId }: { postId: string }) => {
    const { usePostManage } = jest.requireMock('@/features/posts/hooks')
    const { handleEdit, handleDelete } = usePostManage(postId)

    return (
      <div>
        <div>게시글 관리</div>
        <button onClick={handleEdit} aria-label="게시글 수정">
          게시글 수정
        </button>
        <button onClick={handleDelete} aria-label="게시글 삭제">
          게시글 삭제
        </button>
      </div>
    )
  }

  return {
    __esModule: true,
    default: MockPostManage,
  }
})

jest.mock('../Detail/PostHeader', () => {
  const MockPostHeader = ({
    postId,
    onOpenApplyModal,
    onCancel,
    isCanceling,
  }: {
    postId: string
    onOpenApplyModal: () => void
    onCancel?: () => void
    isCanceling?: boolean
  }) => {
    const { usePostDetail } = jest.requireMock('@/features/posts/api')
    const { useBookmarkToggle } = jest.requireMock('@/features/posts/hooks')
    const { data: post } = usePostDetail({ postId })
    const { toggleBookmark } = useBookmarkToggle(
      postId,
      post?.success ? post.data.isBookmarked : false,
    )

    if (!post || !post.success) return null

    const { tags, title, isApplied, isOwner, isBookmarked } = post.data

    const PostManage = jest.requireMock('../Detail/PostManage').default

    return (
      <div>
        <div>
          {tags.map((tag: string) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h1>{title}</h1>
        <div>
          {isOwner ? (
            <PostManage postId={postId} />
          ) : (
            <>
              {isApplied && onCancel ? (
                <button onClick={onCancel} disabled={isCanceling}>
                  {isCanceling ? '취소 중...' : '신청 취소'}
                </button>
              ) : (
                <button onClick={onOpenApplyModal}>동행 참여하기</button>
              )}
            </>
          )}
          <button
            onClick={toggleBookmark}
            aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
          >
            북마크
          </button>
        </div>
      </div>
    )
  }

  return {
    __esModule: true,
    default: MockPostHeader,
  }
})

jest.mock('../Detail/ApplyModal', () => ({
  __esModule: true,
  default: ({
    onClose,
    onSubmit,
  }: {
    onClose: () => void
    onSubmit: () => void
  }) => (
    <div data-testid="apply-modal">
      <div>동행 신청 모달</div>
      <button onClick={onClose}>닫기</button>
      <button onClick={onSubmit}>신청하기</button>
    </div>
  ),
}))

jest.mock('@/features/posts/api', () => ({
  usePostDetail: jest.fn(),
  useAddBookmark: jest.fn(),
  useRemoveBookmark: jest.fn(),
  useDeletePost: jest.fn(),
  usePatchPost: jest.fn(),
}))

jest.mock('@/api/companions', () => ({
  useApplyCompanion: jest.fn(),
  useCancelCompanion: jest.fn(),
  useInfiniteGetSentCompanions: jest.fn(),
}))

jest.mock('@/features/posts/hooks', () => ({
  useBookmarkToggle: jest.fn(),
  useApply: jest.fn(),
  usePostManage: jest.fn(),
  useCompanionId: jest.fn(),
}))

jest.mock('@/components/comment', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-comment">댓글 컴포넌트</div>,
}))

const mockOpenModal = jest.fn()
const mockCloseModal = jest.fn()

jest.mock('@/stores', () => ({
  useModalActions: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}))

const mockPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  })
  ;(useParams as jest.Mock).mockReturnValue({
    postId: '1',
  })

  const { useDeletePost, usePatchPost } = jest.requireMock(
    '@/features/posts/api',
  )
  useDeletePost.mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  })
  usePatchPost.mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  })

  const { useCancelCompanion, useInfiniteGetSentCompanions } =
    jest.requireMock('@/api/companions')
  useCancelCompanion.mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  })
  useInfiniteGetSentCompanions.mockReturnValue({
    data: { pages: [] },
  })

  const { useBookmarkToggle, useApply, usePostManage, useCompanionId } =
    jest.requireMock('@/features/posts/hooks')
  useBookmarkToggle.mockReturnValue({
    toggleBookmark: jest.fn(),
    isBookmarked: false,
  })
  useApply.mockReturnValue({
    applyMessage: '',
    setApplyMessage: jest.fn(),
    handleApplyCompanion: jest.fn(),
  })
  usePostManage.mockReturnValue({
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
    isDeleting: false,
  })
  useCompanionId.mockReturnValue(undefined)
})

const { usePostDetail } = jest.requireMock('@/features/posts/api')

const mockPostDetail = mockPostData

const renderPostDetail = (postId: string = '1') => {
  return renderPost(<PostDetail postId={postId} />)
}
describe('게시글 상세 조회 테스트', () => {
  test('올바른 postId로 접근하면 게시글 상세가 렌더링된다', () => {
    usePostDetail.mockReturnValue({
      data: {
        success: true,
        data: mockPostDetail,
      },
      isLoading: false,
    })

    renderPostDetail()
    expect(
      screen.getByText('함께 일본 여행 가실 분 구합니다'),
    ).toBeInTheDocument()
  })
  test('잘못된 게시글로 접근하면 에러 메세지가 노출된다', () => {
    usePostDetail.mockReturnValue({
      data: {
        success: false,
        data: null,
      },
      isLoading: false,
    })

    renderPostDetail()
    expect(screen.getByText('게시글을 불러올 수 없습니다.')).toBeInTheDocument()
  })
  test('로딩 상태 테스트', () => {
    const { container } = render(<PostDetailSkeleton />)
    const skeleton = container.querySelector('.max-w-7xl .w-full')
    expect(skeleton).toBeInTheDocument()
  })
})
describe('북마크 토글 테스트', () => {
  test('북마크 버튼 클릭시 북마크가 토글 된다', async () => {
    const mockToggleBookmark = jest.fn()
    const { useBookmarkToggle } = jest.requireMock('@/features/posts/hooks')

    useBookmarkToggle.mockReturnValue({
      toggleBookmark: mockToggleBookmark,
      isBookmarked: false,
    })

    usePostDetail.mockReturnValue({
      data: {
        success: true,
        data: { ...mockPostDetail, isBookmarked: false },
      },
      isLoading: false,
    })

    renderPostDetail()

    const bookmarkButtons = screen.getAllByRole('button', {
      name: '북마크 추가',
    })
    await userEvent.click(bookmarkButtons[0])

    expect(mockToggleBookmark).toHaveBeenCalled()
  })

  test('북마크된 상태에서 버튼 클릭시 북마크가 토글 된다', async () => {
    const mockToggleBookmark = jest.fn()
    const { useBookmarkToggle } = jest.requireMock('@/features/posts/hooks')

    useBookmarkToggle.mockReturnValue({
      toggleBookmark: mockToggleBookmark,
      isBookmarked: true,
    })

    usePostDetail.mockReturnValue({
      data: {
        success: true,
        data: { ...mockPostDetail, isBookmarked: true },
      },
      isLoading: false,
    })

    renderPostDetail()

    const bookmarkButtons = screen.getAllByRole('button', {
      name: '북마크 취소',
    })
    await userEvent.click(bookmarkButtons[0])

    expect(mockToggleBookmark).toHaveBeenCalled()
  })
})
describe('게시글 권한 테스트', () => {
  describe('내가 작성자 일 경우 ', () => {
    test('작성자일 경우 게시글 관리 섹션이 보인다', () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: true },
        },
        isLoading: false,
      })
      renderPostDetail()
      expect(screen.getAllByText('게시글 관리')[0]).toBeInTheDocument()
    })
    test('게시글 삭제 버튼을 누르면 게시글이 삭제된다', async () => {
      const mockHandleDelete = jest.fn()
      const { usePostManage } = jest.requireMock('@/features/posts/hooks')

      usePostManage.mockReturnValue({
        handleEdit: jest.fn(),
        handleDelete: mockHandleDelete,
        isDeleting: false,
      })

      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: true },
        },
        isLoading: false,
      })
      renderPostDetail()

      const deleteButtons = screen.getAllByRole('button', {
        name: '게시글 삭제',
      })
      await userEvent.click(deleteButtons[0])

      expect(mockHandleDelete).toHaveBeenCalled()
    })
    test('게시글 수정 버튼을 누르면 posts/postId/edit으로 이동된다', async () => {
      const mockHandleEdit = jest.fn()
      const { usePostManage } = jest.requireMock('@/features/posts/hooks')

      usePostManage.mockReturnValue({
        handleEdit: mockHandleEdit,
        handleDelete: jest.fn(),
        isDeleting: false,
      })

      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: true },
        },
        isLoading: false,
      })
      renderPostDetail()

      const editButtons = screen.getAllByRole('button', { name: '게시글 수정' })
      await userEvent.click(editButtons[0])

      expect(mockHandleEdit).toHaveBeenCalled()
    })
  })
  describe('내가 작성자가 아닐 경우', () => {
    test('작성자가 아닐 경우 동행 신청 버튼이 보인다', () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail },
        },
        isLoading: false,
      })
      renderPostDetail()
      expect(screen.getAllByText('동행 참여하기')[0]).toBeInTheDocument()
    })
    test('동행신청 버튼을 누르면 동행 신청 모달이 열린다', async () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail },
        },
        isLoading: false,
      })
      renderPostDetail()
      const applyButtons = screen.getAllByRole('button', {
        name: '동행 참여하기',
      })
      await userEvent.click(applyButtons[0])

      expect(mockOpenModal).toHaveBeenCalled()
    })
    test('신청하기 버튼을 누르면 동행이 신청된다.', async () => {
      const mockHandleApply = jest.fn()
      const { useApply } = jest.requireMock('@/features/posts/hooks')

      useApply.mockReturnValue({
        applyMessage: '',
        setApplyMessage: jest.fn(),
        handleApplyCompanion: mockHandleApply,
      })

      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: false },
        },
        isLoading: false,
      })
      renderPostDetail()

      const openModalButtons = screen.getAllByRole('button', {
        name: '동행 참여하기',
      })
      await userEvent.click(openModalButtons[0])

      expect(mockOpenModal).toHaveBeenCalled()

      const modalProps = mockOpenModal.mock.calls[0][0].props
      modalProps.onSubmit()

      expect(mockHandleApply).toHaveBeenCalled()
    })
    test('신청 후 신청 취소 버튼이 보인다', () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isApplied: true },
        },
        isLoading: false,
      })
      renderPostDetail()
      expect(screen.getAllByText('신청 취소')[0]).toBeInTheDocument()
    })
    test('신청 취소 버튼을 누르면 동행 신청이 취소된다', async () => {
      const mockHandleCancel = jest.fn()
      const { useCancelCompanion } = jest.requireMock('@/api/companions')
      const { useCompanionId } = jest.requireMock('@/features/posts/hooks')

      useCancelCompanion.mockReturnValue({
        mutate: mockHandleCancel,
        isPending: false,
      })

      // useCompanionId가 '123'을 반환하도록 mock 설정
      useCompanionId.mockReturnValue('123')

      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isApplied: true },
        },
        isLoading: false,
      })
      renderPostDetail()
      const CancelButtons = screen.getAllByRole('button', {
        name: '신청 취소',
      })
      await userEvent.click(CancelButtons[0])

      expect(mockHandleCancel).toHaveBeenCalledWith('123', expect.any(Object))
    })
  })
})
