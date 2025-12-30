import {
  Gender,
  LodgingStyleValue,
  MBTI,
  TripStyleValue,
} from '@/constants/member'

export interface Member {
  memberId: number
  email: string
  nickname: string
  birth: string
  gender: Gender
  mbti: MBTI
  image: string | null
}

export interface UpdateMyProfileReq {
  nickname?: string
  birth?: string
  gender?: string
  mbti?: string
  image?: string
  lodgingStyle: string
  tripStyle: string
  introduction?: string
}

export interface Profile {
  memberId: string
  nickname: string
  email: string
  birth: string
  age: number
  gender: Gender
  image: string | null
  mbti: string
  lodgingStyle: LodgingStyleValue | null
  tripStyle: TripStyleValue | null
  introduction: string | null
}

export interface PresignedUrlRequest {
  images: Array<{
    imageId: string
    imageType: 'JPG' | 'JPEG' | 'PNG' | 'WEBP'
    imageDirectory: 'MEMBER' | 'POST'
  }>
}

export type PresignedUrlResponse = Array<{
  imageId: string
  presignedUrl: string
  image: string
}>

export type MyPostsState = 'RECRUITING' | 'COMPLETED' | 'FINISHED'
