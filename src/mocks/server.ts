import { setupServer } from 'msw/node'

import { authHandlers, memberHandlers } from './handlers'
import { postsHandlers } from './handlers/posts'

export const server = setupServer(
  ...postsHandlers,
  ...authHandlers,
  ...memberHandlers,
)
