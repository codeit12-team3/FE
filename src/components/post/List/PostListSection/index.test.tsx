import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import { PostListItem } from '@/types/posts'

import PostListSection from '.'
import PostListSkeleton from '../../Skeleton/PostListSkeleton'

jest.mock('@/api/posts/posts.mutations', () => ({
  useAddBookmark: () => ({
    mutateAsync: jest.fn(),
  }),
  useRemoveBookmark: () => ({
    mutateAsync: jest.fn(),
  }),
}))

jest.mock('@/lib/common', () => ({
  ...jest.requireActual('@/lib/common'),
  getImageUrl: jest.fn((url: string | null) => url || '/default-thumbnail.png'),
}))

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

const mockPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  })
})

const mockPost: PostListItem = {
  postId: 1,
  title: '함께 일본 여행 가실 분 구합니다',
  nation: 'JP',
  region: '도쿄',
  period: {
    startDate: '2024-05-01',
    endDate: '2024-05-07',
  },
  recruitStatus: 'RECRUITING',
  tags: ['맛집투어', '카페', '사진'],
  nickname: '여행러버',
  currentMembers: 3,
  maxMembers: 5,
  conditions: {
    ageType: '20대',
    genderCondition: '누구나',
  },
  isBookmarked: false,
  thumbnail: 'https://example.com/thumbnail.jpg',
}

describe('PostListSection', () => {
  describe('빈 상태 렌더링', () => {
    test('게시글이 없을 때 "게시글이 없습니다" 메시지가 표시된다', () => {
      render(<PostListSection posts={[]} />)

      expect(screen.getByText('게시글이 없습니다')).toBeInTheDocument()
    })
    test('빈 상태일때 안내 메세지가 표시된다', () => {
      render(<PostListSection posts={[]} />)
      expect(
        screen.getByText('새로운 동행 게시글을 작성해보세요!'),
      ).toBeInTheDocument()
    })
  })
  describe('게시글이 있을때', () => {
    test('게시글이 랜더링 된다', () => {
      const queryClient = createTestQueryClient()
      render(
        <QueryClientProvider client={queryClient}>
          <PostListSection posts={[mockPost]} />
        </QueryClientProvider>,
      )

      expect(
        screen.getByText('함께 일본 여행 가실 분 구합니다'),
      ).toBeInTheDocument()
    })
  })
  describe('게시글 리스트 렌더링 테스트', () => {
    test('여러 개의 게시글이 모두 화면에 표시된다', () => {
      const mockPost2: PostListItem = {
        ...mockPost,
        postId: 2,
        title: '베트남 하노이 여행 동행 구합니다',
        nation: 'VN',
        region: '하노이',
      }

      const queryClient = createTestQueryClient()
      render(
        <QueryClientProvider client={queryClient}>
          <PostListSection posts={[mockPost, mockPost2]} />
        </QueryClientProvider>,
      )

      expect(
        screen.getByText('함께 일본 여행 가실 분 구합니다'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('베트남 하노이 여행 동행 구합니다'),
      ).toBeInTheDocument()
    })
  })

  describe('로딩 상태 테스트', () => {
    test('데이터 요청중일때 스켈레톤 UI가 출력된다', () => {
      const { container } = render(<PostListSkeleton />)
      const skeletonCards = container.querySelectorAll('.bg-white.rounded-2xl')
      expect(skeletonCards).toHaveLength(3)
    })
  })
})
