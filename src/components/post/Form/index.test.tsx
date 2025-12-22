import { render, screen } from '@testing-library/react'

import { QueryProvider } from '@/providers'
import { GenderType } from '@/types/posts'

import PostForm from '.'

jest.mock('./Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}))

jest.mock('./ImageUpload', () => ({
  __esModule: true,
  default: () => <div>ImageUpload</div>,
}))

jest.mock('./Info', () => ({
  __esModule: true,
  default: () => <div>Info</div>,
}))

jest.mock('./Date', () => ({
  __esModule: true,
  default: () => <div>Date</div>,
}))

jest.mock('./Description', () => ({
  __esModule: true,
  default: () => <div>Description</div>,
}))

jest.mock('./FormAction', () => ({
  __esModule: true,
  default: () => <button>Submit</button>,
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))

jest.mock('@/api/posts', () => ({
  useCreatePost: jest.fn(() => ({ mutate: jest.fn(), isPending: false })),
  useUpdatePost: jest.fn(() => ({ mutate: jest.fn(), isPending: false })),
}))
describe('PostForm', () => {
  test('add 모드일 때 "게시글 작성" 제목이 보인다', () => {
    render(
      <QueryProvider>
        <PostForm mode="add" />
      </QueryProvider>,
    )
    expect(screen.getByText('게시글 작성')).toBeInTheDocument()
  })

  test('edit 모드일 때 "게시글 수정" 제목이 보인다', () => {
    const mockData = {
      title: '테스트',
      content: '내용',
      nation: 'JP' as const,
      region: '도쿄',
      stats: { maxMembers: 5, currentMembers: 3, viewCount: 0 },
      conditions: { ageCondition: '20대', genderCondition: '누구나' },
      period: { startDate: '2025-12-15', endDate: '2025-12-17' },
      tags: ['태그1', '태그2'],
      images: ['https://www.exmple.com.png'],
      recruitStatus: 'RECRUITING' as const,
      nickname: '테스트유저',
      isOwner: true,
      isBookmarked: false,
      bookmarkCount: 0,
      commentCount: 0,
      writer: {
        memberId: 1,
        profileImage: '',
        nickname: '테스트유저',
        birth: 1990,
        age: 30,
        gender: GenderType.MALE,
        mbti: 'INFP' as const,
      },
      thumbnail: [],
      createdAt: '2025-12-22T00:00:00Z',
      updatedAt: '2025-12-22T00:00:00Z',
      timestamp: '2025-12-22T00:00:00Z',
    }

    render(
      <QueryProvider>
        <PostForm mode="edit" initialData={mockData} postId="1" />
      </QueryProvider>,
    )
    expect(screen.getByText('게시글 수정')).toBeInTheDocument()
  })
})
