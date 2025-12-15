interface ApiErrorData {
  status: string
  message: string
}

interface ApiSuccessResponse<T> {
  success: true
  status: number
  data: T
  timestamp: string
}

interface ApiFailResponse {
  success: false
  status: number
  data: ApiErrorData
  timestamp: string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiFailResponse
