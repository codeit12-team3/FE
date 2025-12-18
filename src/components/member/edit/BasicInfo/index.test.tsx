import { fireEvent, screen, waitFor } from '@testing-library/react'
import { toast } from 'sonner'

import { renderMember } from '@/tests/utils/member'

import BasicInfo from './index'

jest.mock('sonner')
const mockToast = toast as jest.Mocked<typeof toast>

describe('BasicInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('렌더링', () => {
    test('닉네임 label이 렌더링된다', () => {
      renderMember(<BasicInfo />)
      expect(screen.getByText('닉네임')).toBeInTheDocument()
    })

    test('닉네임 입력 필드가 렌더링된다', () => {
      renderMember(<BasicInfo />)
      expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument()
    })

    test('중복확인 버튼이 렌더링된다', () => {
      renderMember(<BasicInfo />)
      expect(
        screen.getByRole('button', { name: /중복확인/i }),
      ).toBeInTheDocument()
    })

    test('필수 표시(*)가 있다', () => {
      renderMember(<BasicInfo />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('닉네임 입력', () => {
    test('닉네임을 입력할 수 있다', () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '새로운닉네임' } })

      expect(input).toHaveValue('새로운닉네임')
    })

    test('초기 닉네임 값이 표시된다', () => {
      renderMember(<BasicInfo />, {
        defaultValues: { nickname: '기존닉네임' },
      })

      expect(screen.getByDisplayValue('기존닉네임')).toBeInTheDocument()
    })
  })

  describe('중복확인 - 성공', () => {
    test('사용 가능한 닉네임이면 API가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '사용가능닉네임' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(
        () => {
          expect(button).not.toBeDisabled()
        },
        { timeout: 3000 },
      )

      expect(
        mockToast.success.mock.calls.length + mockToast.error.mock.calls.length,
      ).toBeGreaterThan(0)
    })
  })

  describe('중복확인 - 실패', () => {
    test('중복된 닉네임이면 에러 toast가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '에러' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(
        () => {
          expect(mockToast.error).toHaveBeenCalled()
        },
        { timeout: 3000 },
      )
    })
  })

  describe('유효성 검증', () => {
    test('닉네임이 2자 미만이면 에러 toast가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: 'a' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          '닉네임은 2자 이상 입력해주세요',
        )
      })
    })

    test('특수문자가 있으면 에러 toast가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '닉네임!' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          '한글, 영문, 숫자만 사용 가능합니다',
        )
      })
    })

    test('이모지가 있으면 에러 toast가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '닉네임😀' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          '한글, 영문, 숫자만 사용 가능합니다',
        )
      })
    })

    test('공백이 있으면 에러 toast가 호출된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '닉 네 임' } })

      const button = screen.getByRole('button', { name: /중복확인/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          '한글, 영문, 숫자만 사용 가능합니다',
        )
      })
    })
  })

  describe('버튼 상태', () => {
    test('닉네임이 비어있으면 중복확인 버튼이 비활성화된다', () => {
      renderMember(<BasicInfo />, {
        defaultValues: { nickname: '' },
      })

      const button = screen.getByRole('button', { name: /중복확인/i })
      expect(button).toBeDisabled()
    })

    test('닉네임이 있으면 중복확인 버튼이 활성화된다', () => {
      renderMember(<BasicInfo />, {
        defaultValues: { nickname: '테스트닉네임' },
      })

      const button = screen.getByRole('button', { name: /중복확인/i })
      expect(button).not.toBeDisabled()
    })

    test('API 호출 후 버튼이 다시 활성화된다', async () => {
      renderMember(<BasicInfo />)

      const input = screen.getByPlaceholderText('닉네임')
      fireEvent.change(input, { target: { value: '새닉네임' } })

      const button = screen.getByRole('button', { name: /중복확인/i })

      expect(button).not.toBeDisabled()

      fireEvent.click(button)

      await waitFor(
        () => {
          expect(button).not.toBeDisabled()
        },
        { timeout: 3000 },
      )
    })
  })
})
