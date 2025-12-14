export const NICKNAME_REGEX =
  /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/

export const NICKNAME_MAX_LENGTH = 15

export const MBTI_LIST = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const
export type MBTI = (typeof MBTI_LIST)[number]

export const GENDER_LIST = ['male', 'female'] as const
export const GENDER_MAP: Record<Gender, string> = {
  male: '남자',
  female: '여자',
} as const
export type Gender = (typeof GENDER_LIST)[number]

export const LODGING_STYLE_OPTIONS = [
  '가성비',
  '호캉스',
  '감성중시',
  '청결중시',
  '교류/파티',
  '자연/이색',
] as const

export type LodgingStyle = (typeof LODGING_STYLE_OPTIONS)[number]

export const TRAVEL_STYLE_OPTIONS = [
  '계획',
  '힐링',
  '포토',
  '먹방',
  '액티비티',
  '관광',
] as const

export type TravelStyle = (typeof TRAVEL_STYLE_OPTIONS)[number]
