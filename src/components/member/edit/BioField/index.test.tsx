import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderMember } from '@/tests/utils/member'

import BioField from './index'

describe('BioField', () => {
  const renderBioField = (options = {}) => {
    return renderMember(<BioField />, options)
  }

  const getIntroductionTextarea = () => screen.getByLabelText('자기소개')
  const getCharacterCount = () => screen.getByText(/\/100/)

  describe('렌더링', () => {
    beforeEach(() => {
      renderBioField()
    })

    test('자기소개 textarea가 렌더링된다', () => {
      const textarea = getIntroductionTextarea()

      expect(textarea).toBeInTheDocument()
      expect(textarea.tagName).toBe('TEXTAREA')
      expect(textarea).toHaveAttribute('placeholder', '자기소개를 입력해주세요')
    })

    test('최대 길이가 100자로 설정되어 있다', () => {
      const textarea = getIntroductionTextarea()

      expect(textarea).toHaveAttribute('maxLength', '100')
    })

    test('초기 글자 수가 표시된다', () => {
      expect(getCharacterCount()).toHaveTextContent('0/100')
    })
  })

  describe('자기소개 입력', () => {
    test('자기소개를 입력할 수 있다', async () => {
      const user = userEvent.setup()
      renderBioField()

      const textarea = getIntroductionTextarea()
      await user.clear(textarea)
      await user.type(textarea, '안녕하세요. 여행을 좋아합니다.')

      expect(textarea).toHaveValue('안녕하세요. 여행을 좋아합니다.')
    })

    test('입력 시 글자 수가 업데이트된다', async () => {
      const user = userEvent.setup()
      renderBioField()

      const textarea = getIntroductionTextarea()
      await user.clear(textarea)
      await user.type(textarea, '안녕하세요')

      expect(getCharacterCount()).toHaveTextContent('5/100')
    })

    test('초기값이 표시된다', () => {
      renderBioField({
        defaultValues: { introduction: '기존 자기소개입니다.' },
      })

      const textarea = getIntroductionTextarea()
      expect(textarea).toHaveValue('기존 자기소개입니다.')
      expect(getCharacterCount()).toHaveTextContent('11/100')
    })
  })

  describe('글자 수 제한', () => {
    test('100자까지 입력할 수 있다', async () => {
      const user = userEvent.setup()
      renderBioField()

      const textarea = getIntroductionTextarea()
      const text100 = 'a'.repeat(100)

      await user.clear(textarea)
      await user.type(textarea, text100)

      expect(textarea).toHaveValue(text100)
      expect(getCharacterCount()).toHaveTextContent('100/100')
    })

    test('100자를 초과하여 입력할 수 없다', async () => {
      const user = userEvent.setup()
      renderBioField()

      const textarea = getIntroductionTextarea()
      const text101 = 'a'.repeat(101)

      await user.clear(textarea)
      await user.type(textarea, text101)

      const text100 = 'a'.repeat(100)
      expect(textarea).toHaveValue(text100)
      expect(getCharacterCount()).toHaveTextContent('100/100')
    })
  })
})
