import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

import { QueryProvider } from '@/providers'
import { GenderType, PostContent } from '@/types/posts'

import PostDetail from '.'
import PostDetailSkeleton from '../Skeleton/PostDetailSkeleton'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))

jest.mock('../Detail/PostManage', () => ({
  __esModule: true,
  default: ({ onEdit }: { onEdit: () => void }) => (
    <div>
      <div>게시글 관리</div>
      <button onClick={onEdit}>게시글 수정</button>
      <button
        onClick={() => {
          const { useDeletePost } = jest.requireMock('@/api/posts')
          const deletePost = useDeletePost()
          deletePost.mutate()
        }}
      >
        게시글 삭제
      </button>
    </div>
  ),
}))

jest.mock('../Detail/PostActions', () => ({
  __esModule: true,
  default: ({ onApply }: { onApply: () => void }) => (
    <button onClick={onApply}>동행 신청하기</button>
  ),
}))

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

jest.mock('@/api/posts', () => ({
  usePostDetail: jest.fn(),
  useAddBookmark: jest.fn(),
  useRemoveBookmark: jest.fn(),
  useDeletePost: jest.fn(),
  usePatchPost: jest.fn(),
}))

jest.mock('@/api/companions', () => ({
  useApplyCompanion: jest.fn(),
}))

const mockPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  })

  const { useDeletePost, usePatchPost } = jest.requireMock('@/api/posts')
  useDeletePost.mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  })
  usePatchPost.mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  })
})

const { usePostDetail } = jest.requireMock('@/api/posts')

const mockPostDetail: PostContent = {
  title: '함께 일본 여행 가실 분 구합니다',
  content: '12월에 도쿄에서 맛집 투어와 사진 촬영 같이 하실 분 구해요!',
  nation: 'JP',
  region: '도쿄',
  period: {
    startDate: '2025-12-15',
    endDate: '2025-12-17',
  },
  stats: {
    maxMembers: 10,
    currentMembers: 1,
    viewCount: 42,
  },
  recruitStatus: 'RECRUITING',
  tags: ['맛집투어', '카페', '사진'],
  nickname: '여행러버',
  isOwner: false,
  conditions: {
    ageCondition: 'TWENTY',
    genderCondition: 'MALE',
  },
  isBookmarked: false,
  bookmarkCount: 12,
  commentCount: 3,
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  writer: {
    memberId: 1,
    nickname: '여행러버',
    profileImage: null,
    birth: 1998,
    age: 27,
    gender: GenderType.MALE,
    mbti: 'ENFP',
  },
  thumbnail: ['https://example.com/thumb.jpg'],
  createdAt: '2025-12-01T10:00:00Z',
  updatedAt: '2025-12-05T12:00:00Z',
  timestamp: '2025-12-05T12:00:00Z',
}
const renderPostDetail = (postId: string = '1') => {
  return render(
    <QueryProvider>
      <PostDetail postId={postId} />
    </QueryProvider>,
  )
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
  test('북마크 버튼 클릭시 북마크가 추가 된다', async () => {
    const mockAddBookmark = jest.fn()
    const { useAddBookmark } = jest.requireMock('@/api/posts')

    useAddBookmark.mockReturnValue({
      mutate: mockAddBookmark,
    })

    usePostDetail.mockReturnValue({
      data: {
        success: true,
        data: { ...mockPostDetail, isBookmarked: false },
      },
      isLoading: false,
    })

    renderPostDetail()

    const bookmarkButton = screen.getByRole('button', { name: '' })
    await userEvent.click(bookmarkButton)

    expect(mockAddBookmark).toHaveBeenCalledWith('1')
  })

  test('북마크 버튼 클릭시 북마크가 삭제 된다', async () => {
    const mockRemoveBookmark = jest.fn()
    const { useRemoveBookmark } = jest.requireMock('@/api/posts')

    useRemoveBookmark.mockReturnValue({
      mutate: mockRemoveBookmark,
    })

    usePostDetail.mockReturnValue({
      data: {
        success: true,
        data: { ...mockPostDetail, isBookmarked: true },
      },
      isLoading: false,
    })

    renderPostDetail()

    const bookmarkButton = screen.getByRole('button', { name: '' })
    await userEvent.click(bookmarkButton)

    expect(mockRemoveBookmark).toHaveBeenCalledWith('1')
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
      expect(screen.getByText('게시글 관리')).toBeInTheDocument()
    })
    test('게시글 삭제 버튼을 누르면 게시글이 삭제된다', async () => {
      const mockDeletePost = jest.fn()
      const { useDeletePost } = jest.requireMock('@/api/posts')

      useDeletePost.mockReturnValue({
        mutate: mockDeletePost,
        isPending: false,
      })

      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: true },
        },
        isLoading: false,
      })
      renderPostDetail()

      const deleteButton = screen.getByRole('button', { name: '게시글 삭제' })
      await userEvent.click(deleteButton)

      expect(mockDeletePost).toHaveBeenCalled()
    })
    test('게시글 수정 버튼을 누르면 posts/postId/edit으로 이동된다', async () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: true },
        },
        isLoading: false,
      })
      renderPostDetail()

      const editButton = screen.getByRole('button', { name: '게시글 수정' })
      await userEvent.click(editButton)

      expect(mockPush).toHaveBeenCalledWith('/posts/1/edit')
    })
  })
  describe('내가 작성자가 아닐 경우', () => {
    test('작성자가 아닐 경우 동행신청 버튼이 보인다', () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail },
        },
        isLoading: false,
      })
      renderPostDetail()
      expect(screen.getByText('동행 신청하기')).toBeInTheDocument()
    })
    test('동행신청 버튼을 누르면 동행 신청 모달이 보인다', async () => {
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail },
        },
        isLoading: false,
      })
      renderPostDetail()
      const applyButton = screen.getByRole('button', { name: '동행 신청하기' })
      await userEvent.click(applyButton)

      expect(screen.getByTestId('apply-modal')).toBeInTheDocument()
      expect(screen.getByText('동행 신청 모달')).toBeInTheDocument()
    })
    test('신청하기 버튼을 누르면 동행이 신청된다.', async () => {
      const mockApply = jest.fn()
      const { useApplyCompanion } = jest.requireMock('@/api/companions')

      useApplyCompanion.mockReturnValue({
        mutate: mockApply,
        isPending: false,
      })
      usePostDetail.mockReturnValue({
        data: {
          success: true,
          data: { ...mockPostDetail, isOwner: false },
        },
        isLoading: false,
      })
      renderPostDetail()

      const openModalButton = screen.getByRole('button', {
        name: '동행 신청하기',
      })
      await userEvent.click(openModalButton)

      const applyButton = screen.getByRole('button', { name: '신청하기' })
      await userEvent.click(applyButton)
      expect(mockApply).toHaveBeenCalled()
    })
  })
})
