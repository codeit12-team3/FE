import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderMember } from '@/tests/utils/member'

import EmailField from './index'

describe('EmailField', () => {
  const renderEmailField = (options = {}) => {
    return renderMember(<EmailField />, options)
  }

  const getEmailInput = () => screen.getByLabelText('이메일')

  describe('렌더링 및 기본 속성', () => {
    beforeEach(() => {
      renderEmailField()
    })

    test('이메일 입력 필드가 올바른 타입과 비활성화 상태로 렌더링된다', () => {
      const input = getEmailInput()

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'email')
      expect(input).toBeDisabled()
    })
  })

  describe('값 표시', () => {
    test('테스트 환경의 기본 이메일이 표시된다', () => {
      renderEmailField()
      expect(getEmailInput()).toHaveValue('test@example.com')
    })

    test('빈 문자열을 명시적으로 설정할 수 있다', () => {
      renderEmailField({
        defaultValues: { email: '' },
      })
      expect(getEmailInput()).toHaveValue('')
    })

    test('제공된 이메일 주소가 표시된다', () => {
      renderEmailField({
        defaultValues: { email: 'user@example.com' },
      })
      expect(getEmailInput()).toHaveValue('user@example.com')
    })
  })

  describe('사용자 상호작용', () => {
    test('비활성화 상태에서 입력이 불가능하다', async () => {
      const user = userEvent.setup()
      renderEmailField({
        defaultValues: { email: 'user@example.com' },
      })

      const input = getEmailInput()
      await user.type(input, 'test')

      expect(input).toHaveValue('user@example.com')
    })
  })
})
