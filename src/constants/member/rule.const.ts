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
export type Gender = (typeof GENDER_LIST)[number]
