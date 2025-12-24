import '@testing-library/jest-dom'

import React from 'react'

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean
      priority?: boolean
      loading?: string
      quality?: number
    },
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, priority, loading, quality, ...imgProps } = props
    return React.createElement('img', imgProps)
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/assets/svgr', () => {
  const mockSvg = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement>
  >((props, ref) => React.createElement('svg', { ...props, ref }))
  mockSvg.displayName = 'MockSvg'

  return new Proxy(
    {},
    {
      get: () => mockSvg,
    },
  )
})
