import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'

import { renderMember } from '@/tests/utils/member'

import BasicInfo from './index'

jest.mock('sonner')
const mockToast = toast as jest.Mocked<typeof toast>

jest.mock('@/api/member', () => ({
  useCheckNickname: () => ({
    mutate: jest.fn((nickname, { onSuccess, onError }) => {
      if (nickname === '에러') {
        onError({
          response: {
            data: {
              success: false,
              data: { message: '이미 사용 중인 닉네임입니다' },
            },
          },
        })
      } else {
        onSuccess(null)
      }
    }),
    isPending: false,
  }),
}))

describe('BasicInfo', () => {
  const renderBasicInfo = (options = {}) => {
    return renderMember(<BasicInfo />, options)
  }

  const getNicknameInput = () =>
    screen.getByRole('textbox', { name: /닉네임/i })
  const getDuplicateButton = () =>
    screen.getByRole('button', { name: /중복확인/i })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('렌더링', () => {
    beforeEach(() => {
      renderBasicInfo()
    })

    test('닉네임 입력 필드와 중복확인 버튼이 렌더링된다', () => {
      expect(getNicknameInput()).toBeInTheDocument()
      expect(getDuplicateButton()).toBeInTheDocument()
    })

    test('필수 표시(*)가 있다', () => {
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('닉네임 입력', () => {
    test('닉네임을 입력할 수 있다', async () => {
      const user = userEvent.setup()
      renderBasicInfo()

      const input = getNicknameInput()
      await user.clear(input)
      await user.type(input, '새로운닉네임')
      expect(input).toHaveValue('새로운닉네임')
    })

    test('초기 닉네임 값이 표시된다', () => {
      renderBasicInfo({
        defaultValues: { nickname: '기존닉네임' },
      })

      expect(getNicknameInput()).toHaveValue('기존닉네임')
    })
  })

  describe('중복확인 버튼 상태', () => {
    test('닉네임이 비어있으면 버튼이 비활성화된다', () => {
      renderBasicInfo({
        defaultValues: { nickname: '' },
      })

      expect(getDuplicateButton()).toBeDisabled()
    })

    test('닉네임이 있으면 버튼이 활성화된다', () => {
      renderBasicInfo({
        defaultValues: { nickname: '테스트닉네임' },
      })

      expect(getDuplicateButton()).not.toBeDisabled()
    })

    test('API 호출 후 버튼이 다시 활성화된다', async () => {
      const user = userEvent.setup()
      renderBasicInfo({
        defaultValues: { nickname: '테스트닉네임' },
      })

      const button = getDuplicateButton()
      await user.click(button)

      await waitFor(
        () => {
          expect(button).not.toBeDisabled()
        },
        { timeout: 100 },
      )
    })
  })

  describe('유효성 검증', () => {
    const validationCases = [
      {
        description: '2자 미만',
        value: 'a',
        expectedError: '닉네임은 2자 이상 입력해주세요',
      },
      {
        description: '이모지 포함',
        value: '닉네임😀',
        expectedError: '닉네임은 한/영, 숫자, 특수문자만 사용 가능합니다',
      },
      {
        description: '공백 포함',
        value: '닉 네 임',
        expectedError: '닉네임은 한/영, 숫자, 특수문자만 사용 가능합니다',
      },
    ]

    test.each(validationCases)(
      '$description - 에러 toast가 호출된다',
      async ({ value, expectedError }) => {
        const user = userEvent.setup()
        renderBasicInfo({
          defaultValues: { nickname: '' },
        })

        const input = getNicknameInput()
        await user.type(input, value)

        const button = getDuplicateButton()
        await user.click(button)

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(expectedError)
        })
      },
    )
  })

  describe('중복확인 API 호출', () => {
    test('사용 가능한 닉네임이면 성공 toast가 호출된다', async () => {
      const user = userEvent.setup()
      renderBasicInfo()

      const input = getNicknameInput()
      await user.clear(input)
      await user.type(input, '사용가능닉네임')

      const button = getDuplicateButton()
      await user.click(button)

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          '사용 가능한 닉네임입니다',
        )
      })
    })

    test('중복된 닉네임이면 에러 toast가 호출된다', async () => {
      const user = userEvent.setup()
      renderBasicInfo()

      const input = getNicknameInput()
      await user.clear(input)
      await user.type(input, '에러')

      const button = getDuplicateButton()
      await user.click(button)

      await waitFor(
        () => {
          expect(mockToast.error).toHaveBeenCalled()
        },
        { timeout: 100 },
      )
    })
  })
})
