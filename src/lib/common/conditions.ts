import { AgeType, GenderType } from '@/types/posts'

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
  const ageCondition = conditions.ageType

  if (ageCondition && ageCondition !== 'ALL' && ageCondition !== userAgeType) {
    return false
  }

  // 성별 체크
  const genderCondition = conditions.genderCondition
  if (
    genderCondition &&
    genderCondition !== 'ALL' &&
    genderCondition !== userGender
  ) {
    return false
  }

  return true
}
