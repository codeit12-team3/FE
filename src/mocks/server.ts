import { setupServer } from 'msw/node'

import { authHandlers, memberHandlers } from './handlers'
import { commentHandlers } from './handlers/comments'
import { companionsHandlers } from './handlers/companions'
import { postsHandlers } from './handlers/posts'

export const server = setupServer(
  ...commentHandlers,
  ...companionsHandlers,
  ...postsHandlers,
  ...authHandlers,
  ...memberHandlers,
)
