import { SetupWorker } from 'msw/browser'

import { authHandlers, memberHandlers } from './handlers'
import { companionsHandlers } from './handlers/companions'
import { postsHandlers } from './handlers/posts'

declare global {
  interface Window {
    mswWorker?: SetupWorker
  }
}

export async function initMocks() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return
  } else {
    if (!window.mswWorker) {
      const { worker } = await import('./browser')
      window.mswWorker = worker
      worker.use(
        ...companionsHandlers,
        ...postsHandlers,
        ...authHandlers,
        ...memberHandlers,
      )
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
    } else {
      const worker = window.mswWorker
      worker.use(
        ...companionsHandlers,
        ...postsHandlers,
        ...authHandlers,
        ...memberHandlers,
      )
    }
  }
}
