export interface ApplyCompanionRes {
  postId: number
  status: 'PENDING'
}

export interface UpdateCompanionRes {
  status: 'APPROVE' | 'DENIED'
}

export interface CancelCompanionRes {
  success: true
}
