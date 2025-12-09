export interface ApplyCompanionRes {
  companionId: number
}

export interface UpdateCompanionRes {
  status: 'APPROVE' | 'DENIED'
}

export interface CancelCompanionRes {
  success: true
}
