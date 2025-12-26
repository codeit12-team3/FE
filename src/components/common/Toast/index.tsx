import type { ReactNode } from 'react'
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner'

import CheckCircle from '@/assets/svgr/check-circle.svg'
import ErrorCircle from '@/assets/svgr/error-circle.svg'

export type ToastType = 'default' | 'success' | 'error'

const TOAST_ICON_MAP: Record<ToastType, ReactNode> = {
  default: null,
  success: <CheckCircle className="h-6 w-6 text-green-400" />,
  error: <ErrorCircle className="h-6 w-6 text-red-400" />,
}

export const renderToast = (
  message: string,
  type: ToastType,
  duration: number,
) => {
  sonnerToast.custom(
    (id) => (
      <div
        onClick={() => sonnerToast.dismiss(id)}
        className="flex items-center justify-center gap-2 rounded-[12px] bg-black/60 px-10 py-2.5 text-white text-xs font-bold"
      >
        {TOAST_ICON_MAP[type]}
        <span className="truncate">{message}</span>
      </div>
    ),
    { duration },
  )
}
export const toast = {
  success: (message: string, duration = 2000) =>
    renderToast(message, 'success', duration),
  error: (message: string, duration = 2000) =>
    renderToast(message, 'error', duration),
  info: (message: string, duration = 2000) =>
    renderToast(message, 'default', duration),
}

export const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        unstyled: true,
      }}
      offset={40}
      gap={8}
      visibleToasts={5}
    />
  )
}
