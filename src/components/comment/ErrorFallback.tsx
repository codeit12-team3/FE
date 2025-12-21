import ReloadIcon from '@/assets/svgr/reload.svg'
import { Button } from '@/components/common'

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
    <div className="flex flex-col items-center gap-3 p-4 text-center">
      <p className="text-sm text-red-500">{message}</p>
      {onRetry && (
        <Button size="md" onClick={onRetry} className="gap-2">
          <ReloadIcon />
          <span>다시 시도</span>
        </Button>
      )}
      {showRefresh && (
        <Button size="md" onClick={handleRefresh} className="gap-2">
          <ReloadIcon />
          <span>새로고침</span>
        </Button>
      )}
    </div>
  )
}
