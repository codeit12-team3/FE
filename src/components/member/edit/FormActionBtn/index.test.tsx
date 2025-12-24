import { QueryClient } from '@tanstack/react-query'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { useUpdateMyProfile } from '@/api/member'
import { renderMember } from '@/tests/utils/member'
import { ProfileEditFormData } from '@/types/member/schema'

import FormActionBtn from './index'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@/api/member', () => ({
  useUpdateMyProfile: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(),
}))

const mockRouterBack = jest.fn()
const mockMutate = jest.fn()
const mockInvalidateQueries = jest.fn()

let testQueryClient: QueryClient

beforeEach(() => {
  jest.clearAllMocks()

  testQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  testQueryClient.invalidateQueries = mockInvalidateQueries
  ;(useRouter as jest.Mock).mockReturnValue({
    back: mockRouterBack,
  })
  ;(useUpdateMyProfile as jest.Mock).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
  })
  ;(useFormContext as jest.Mock).mockReturnValue({
    handleSubmit: jest.fn((callback) => () => callback({})),
    formState: {
      isDirty: false,
      isSubmitting: false,
    },
  })
})

describe('FormActionBtn 단위 테스트', () => {
  const renderFormActionBtn = (options = {}) => {
    return renderMember(<FormActionBtn />, {
      queryClient: testQueryClient,
      ...options,
    })
  }

  describe('렌더링', () => {
    test('취소와 수정하기 버튼이 렌더링된다', () => {
      renderFormActionBtn()

      expect(screen.getByText('취소')).toBeInTheDocument()
      expect(screen.getByText('수정하기')).toBeInTheDocument()
    })
  })

  describe('취소 버튼', () => {
    test('취소 버튼 클릭 시 router.back() 호출', async () => {
      const user = userEvent.setup()
      renderFormActionBtn()

      await user.click(screen.getByText('취소'))

      expect(mockRouterBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('수정하기 버튼 상태', () => {
    test('초기 상태에서 수정하기 버튼이 비활성화된다', () => {
      renderFormActionBtn({
        defaultValues: {
          nickname: '테스트유저',
        },
      })

      expect(screen.getByText('수정하기')).toBeDisabled()
    })

    test('로딩 중일 때 수정하기 버튼이 비활성화된다', () => {
      ;(useUpdateMyProfile as jest.Mock).mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      })

      renderFormActionBtn({
        defaultValues: {
          nickname: '테스트유저',
        },
      })

      expect(screen.getByText('수정하기')).toBeDisabled()
    })
  })

  describe('API 호출', () => {
    test('수정하기 버튼 클릭 시 handleSubmit이 호출된다', async () => {
      const user = userEvent.setup()
      const handleSubmitSpy = jest.fn()

      ;(useFormContext as jest.Mock).mockReturnValue({
        handleSubmit: (callback: (data: ProfileEditFormData) => void) =>
          handleSubmitSpy.mockImplementation(() => {
            callback({
              email: '123@123.com',
              image: '',
              nickname: '테스트유저',
              birth: '2000-01-01',
              gender: 'MALE',
              mbti: 'INFP',
              lodgingStyle: 'ALL',
              tripStyle: 'ALL',
              introduction: '',
            })
          }),
        formState: {
          isDirty: true,
          isSubmitting: false,
        },
      })

      renderFormActionBtn()

      await user.click(screen.getByText('수정하기'))

      expect(handleSubmitSpy).toHaveBeenCalled()
    })

    test('API 호출 시 올바른 payload가 전달된다', async () => {
      const user = userEvent.setup()

      ;(useFormContext as jest.Mock).mockReturnValue({
        handleSubmit: (callback: (data: ProfileEditFormData) => void) => () => {
          callback({
            email: 'test@123.com',
            image: 'https://example.com/image.jpg',
            nickname: '새닉네임',
            birth: '1990-05-15',
            gender: 'FEMALE',
            mbti: 'ENFP',
            lodgingStyle: 'HOTEL',
            tripStyle: 'CULTURE',
            introduction: '안녕하세요',
          })
        },
        formState: {
          isDirty: true,
          isSubmitting: false,
        },
      })

      renderFormActionBtn()

      await user.click(screen.getByText('수정하기'))

      expect(mockMutate).toHaveBeenCalledWith(
        {
          image: 'https://example.com/image.jpg',
          nickname: '새닉네임',
          birth: '1990-05-15',
          gender: 'FEMALE',
          mbti: 'ENFP',
          lodgingStyle: 'HOTEL',
          tripStyle: 'CULTURE',
          introduction: '안녕하세요',
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      )
    })
  })

  describe('API 성공/실패 처리', () => {
    test('API 성공 시 toast.success, 캐시 무효화, router.back() 호출', async () => {
      const user = userEvent.setup()

      ;(useFormContext as jest.Mock).mockReturnValue({
        handleSubmit: (callback: (data: ProfileEditFormData) => void) => () => {
          callback({
            email: 'test@example.com',
            image: '',
            nickname: '테스트유저',
            birth: '2000-01-01',
            gender: 'MALE',
            mbti: 'INFP',
            lodgingStyle: 'ALL',
            tripStyle: 'ALL',
            introduction: '',
          })
        },
        formState: {
          isDirty: true,
          isSubmitting: false,
        },
      })

      mockMutate.mockImplementation((payload, { onSuccess }) => {
        onSuccess()
      })

      renderFormActionBtn()

      await user.click(screen.getByText('수정하기'))

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('프로필이 저장되었습니다!')
        expect(mockInvalidateQueries).toHaveBeenCalledWith({
          queryKey: ['myProfile'],
        })
        expect(mockRouterBack).toHaveBeenCalled()
      })
    })

    test('API 실패 시 toast.error 호출', async () => {
      const user = userEvent.setup()
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      ;(useFormContext as jest.Mock).mockReturnValue({
        handleSubmit: (callback: (data: ProfileEditFormData) => void) => () => {
          callback({
            email: 'test@example.com',
            image: '',
            nickname: '테스트유저',
            birth: '2000-01-01',
            gender: 'MALE',
            mbti: 'INFP',
            lodgingStyle: 'ALL',
            tripStyle: 'ALL',
            introduction: '',
          })
        },
        formState: {
          isDirty: true,
          isSubmitting: false,
        },
      })

      const error = new Error('API 에러')
      mockMutate.mockImplementation((payload, { onError }) => {
        onError(error)
      })

      renderFormActionBtn()

      await user.click(screen.getByText('수정하기'))

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(error)
        expect(toast.error).toHaveBeenCalledWith('저장에 실패했습니다')
      })

      consoleErrorSpy.mockRestore()
    })
  })
})
