import { screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { renderMember } from '@/tests/utils/member'

import BirthdayAndMbti from './index'

jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: ({
    selected,
    placeholderText,
  }: {
    selected?: Date | null
    placeholderText?: string
  }) => {
    const formatDate = (date: Date | null | undefined): string => {
      if (!date) return ''
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    return (
      <input
        type="text"
        value={formatDate(selected)}
        placeholder={placeholderText}
        readOnly
      />
    )
  },
}))

interface FormSelectProps {
  name: string
  placeholder?: string
}

jest.mock('@/components/form', () => ({
  FormSelect: ({ name, placeholder }: FormSelectProps) => {
    const { watch } = useFormContext()
    const value = watch(name)

    return (
      <div data-testid={`form-select-${name}`}>
        {value && value !== 'NONE' ? (
          <span>{value}</span>
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
    )
  },
}))

describe('BirthdayAndMbti', () => {
  const renderBirthdayAndMbti = (options = {}) => {
    return renderMember(<BirthdayAndMbti />, options)
  }

  describe('렌더링', () => {
    test('생년월일과 MBTI 필드가 렌더링된다', () => {
      renderBirthdayAndMbti({
        defaultValues: {
          birth: '',
          mbti: 'NONE',
        },
      })

      expect(screen.getByText('생년월일')).toBeInTheDocument()
      expect(screen.getByText('MBTI')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('생년월일을 선택해주세요'),
      ).toBeInTheDocument()
      expect(screen.getByText('MBTI를 선택해주세요')).toBeInTheDocument()
    })
  })

  describe('초기값 표시', () => {
    test('생년월일 초기값이 표시된다', () => {
      renderBirthdayAndMbti({
        defaultValues: { birth: '1990-01-01' },
      })

      const input = screen.getByPlaceholderText('생년월일을 선택해주세요')
      expect(input).toHaveValue('1990-01-01')
    })

    test('MBTI 초기값이 표시된다', () => {
      renderBirthdayAndMbti({
        defaultValues: { mbti: 'INFP' },
      })

      expect(screen.getByText('INFP')).toBeInTheDocument()
    })

    test('생년월일과 MBTI 초기값이 함께 표시된다', () => {
      renderBirthdayAndMbti({
        defaultValues: {
          birth: '1995-05-15',
          mbti: 'ENFJ',
        },
      })

      const input = screen.getByPlaceholderText('생년월일을 선택해주세요')
      expect(input).toHaveValue('1995-05-15')
      expect(screen.getByText('ENFJ')).toBeInTheDocument()
    })

    test('초기값이 없으면 placeholder가 표시된다', () => {
      renderBirthdayAndMbti({
        defaultValues: {
          birth: '',
          mbti: 'NONE',
        },
      })

      expect(
        screen.getByPlaceholderText('생년월일을 선택해주세요'),
      ).toHaveValue('')
      expect(screen.getByText('MBTI를 선택해주세요')).toBeInTheDocument()
    })
  })
})
