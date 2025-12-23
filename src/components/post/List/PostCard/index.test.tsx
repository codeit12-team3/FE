import { useRouter } from 'next/navigation'

import {
  mockPostListItem,
  render,
  renderPost,
  screen,
} from '@/tests/utils/post'

import PostCardSkeleton from '../../Skeleton/PostCardSkeleton'
import PostCard from './index'

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

describe('PostCard - 주요 정보 렌더링 테스트', () => {
  const renderPostCard = (post = mockPost) => {
    return renderPost(<PostCard post={post} />)
  }

  describe('게시글 제목 렌더링 테스트', () => {
    test('게시글 제목이 화면에 표시된다', () => {
      renderPostCard()

      expect(
        screen.getByText('함께 일본 여행 가실 분 구합니다'),
      ).toBeInTheDocument()
    })

    test('제목은 h3 태그로 렌더링된다', () => {
      renderPostCard()

      const title = screen.getByText('함께 일본 여행 가실 분 구합니다')
      expect(title.tagName).toBe('H3')
    })
  })

  describe('작성자 정보 렌더링 테스트', () => {
    test('작성자 닉네임이 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('여행러버')).toBeInTheDocument()
    })

    test('작성자 라벨이 함께 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('작성자')).toBeInTheDocument()
    })
  })

  describe('날짜 정보 렌더링 테스트', () => {
    test('여행 시작 날짜가 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText(/12월/)).toBeInTheDocument()
      expect(screen.getByText(/15일/)).toBeInTheDocument()
    })

    test('날짜가 한국어 형식으로 표시된다', () => {
      renderPostCard()

      const dateElement = screen.getByText(/12월/)
      expect(dateElement).toBeInTheDocument()
    })
  })

  describe('위치 정보 렌더링 테스트', () => {
    test('국가 정보가 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('일본')).toBeInTheDocument()
    })

    test('지역 정보가 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('도쿄')).toBeInTheDocument()
    })

    test('위치 라벨이 함께 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('위치')).toBeInTheDocument()
    })
  })

  describe('모집 조건 렌더링 테스트', () => {
    test('나이 조건이 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('20대')).toBeInTheDocument()
    })

    test('성별 조건이 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('모두')).toBeInTheDocument()
    })

    test('나이 라벨이 함께 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('나이')).toBeInTheDocument()
    })

    test('성별 라벨이 함께 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('성별')).toBeInTheDocument()
    })
  })

  describe('태그 정보 렌더링 테스트', () => {
    test('모든 태그가 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('맛집투어')).toBeInTheDocument()
      expect(screen.getByText('카페')).toBeInTheDocument()
      expect(screen.getByText('사진')).toBeInTheDocument()
    })

    test('태그가 여러 개일 때 모두 렌더링된다', () => {
      const postWithManyTags = {
        ...mockPost,
        tags: ['태그1', '태그2', '태그3', '태그4'],
      }
      renderPostCard(postWithManyTags)

      expect(screen.getByText('태그1')).toBeInTheDocument()
      expect(screen.getByText('태그2')).toBeInTheDocument()
      expect(screen.getByText('태그3')).toBeInTheDocument()
      expect(screen.getByText('태그4')).toBeInTheDocument()
    })
  })

  describe('신청 인원 정보 렌더링 테스트', () => {
    test('현재 신청 인원이 화면에 표시된다', () => {
      renderPostCard()

      expect(screen.getByText('3명 신청')).toBeInTheDocument()
    })

    test('신청 인원이 변경되면 올바르게 표시된다', () => {
      const postWithDifferentMembers = {
        ...mockPost,
        currentMembers: 10,
      }
      renderPostCard(postWithDifferentMembers)

      expect(screen.getByText('10명 신청')).toBeInTheDocument()
    })
  })

  describe('썸네일 이미지 렌더링 테스트', () => {
    test('썸네일 이미지가 화면에 표시된다', () => {
      renderPostCard()

      const image = screen.getByAltText('함께 일본 여행 가실 분 구합니다')
      expect(image).toBeInTheDocument()
    })

    test('썸네일 이미지에 올바른 src가 설정된다', () => {
      renderPostCard()

      const image = screen.getByAltText(
        '함께 일본 여행 가실 분 구합니다',
      ) as HTMLImageElement
      expect(image.src).toContain('thumbnail.jpg')
    })
  })

  describe('다양한 데이터로 렌더링 테스트', () => {
    test('다른 국가 정보도 올바르게 표시된다', () => {
      const postWithKorea = {
        ...mockPost,
        nation: 'KR' as const,
        region: '서울',
      }
      renderPostCard(postWithKorea)

      expect(screen.getByText('한국')).toBeInTheDocument()
      expect(screen.getByText('서울')).toBeInTheDocument()
    })

    test('긴 제목도 올바르게 표시된다', () => {
      const postWithLongTitle = {
        ...mockPost,
        title:
          '이것은 매우 긴 제목입니다. 이것은 매우 긴 제목입니다. 테스트용입니다.',
      }
      renderPostCard(postWithLongTitle)

      expect(
        screen.getByText(
          '이것은 매우 긴 제목입니다. 이것은 매우 긴 제목입니다. 테스트용입니다.',
        ),
      ).toBeInTheDocument()
    })
  })
})

describe('클릭 시 이동 테스트', () => {
  const renderPostCard = (post = mockPost) => {
    return renderPost(<PostCard post={post} />)
  }

  test('제목 클릭 시 상세 페이지로 이동한다', () => {
    renderPostCard()

    const title = screen.getByText('함께 일본 여행 가실 분 구합니다')
    title.click()

    expect(mockPush).toHaveBeenCalledWith('/posts/1')
  })

  test('다른 게시글의 제목 클릭 시 해당 게시글 상세 페이지로 이동한다', () => {
    const differentPost = {
      ...mockPost,
      postId: 42,
      title: '새로운 여행 게시글',
    }
    renderPostCard(differentPost)

    const title = screen.getByText('새로운 여행 게시글')
    title.click()

    expect(mockPush).toHaveBeenCalledWith('/posts/42')
  })
})

describe('로딩 상태 테스트', () => {
  test('데이터 요청 중일때 스켈레톤 UI가 출력된다', () => {
    const { container } = render(<PostCardSkeleton />)
    const skeleton = container.querySelector('.bg-white.rounded-2xl')
    expect(skeleton).toBeInTheDocument()
  })
})
