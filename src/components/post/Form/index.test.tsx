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
  default: ({ mode }: { mode: 'add' | 'edit' }) => (
    <button type="submit">{mode === 'add' ? '등록하기' : '수정하기'}</button>
  ),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form')
  return {
    ...actual,
    useForm: jest.fn(() => ({
      ...actual.useForm(),
      handleSubmit:
        (fn: (data: Record<string, unknown>) => void) =>
        (e: React.FormEvent) => {
          e?.preventDefault()
          fn({
            title: '테스트 제목',
            content: '테스트 내용',
            nation: '일본',
            region: '도쿄',
            maxMembers: 5,
            ageType: '20대',
            gender: '모두',
            startDate: '2025-12-15',
            endDate: '2025-12-17',
            tags: ['태그1'],
            images: [],
            tag: '',
          })
        },
      formState: { isValid: true, errors: {} },
      register: jest.fn(),
      control: {},
      watch: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
    })),
  }
})

const mockCreateMutate = jest.fn()
const mockUpdateMutate = jest.fn()

jest.mock('@/api/posts', () => ({
  useCreatePost: jest.fn(() => ({
    mutate: mockCreateMutate,
    isPending: false,
  })),
  useUpdatePost: jest.fn(() => ({
    mutate: mockUpdateMutate,
    isPending: false,
  })),
}))

describe('PostForm 작성, 수정 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('작성 모드일 때', () => {
    beforeEach(() => {
      renderPost(<PostForm mode="add" />)
    })

    test('"게시글 작성" 제목이 보인다', () => {
      expect(screen.getByText('게시글 작성')).toBeInTheDocument()
    })

    test('등록하기 버튼이 보인다', () => {
      expect(screen.getByText('등록하기')).toBeInTheDocument()
    })

    test('폼 제출 시 useCreatePost의 mutate가 호출된다', () => {
      const submitButton = screen.getByText('등록하기')
      submitButton.click()
      expect(mockCreateMutate).toHaveBeenCalled()
    })

    test('initialData 값이 빈 값으로 초기화된다', () => {
      const { useForm } = jest.requireMock('react-hook-form')

      expect(useForm).toHaveBeenCalled()
      const callArgs = useForm.mock.calls[useForm.mock.calls.length - 1][0]
      expect(callArgs.defaultValues).toEqual({
        title: '',
        content: '',
        nation: undefined,
        region: '',
        maxMembers: 0,
        ageType: undefined,
        gender: undefined,
        startDate: '',
        endDate: '',
        tags: [],
        images: [],
        tag: '',
      })
    })
  })

  describe('수정 모드일 때', () => {
    beforeEach(() => {
      renderPost(
        <PostForm mode="edit" initialData={mockPostFormData} postId="1" />,
      )
    })

    test('"게시글 수정" 제목이 보인다', () => {
      expect(screen.getByText('게시글 수정')).toBeInTheDocument()
    })

    test('수정하기 버튼이 보인다', () => {
      expect(screen.getByText('수정하기')).toBeInTheDocument()
    })

    test('폼 제출 시 useUpdatePost의 mutate가 호출된다', () => {
      const submitButton = screen.getByText('수정하기')
      submitButton.click()
      expect(mockUpdateMutate).toHaveBeenCalled()
    })

    test('initialData 값이 올바르게 폼에 설정된다', () => {
      const { useForm } = jest.requireMock('react-hook-form')
      expect(useForm).toHaveBeenCalled()
      const callArgs = useForm.mock.calls[useForm.mock.calls.length - 1][0]
      expect(callArgs.defaultValues).toEqual({
        title: mockPostFormData.title,
        content: mockPostFormData.content,
        nation: '일본',
        region: mockPostFormData.region,
        maxMembers: mockPostFormData.stats.maxMembers,
        ageType: 'TWENTY',
        gender: 'ALL',
        startDate: mockPostFormData.period.startDate,
        endDate: mockPostFormData.period.endDate,
        tags: mockPostFormData.tags,
        images: mockPostFormData.images,
        tag: '',
      })
    })
  })
})
