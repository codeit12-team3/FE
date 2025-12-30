import { useRouter } from 'next/navigation'

import {
  mockPostListItem,
  render,
  renderPost,
  screen,
} from '@/tests/utils/post'

import PostListSection from '.'
import PostListSkeleton from '../../Skeleton/PostListSkeleton'

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
}))

const mockPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  })
})

const mockPost = mockPostListItem

describe('PostListSection 테스트', () => {
  describe('빈 상태 렌더링 테스트', () => {
    test('게시글이 없을 때 "게시글이 없습니다" 메시지가 표시된다', () => {
      renderPost(<PostListSection posts={[]} />)

      expect(screen.getByText('게시글이 없습니다')).toBeInTheDocument()
    })
    test('빈 상태일때 안내 메세지가 표시된다', () => {
      renderPost(<PostListSection posts={[]} />)
      expect(
        screen.getByText('새로운 동행 게시글을 작성해보세요!'),
      ).toBeInTheDocument()
    })
  })
  describe('게시글이 존재할때 테스트', () => {
    test('게시글이 랜더링 된다', () => {
      renderPost(<PostListSection posts={[mockPost]} />)

      expect(
        screen.getByText('함께 일본 여행 가실 분 구합니다'),
      ).toBeInTheDocument()
    })
  })
  describe('게시글 리스트 렌더링 테스트', () => {
    test('여러 개의 게시글이 모두 화면에 표시된다', () => {
      const mockPost2 = {
        ...mockPost,
        postId: '2',
        title: '베트남 하노이 여행 동행 구합니다',
        nation: 'VN' as const,
        region: '하노이',
      }

      renderPost(<PostListSection posts={[mockPost, mockPost2]} />)

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
