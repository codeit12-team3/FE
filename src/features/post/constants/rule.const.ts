import { AgeType, GenderType } from '@/features/post/types'

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
export const NATION_CODE_TO_LABEL = {
  KR: '한국',
  JP: '일본',
  VN: '베트남',
  TH: '태국',
  CN: '중국',
  TW: '대만',
  PH: '필리핀',
  SG: '싱가포르',
  MY: '말레이시아',
  ID: '인도네시아',
} as const
export const NATION_LABEL_TO_CODE = {
  한국: 'KR',
  일본: 'JP',
  베트남: 'VN',
  태국: 'TH',
  중국: 'CN',
  대만: 'TW',
  필리핀: 'PH',
  싱가포르: 'SG',
  말레이시아: 'MY',
  인도네시아: 'ID',
} as const
export const NATION_ENUM_OPTIONS = [
  { value: 'KR', label: '한국' },
  { value: 'JP', label: '일본' },
  { value: 'VN', label: '베트남' },
  { value: 'TH', label: '태국' },
  { value: 'CN', label: '중국' },
  { value: 'TW', label: '대만' },
  { value: 'PH', label: '필리핀' },
  { value: 'SG', label: '싱가포르' },
  { value: 'MY', label: '말레이시아' },
  { value: 'ID', label: '인도네시아' },
] as const
export type NationCode = (typeof NATION_ENUM_OPTIONS)[number]['value']
export type NationLabel = (typeof NATION_ENUM_OPTIONS)[number]['label']

export const REGION_OPTIONS: Record<NationLabel, readonly string[]> = {
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
  { value: 'FORTY', label: '40대' },
  { value: 'FIFTY', label: '50대' },
] as const

export const GENDER_OPTIONS = [
  { value: 'ALL', label: '모두' },
  { value: 'MALE', label: '남성만' },
  { value: 'FEMALE', label: '여성만' },
] as const
export const AGE_ENUM_TO_LABEL: Record<AgeType, string> = {
  TWENTY: '20대',
  THIRTY: '30대',
  FORTY: '40대',
  FIFTY: '50대',
  ETC: '기타',
}
export const AGE_LABEL_TO_ENUM: Record<string, AgeType> = {
  '20대': AgeType.TWENTY,
  '30대': AgeType.THIRTY,
  '40대': AgeType.FORTY,
  '50대': AgeType.FIFTY,
}
export const GENDER_ENUM_TO_LABEL: Record<GenderType, string> = {
  MALE: '남성만',
  FEMALE: '여성만',
  ALL: '모두',
}
export const GENDER_LABEL_TO_ENUM: Record<string, GenderType> = {
  남성만: GenderType.MALE,
  여성만: GenderType.FEMALE,
  모두: GenderType.ALL,
}
