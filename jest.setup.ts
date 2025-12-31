import '@testing-library/jest-dom'

import React from 'react'

import { server } from '@/mocks/server'

// MSW 서버 설정: 테스트 시작 전 서버 시작, 각 테스트 후 핸들러 리셋, 모든 테스트 종료 후 서버 종료
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// next-auth mock: 인증된 사용자 세션 제공
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

// Next.js Image 컴포넌트 mock: 테스트 환경에서 일반 img 태그로 렌더링
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

// Next.js navigation hooks mock: useRouter와 useParams를 테스트에서 제어 가능하도록 설정
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}))

// SVG 아이콘 mock: 모든 SVG 아이콘을 일반 svg 태그로 렌더링
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

// uuid mock: v4 함수가 항상 동일한 테스트용 UUID 반환
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}))
