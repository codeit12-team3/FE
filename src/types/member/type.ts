import { Gender, MBTI } from '@/constants/member'

export interface Member {
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
}

export interface UpdateMyProfileReq {
  nickname?: string
  birth?: string
  gender?: string
  mbti?: string
  image?: string
  lodgingStyle?: string
  travelStyle?: string
  introduction?: string
}

export interface MyProfile {
  memberId: string
  nickname: string
  name: string
  birth: string
  gender: string
  image: string | null
  mbti?: string
  lodgingStyle?: string
  travelStyle?: string
  introduction?: string
}

export interface PresignedUrlRequest {
  images: Array<{
    imageId: string
    imageType: 'JPG' | 'JPEG' | 'PNG' | 'SVG'
    imageDirectory: 'MEMBER' | 'POST'
  }>
}

export type PresignedUrlResponse = Array<{
  imageId: string
  presignedUrl: string
  image: string
}>
