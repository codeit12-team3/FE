export const NATION_OPTIONS = [
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
export type Nation = Exclude<(typeof NATION_OPTIONS)[number], '모두'>
export const REGION_OPTIONS: Record<Nation, readonly string[]> = {
  한국: ['서울', '부산', '제주'],
  일본: ['도쿄', '오사카', '교토'],
  베트남: ['하노이', '호치민', '다낭'],
  태국: ['방콕', '치앙마이', '푸켓'],
  중국: ['베이징', '상하이', '홍콩'],
  대만: ['타이베이', '타이중', '가오슝'],
  필리핀: ['마닐라', '세부', '보라카이'],
  싱가포르: ['싱가포르'],
  말레이시아: ['쿠알라룸푸르', '페낭', '코타키나발루'],
  인도네시아: ['자카르타', '발리', '족자카르타'],
} as const

export const AGE_OPTIONS = [
  { value: 'TWENTY', label: '20대' },
  { value: 'THIRTY', label: '30대' },
  { value: 'FOURTY', label: '40대' },
  { value: 'FIFTY', label: '50대' },
  { value: 'ETC', label: '모두' },
] as const

export const GENDER_OPTIONS = [
  { value: 'MALE', label: '남성만' },
  { value: 'FEMALE', label: '여성만' },
  { value: 'ALL', label: '모두' },
] as const
