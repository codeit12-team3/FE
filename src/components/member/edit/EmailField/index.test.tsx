import { screen } from '@testing-library/react'

import { renderMember } from '@/tests/utils/member'

import EmailField from './index'

describe('EmailField', () => {
  describe('렌더링', () => {
    test('이메일 label이 렌더링된다', () => {
      renderMember(<EmailField />)

      expect(screen.getByText('이메일')).toBeInTheDocument()
    })

    test('이메일 input 필드가 렌더링된다', () => {
      renderMember(<EmailField />)

      const input = screen.getByRole('textbox', { name: /이메일/i })
      expect(input).toBeInTheDocument()
    })
  })

  describe('비활성화 상태', () => {
    test('이메일 입력 필드는 비활성화되어 있다', () => {
      renderMember(<EmailField />)

      const input = screen.getByRole('textbox', { name: /이메일/i })
      expect(input).toBeDisabled()
    })
  })

  describe('초기값 표시', () => {
    test('사용자의 이메일이 표시된다', () => {
      renderMember(<EmailField />, {
        defaultValues: { email: 'user@example.com' },
      })

      const input = screen.getByDisplayValue('user@example.com')
      expect(input).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    test('input에 올바른 type 속성이 설정되어 있다', () => {
      renderMember(<EmailField />)

      const input = screen.getByRole('textbox', { name: /이메일/i })
      expect(input).toHaveAttribute('type', 'text')
    })
  })
})
