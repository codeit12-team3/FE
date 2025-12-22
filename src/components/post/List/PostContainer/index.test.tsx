import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

import PostContainer from '.'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))
jest.mock('@/hooks/posts/useInfinitePosts')

const { useInfinitePosts } = jest.requireMock('@/hooks/posts/useInfinitePosts')

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

const renderWithClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  )
}

describe('게시글 컨테이너 테스트', () => {
  const mockFilters = {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('에러 상태일 때 에러 메시지가 표시된다', () => {
    useInfinitePosts.mockReturnValue({
      data: null,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)
    expect(screen.getByText('에러가 발생했습니다.')).toBeInTheDocument()
  })
})
describe('필터링 테스트', () => {
  const mockPosts = {
    pages: [
      {
        success: true,
        data: {
          content: [
            {
              postId: 1,
              title: '일본 여행 동행 구합니다',
              nation: 'JP',
              region: '도쿄',
              period: {
                startDate: '2025-12-15',
                endDate: '2025-12-20',
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
            },
          ],
        },
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('국가 필터링이 적용된다', () => {
    const mockFilters: PostFilterParams = {
      nation: 'JP',
    }

    useInfinitePosts.mockReturnValue({
      data: mockPosts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(useInfinitePosts).toHaveBeenCalledWith(mockFilters)
  })

  test('날짜 필터링이 적용된다', () => {
    const mockFilters: PostFilterParams = {
      date: '2025-12-15',
    }

    useInfinitePosts.mockReturnValue({
      data: mockPosts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(useInfinitePosts).toHaveBeenCalledWith(mockFilters)
  })

  test('성별 필터링이 적용된다', () => {
    const mockFilters: PostFilterParams = {
      gender: GenderType.MALE,
    }

    useInfinitePosts.mockReturnValue({
      data: mockPosts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(useInfinitePosts).toHaveBeenCalledWith(mockFilters)
  })

  test('나이 필터링이 적용된다', () => {
    const mockFilters: PostFilterParams = {
      ageType: AgeType.TWENTY,
    }

    useInfinitePosts.mockReturnValue({
      data: mockPosts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(useInfinitePosts).toHaveBeenCalledWith(mockFilters)
  })

  test('여러 필터가 동시에 적용된다', () => {
    const mockFilters: PostFilterParams = {
      nation: 'JP',
      date: '2025-12-15',
      gender: GenderType.MALE,
      ageType: AgeType.TWENTY,
    }

    useInfinitePosts.mockReturnValue({
      data: mockPosts,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(useInfinitePosts).toHaveBeenCalledWith(mockFilters)
  })
})
