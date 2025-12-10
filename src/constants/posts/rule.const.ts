export const REGION_OPTIONS = [
  '한국',
  '일본',
  '베트남',
  '태국',
  '중국',
  '대만',
  '필리핀',
  '싱가포르',
  '말레이시아',
  '인도네시아',
] as const

export const AGE_OPTIONS = Array.from({ length: 41 }, (_, i) => 20 + i)

export const GENDER_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'MALE', label: '남성만' },
  { value: 'FEMALE', label: '여성만' },
  { value: 'ALL', label: '무관' },
] as const

export const AGE_TYPE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'OLDER', label: '이상' },
  { value: 'YOUNGER', label: '이하' },
] as const
