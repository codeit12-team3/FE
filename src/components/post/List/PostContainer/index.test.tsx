import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

import PostContainer from '.'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))
jest.mock('@/hooks/posts/useInfinitePosts')

jest.mock('@/api/posts/posts.mutations', () => ({
  useAddBookmark: () => ({
    mutateAsync: jest.fn(),
  }),
  useRemoveBookmark: () => ({
    mutateAsync: jest.fn(),
  }),
  useDeletePost: () => ({
    mutate: jest.fn(),
  }),
}))

jest.mock('@/api/companions', () => ({
  useApplyCompanion: () => ({
    mutate: jest.fn(),
  }),
}))

jest.mock('@/lib/common', () => ({
  ...jest.requireActual('@/lib/common'),
  getImageUrl: jest.fn((url: string | null) => url || '/default-thumbnail.png'),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

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

  test('게시글이 없을 때 "게시글이 없습니다" 메시지가 표시된다', () => {
    useInfinitePosts.mockReturnValue({
      data: { pages: [{ success: true, data: { content: [] } }] },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)
    expect(screen.getByText('게시글이 없습니다')).toBeInTheDocument()
    expect(
      screen.getByText('새로운 동행 게시글을 작성해보세요!'),
    ).toBeInTheDocument()
  })

  test('게시글이 렌더링된다', () => {
    const mockPost = {
      postId: '1',
      title: '함께 일본 여행 가실 분 구합니다',
      nation: 'JP' as const,
      region: '도쿄',
      period: { startDate: '2025-12-15', endDate: '2025-12-20' },
      recruitStatus: 'RECRUITING' as const,
      tags: ['맛집투어'],
      nickname: '여행러버',
      currentMembers: 3,
      maxMembers: 5,
      conditions: { ageType: '20대', genderCondition: '누구나' },
      isOwner: false,
      isBookmarked: false,
      isApplied: false,
      thumbnail: 'https://example.com/thumbnail.jpg',
    }

    useInfinitePosts.mockReturnValue({
      data: { pages: [{ success: true, data: { content: [mockPost] } }] },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)
    expect(
      screen.getByText('함께 일본 여행 가실 분 구합니다'),
    ).toBeInTheDocument()
  })

  test('여러 개의 게시글이 모두 화면에 표시된다', () => {
    const mockPost1 = {
      postId: '1',
      title: '함께 일본 여행 가실 분 구합니다',
      nation: 'JP' as const,
      region: '도쿄',
      period: { startDate: '2025-12-15', endDate: '2025-12-20' },
      recruitStatus: 'RECRUITING' as const,
      tags: ['맛집투어'],
      nickname: '여행러버',
      currentMembers: 3,
      maxMembers: 5,
      conditions: { ageType: '20대', genderCondition: '누구나' },
      isOwner: false,
      isBookmarked: false,
      isApplied: false,
      thumbnail: 'https://example.com/thumbnail.jpg',
    }

    const mockPost2 = {
      ...mockPost1,
      postId: '2',
      title: '베트남 하노이 여행 동행 구합니다',
      nation: 'VN' as const,
      region: '하노이',
    }

    useInfinitePosts.mockReturnValue({
      data: {
        pages: [{ success: true, data: { content: [mockPost1, mockPost2] } }],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={mockFilters} />)

    expect(
      screen.getByText('함께 일본 여행 가실 분 구합니다'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('베트남 하노이 여행 동행 구합니다'),
    ).toBeInTheDocument()
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

describe('무한 스크롤 테스트', () => {
  let mockObserve: jest.Mock
  let mockUnobserve: jest.Mock
  let mockDisconnect: jest.Mock
  let intersectionCallback: IntersectionObserverCallback

  beforeEach(() => {
    mockObserve = jest.fn()
    mockUnobserve = jest.fn()
    mockDisconnect = jest.fn()

    global.IntersectionObserver = jest.fn((callback) => {
      intersectionCallback = callback
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        takeRecords: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as unknown as typeof IntersectionObserver
  })

  test('다음 페이지가 있을 때 IntersectionObserver가 설정된다', () => {
    const mockFetchNextPage = jest.fn()

    useInfinitePosts.mockReturnValue({
      data: {
        pages: [],
      },
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={{}} />)

    // observer가 호출되었는지 확인
    expect(mockObserve).toHaveBeenCalled()
  })

  test('observer 영역이 화면에 보이면 fetchNextPage가 호출된다', () => {
    const mockFetchNextPage = jest.fn()

    useInfinitePosts.mockReturnValue({
      data: {
        pages: [
          /* 데이터 */
        ],
      },
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={{}} />)

    intersectionCallback(
      [
        {
          isIntersecting: true,
          target: document.createElement('div'),
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 1,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    )

    expect(mockFetchNextPage).toHaveBeenCalled()
  })

  test('hasNextPage가 false면 observer 영역이 렌더링되지 않는다', () => {
    useInfinitePosts.mockReturnValue({
      data: {
        pages: [
          /* 데이터 */
        ],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false, // 더 이상 페이지 없음
      isFetchingNextPage: false,
    })

    renderWithClient(<PostContainer filters={{}} />)

    expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument()
  })

  test('다음 페이지를 로딩 중일 때 "로딩 중..." 텍스트가 표시된다', () => {
    useInfinitePosts.mockReturnValue({
      data: {
        pages: [
          /* 데이터 */
        ],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: true, // 로딩 중
    })

    renderWithClient(<PostContainer filters={{}} />)

    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
  })
})
