import { screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { renderMember } from '@/tests/utils/member'

import PreferenceInfo from './index'

interface SelectOption {
  value: string
  label: string
}
interface FormSelectProps {
  name: string
  placeholder?: string
  options?: SelectOption[]
  className?: string
}

jest.mock('@/components/form', () => ({
  FormSelect: ({ name, placeholder }: FormSelectProps) => {
    const { watch } = useFormContext()
    const value = watch(name)

    return (
      <div data-testid={`form-select-${name}`}>
        {value ? <span>{value}</span> : <span>{placeholder}</span>}
      </div>
    )
  },
}))

describe('PreferenceInfo', () => {
  const renderPreferenceInfo = (options = {}) => {
    return renderMember(<PreferenceInfo />, options)
  }

  describe('렌더링', () => {
    test('여행 스타일과 숙소 취향 필드가 렌더링된다', () => {
      renderPreferenceInfo({
        defaultValues: {
          tripStyle: '',
          lodgingStyle: '',
        },
      })

      expect(screen.getByText('여행 스타일')).toBeInTheDocument()
      expect(screen.getByText('숙소 취향')).toBeInTheDocument()
      expect(screen.getByText('여행 스타일을 선택해주세요')).toBeInTheDocument()
      expect(screen.getByText('숙소 취향을 선택해주세요')).toBeInTheDocument()
    })
  })

  describe('초기값 표시', () => {
    test('tripStyle 초기값이 표시된다', () => {
      renderPreferenceInfo({
        defaultValues: { lodgingStyle: '', tripStyle: 'ACTIVITY' },
      })

      expect(screen.getByText('ACTIVITY')).toBeInTheDocument()
      expect(screen.getByText('숙소 취향을 선택해주세요')).toBeInTheDocument()
    })

    test('lodgingStyle 초기값이 표시된다', () => {
      renderPreferenceInfo({
        defaultValues: { tripStyle: '', lodgingStyle: 'HOTEL' },
      })

      expect(screen.getByText('HOTEL')).toBeInTheDocument()
      expect(screen.getByText('여행 스타일을 선택해주세요')).toBeInTheDocument()
    })

    test('두 필드의 초기값이 함께 표시된다', () => {
      renderPreferenceInfo({
        defaultValues: {
          tripStyle: 'RELAX',
          lodgingStyle: 'RESORT',
        },
      })

      expect(screen.getByText('RELAX')).toBeInTheDocument()
      expect(screen.getByText('RESORT')).toBeInTheDocument()
    })

    test('초기값이 없으면 placeholder가 표시된다', () => {
      renderPreferenceInfo({
        defaultValues: {
          tripStyle: '',
          lodgingStyle: '',
        },
      })

      expect(screen.getByText('여행 스타일을 선택해주세요')).toBeInTheDocument()
      expect(screen.getByText('숙소 취향을 선택해주세요')).toBeInTheDocument()
    })
  })

  describe('폼 값 변경 반영', () => {
    test('폼 값 변경 시 여행 스타일 표시가 업데이트된다', () => {
      renderPreferenceInfo({
        defaultValues: { tripStyle: '' },
      })

      expect(screen.getByText('여행 스타일을 선택해주세요')).toBeInTheDocument()

      renderPreferenceInfo({
        defaultValues: { tripStyle: 'ADVENTURE' },
      })

      expect(screen.getByText('ADVENTURE')).toBeInTheDocument()
    })

    test('폼 값 변경 시 숙소 취향 표시가 업데이트된다', () => {
      renderPreferenceInfo({
        defaultValues: { lodgingStyle: '' },
      })

      expect(screen.getByText('숙소 취향을 선택해주세요')).toBeInTheDocument()

      renderPreferenceInfo({
        defaultValues: { lodgingStyle: 'GUESTHOUSE' },
      })

      expect(screen.getByText('GUESTHOUSE')).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    test('각 필드에 라벨이 존재한다', () => {
      renderPreferenceInfo()

      expect(screen.getByText('여행 스타일')).toBeInTheDocument()
      expect(screen.getByText('숙소 취향')).toBeInTheDocument()
    })
  })
})
