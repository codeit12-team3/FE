import { mockPostFormData, renderPost, screen } from '@/tests/utils/post'

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
describe('PostForm 작성, 수정 테스트', () => {
  test('add 모드일 때 "게시글 작성" 제목이 보인다', () => {
    renderPost(<PostForm mode="add" />)
    expect(screen.getByText('게시글 작성')).toBeInTheDocument()
  })

  test('edit 모드일 때 "게시글 수정" 제목이 보인다', () => {
    renderPost(
      <PostForm mode="edit" initialData={mockPostFormData} postId="1" />,
    )
    expect(screen.getByText('게시글 수정')).toBeInTheDocument()
  })
})
