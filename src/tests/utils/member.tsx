import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProfileEditFormData } from '@/types/member/schema'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

interface MemberTestWrapperProps {
  children: ReactNode
  defaultValues?: Partial<ProfileEditFormData>
}

function MemberTestWrapper({
  children,
  defaultValues,
}: MemberTestWrapperProps) {
  const queryClient = createTestQueryClient()
  const methods = useForm<ProfileEditFormData>({
    defaultValues: {
      email: 'test@example.com',
      image: '',
      nickname: '테스트유저',
      birth: '2000-01-01',
      gender: 'MALE',
      mbti: 'INFP',
      lodgingStyle: 'ALL',
      tripStyle: 'ALL',
      introduction: '',
      ...defaultValues,
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  )
}

interface MemberRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  defaultValues?: Partial<ProfileEditFormData>
}

export function renderMember(
  ui: ReactElement,
  { defaultValues, ...options }: MemberRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemberTestWrapper defaultValues={defaultValues}>
        {children}
      </MemberTestWrapper>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
