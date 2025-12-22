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
  default: () => <div>게시글 관리</div>,
}))

jest.mock('../Detail/PostActions', () => ({
  __esModule: true,
  default: () => <button>동행 신청하기</button>,
}))

jest.mock('@/api/posts', () => ({
  usePostDetail: jest.fn(),
  useAddBookmark: jest.fn(),
  useRemoveBookmark: jest.fn(),
  useDeletePost: jest.fn(),
  usePatchPost: jest.fn(),
}))

jest.mock('@/api/companions', () => ({
  useApplyCompanion: () => ({
    mutate: jest.fn(),
  }),
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
  test('postId로 접근하면 게시글 상세가 렌더링 되는지 테스트', () => {
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
  test('잘못된 게시글로 접근하면 에러 메세지가 노출 되는지테스트', () => {
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
  test('북마크 버튼 클릭시 북마크가 추가 되는지 테스트', async () => {
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

  test('북마크 버튼 클릭시 북마크가 삭제 되는지 테스트', async () => {
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
  test('작성자일 경우 게시글 관리 섹션이 노출되는지 테스트', () => {
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
  test('작성자가 아닐 경우 동행신청 버튼이 노출되는지 테스트', () => {
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
})
