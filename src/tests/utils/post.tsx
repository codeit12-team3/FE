import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

import { GenderType, PostContent, PostListItem } from '@/types/posts'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

export const mockPostDetail: PostContent = {
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
  isApplied: false,
}

export const mockPostFormData: PostContent = {
  title: '함께 일본 여행 가실 분 구합니다',
  content: '12월에 도쿄에서 맛집 투어와 사진 촬영 같이 하실 분 구해요!',
  nation: 'JP' as const,
  region: '도쿄',
  stats: { maxMembers: 5, currentMembers: 3, viewCount: 0 },
  conditions: { ageCondition: '20대', genderCondition: '모두' },
  period: { startDate: '2025-12-15', endDate: '2025-12-17' },
  tags: ['태그1', '태그2'],
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  recruitStatus: 'RECRUITING' as const,
  nickname: '여행러버',
  isOwner: true,
  isBookmarked: false,
  bookmarkCount: 0,
  commentCount: 0,
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
  createdAt: '2025-12-22T00:00:00Z',
  updatedAt: '2025-12-22T00:00:00Z',
  timestamp: '2025-12-22T00:00:00Z',
  isApplied: false,
}

export const mockPostListItem: PostListItem = {
  postId: '1',
  title: '함께 일본 여행 가실 분 구합니다',
  nation: 'JP',
  region: '도쿄',
  period: {
    startDate: '2025-12-15',
    endDate: '2025-12-17',
  },
  recruitStatus: 'RECRUITING',
  tags: ['맛집투어', '카페', '사진'],
  nickname: '여행러버',
  currentMembers: 3,
  maxMembers: 5,
  conditions: {
    ageType: '20대',
    genderCondition: '모두',
  },
  isBookmarked: false,
  thumbnail: 'https://example.com/thumbnail.jpg',
  isOwner: false,
  isApplied: false,
}

interface PostTestWrapperProps {
  children: ReactNode
  queryClient?: QueryClient
}

function PostTestWrapper({ children, queryClient }: PostTestWrapperProps) {
  const client = queryClient ?? createTestQueryClient()

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

interface PostRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

export function renderPost(
  ui: ReactElement,
  { queryClient, ...options }: PostRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <PostTestWrapper queryClient={queryClient}>{children}</PostTestWrapper>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
