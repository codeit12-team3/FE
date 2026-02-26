import { AgeType, GenderType } from '@/types/posts'

const AGE_LABEL_TO_ENUM: Record<string, AgeType> = {
  '20대': AgeType.TWENTY,
  '30대': AgeType.THIRTY,
  '40대': AgeType.FORTY,
  '50대': AgeType.FIFTY,
  '기타': AgeType.ETC,
}

const GENDER_LABEL_TO_ENUM: Record<string, GenderType> = {
  모두: GenderType.ALL,
  남성만: GenderType.MALE,
  여성만: GenderType.FEMALE,
}

export function getAgeTypeFromBirth(birth: string): AgeType {
  const birthYear = parseInt(birth.split('-')[0])
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age >= 20 && age < 30) return AgeType.TWENTY
  if (age >= 30 && age < 40) return AgeType.THIRTY
  if (age >= 40 && age < 50) return AgeType.FORTY
  if (age >= 50 && age < 60) return AgeType.FIFTY
  return AgeType.ETC
}

export function checkConditionsMatch(
  userBirth: string | undefined,
  userGender: GenderType | undefined,
  conditions: {
    ageType: string
    genderCondition: string
  },
): boolean {
  if (!userBirth || !userGender) {
    return true
  }

  // 연령대 체크
  const userAgeType = getAgeTypeFromBirth(userBirth)
  let ageCondition = conditions.ageType

  if (AGE_LABEL_TO_ENUM[ageCondition]) {
    ageCondition = AGE_LABEL_TO_ENUM[ageCondition]
  }

  if (ageCondition && ageCondition !== 'ALL' && ageCondition !== userAgeType) {
    return false
  }

  // 성별 체크
  let genderCondition = conditions.genderCondition

  if (GENDER_LABEL_TO_ENUM[genderCondition]) {
    genderCondition = GENDER_LABEL_TO_ENUM[genderCondition]
  }

  if (genderCondition === 'ALL' || genderCondition === GenderType.ALL) {
    return true
  }

  if (genderCondition && genderCondition !== userGender) {
    return false
  }

  return true
}
