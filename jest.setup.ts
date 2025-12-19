import '@testing-library/jest-dom'

import { server } from '@/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

//테스트 환경에서 next-auth 모킹하기 위해 설정
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        email: 'test@example.com',
        accessToken: 'mock-access-token',
      },
    },
    status: 'authenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))
