import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderMember } from '@/tests/utils/member'

import GenderField from './index'

describe('GenderField', () => {
  const renderGenderField = (options = {}) => {
    return renderMember(<GenderField />, options)
  }

  describe('렌더링', () => {
    test('성별 라벨과 라디오 버튼이 렌더링된다', () => {
      renderGenderField()

      expect(screen.getByText('성별')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
      expect(screen.getByLabelText('남성')).toBeInTheDocument()
      expect(screen.getByLabelText('여성')).toBeInTheDocument()
    })
  })

  describe('초기값 표시', () => {
    test('초기값이 MALE이면 남성 라디오가 선택된다', () => {
      renderGenderField({
        defaultValues: { gender: 'MALE' },
      })

      expect(screen.getByLabelText('남성')).toBeChecked()
      expect(screen.getByLabelText('여성')).not.toBeChecked()
    })

    test('초기값이 FEMALE이면 여성 라디오가 선택된다', () => {
      renderGenderField({
        defaultValues: { gender: 'FEMALE' },
      })

      expect(screen.getByLabelText('여성')).toBeChecked()
      expect(screen.getByLabelText('남성')).not.toBeChecked()
    })

    test('초기값이 없으면 아무것도 선택되지 않는다', () => {
      renderGenderField({
        defaultValues: { gender: '' },
      })

      expect(screen.getByLabelText('남성')).not.toBeChecked()
      expect(screen.getByLabelText('여성')).not.toBeChecked()
    })
  })

  describe('사용자 선택', () => {
    test('남성을 선택할 수 있다', async () => {
      const user = userEvent.setup()
      renderGenderField()

      const maleRadio = screen.getByLabelText('남성')
      await user.click(maleRadio)

      expect(maleRadio).toBeChecked()
    })

    test('여성을 선택할 수 있다', async () => {
      const user = userEvent.setup()
      renderGenderField()

      const femaleRadio = screen.getByLabelText('여성')
      await user.click(femaleRadio)

      expect(femaleRadio).toBeChecked()
    })

    test('선택 후 다시 다른 성별로 변경 가능하다', async () => {
      const user = userEvent.setup()
      renderGenderField({
        defaultValues: { gender: 'MALE' },
      })

      const femaleRadio = screen.getByLabelText('여성')
      await user.click(femaleRadio)

      expect(femaleRadio).toBeChecked()
      expect(screen.getByLabelText('남성')).not.toBeChecked()
    })
  })

  describe('접근성', () => {
    test('라디오 버튼과 라벨이 제대로 연결되어 있다', () => {
      renderGenderField()

      const maleLabel = screen.getByText('남성')
      const maleRadio = screen.getByLabelText('남성')
      expect(maleLabel).toHaveAttribute('for', 'gender-male')
      expect(maleRadio).toHaveAttribute('id', 'gender-male')

      const femaleLabel = screen.getByText('여성')
      const femaleRadio = screen.getByLabelText('여성')
      expect(femaleLabel).toHaveAttribute('for', 'gender-female')
      expect(femaleRadio).toHaveAttribute('id', 'gender-female')
    })
  })
})
