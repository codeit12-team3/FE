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

export const GENDER_LIST = ['MALE', 'FEMALE'] as const
export const GENDER_MAP: Record<Gender, string> = {
  MALE: '남자',
  FEMALE: '여자',
} as const
export type Gender = (typeof GENDER_LIST)[number]

export const TRIP_STYLE_MAP = {
  ALL: '선택 안 함',
  PLANNING: '계획',
  HEALING: '힐링',
  PHOTOGRAPHY: '포토',
  GASTRONOMY: '먹방',
  ACTIVITY: '액티비티',
  SIGHTSEEING: '관광',
} as const

export const LODGING_STYLE_MAP = {
  ALL: '선택 안 함',
  BUDGET_FRIENDLY: '가성비',
  LUXURY_HOTEL: '호캉스',
  AESTHETIC: '감성중시',
  HYGIENE_FOCUSED: '청결중시',
  SOCIAL_GATHERING: '교류/파티',
  UNIQUE_NATURE: '자연/이색',
} as const

export const TRIP_STYLE_OPTIONS = [
  { value: 'ALL', label: '선택 안 함' },
  { value: 'PLANNING', label: '계획' },
  { value: 'HEALING', label: '힐링' },
  { value: 'PHOTOGRAPHY', label: '포토' },
  { value: 'GASTRONOMY', label: '먹방' },
  { value: 'ACTIVITY', label: '액티비티' },
  { value: 'SIGHTSEEING', label: '관광' },
] as const

export const LODGING_STYLE_OPTIONS = [
  { value: 'ALL', label: '선택 안 함' },
  { value: 'BUDGET_FRIENDLY', label: '가성비' },
  { value: 'LUXURY_HOTEL', label: '호캉스' },
  { value: 'AESTHETIC', label: '감성중시' },
  { value: 'HYGIENE_FOCUSED', label: '청결중시' },
  { value: 'SOCIAL_GATHERING', label: '교류/파티' },
  { value: 'UNIQUE_NATURE', label: '자연/이색' },
] as const

export type TripStyleValue = (typeof TRIP_STYLE_OPTIONS)[number]['value']

export type LodgingStyleValue = (typeof LODGING_STYLE_OPTIONS)[number]['value']
