import ReloadIcon from '@/assets/svgr/reload.svg'
import { Button } from '@/components/ui'

interface ErrorFallbackProps {
  message?: string
  onRetry?: () => void
  showRefresh?: boolean
}

export default function ErrorFallback({
  message = '데이터를 불러오는데 실패했습니다.',
  onRetry,
  showRefresh = false,
}: ErrorFallbackProps) {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="flex min-h-[300px] h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in rounded-lg border border-red-100 bg-red-50/50 p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              문제가 발생했습니다
            </h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>

          <div className="flex w-full flex-col gap-2 pt-2 md:flex-row md:justify-center">
            {onRetry && (
              <Button
                size="md"
                onClick={onRetry}
                className="gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors"
              >
                <ReloadIcon className="h-4 w-4" />
                <span>다시 시도</span>
              </Button>
            )}
            {showRefresh && (
              <Button
                size="md"
                onClick={handleRefresh}
                variant="tertiary"
                className="gap-2 text-red-600 hover:bg-red-50 border-red-500 active:bg-red-100 transition-colors"
              >
                <ReloadIcon className="h-4 w-4" />
                <span>페이지 새로고침</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
