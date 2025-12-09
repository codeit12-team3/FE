import { Gender, MBTI } from '@/constants/member'

export interface Member {
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}
//accommodation,travelStyle,bio 는 추후 백엔드 협의에 따라 변경될수있음
export interface UpdateMyProfileReq {
  nickname?: string
  name?: string
  birth?: string
  gender?: 'male' | 'female'
  mbti?: string
  image: string | null
  accommodation?: string
  travelStyle?: string
  bio?: string
}
export interface MyProfile {
  memberId: string
  nickname: string
  name: string
  birth: string
  gender: 'male' | 'female'
  image: string | null
  mbti?: string
  accommodation?: string
  travelStyle?: string
  bio?: string
}

export interface MemberState {
  profile: MyProfile | null
  isDirty: boolean
  isSubmitting: boolean

  setProfile: (profile: MyProfile) => void
  updateProfile: (updates: Partial<MyProfile>) => void
  setImage: (image: string | null) => void
  setDirty: (dirty: boolean) => void
  setSubmitting: (submitting: boolean) => void
  setBirth: (birth: string) => void
  getBirthDate: () => { year: number; month: number; day: number }
  getUpdatePayload: () => UpdateMyProfileReq
  reset: () => void
}

export interface MemberEditState {
  isUploadingImage: boolean
  setIsUploadingImage: (uploading: boolean) => void
  reset: () => void
}
