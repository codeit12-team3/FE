import { NationCode } from '@/constants/posts'

export type CompanionState = 'PENDING' | 'APPROVED' | 'DENIED'

export interface ApplyCompanionReq {
  postId: string
  applyMessage: string
}

export interface ApplyCompanionRes {
  postId: number
  status: 'PENDING'
}

export interface UpdateCompanionReq {
  companionId: string
  status: Exclude<CompanionState, 'PENDING'>
}

export interface ReceivedCompanionRes {
  content: ReceivedCompanionContent[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export interface SentCompanionRes {
  content: SentCompanionContent[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export interface ReceivedCompanionContent {
  guestCompanionResponse: {
    companionId: string
    memberId: string
    nickname: string
    status: CompanionState
    applyMessage: string
  }
  postResponse: {
    id: string
    title: string
    thumbnail: string | null
    tags: string[]
    nation: NationCode
    region: string
    startDate: string
    endDate: string
  }
}

export interface SentCompanionContent {
  myGuestCompanionResponse: {
    companionId: string
    status: CompanionState
    applyMessage: string
  }
  postResponse: {
    id: string
    title: string
    thumbnail: string | null
    tags: string[]
    nation: NationCode
    region: string
    startDate: string
    endDate: string
  }
}
