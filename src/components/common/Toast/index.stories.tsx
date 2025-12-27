import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner'

const mockToast = {
  success: (message: string, duration = 2000) =>
    sonnerToast.custom(
      (id) => (
        <div
          onClick={() => sonnerToast.dismiss(id)}
          className="flex items-center justify-center gap-2 rounded-[12px] bg-black/60 px-10 h-10 text-white text-xs font-bold cursor-pointer"
        >
          <div className="h-6 w-6 p-0.5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            ✓
          </div>
          <span className="truncate">{message}</span>
        </div>
      ),
      { duration },
    ),
  error: (message: string, duration = 2000) =>
    sonnerToast.custom(
      (id) => (
        <div
          onClick={() => sonnerToast.dismiss(id)}
          className="flex items-center justify-center gap-2 rounded-[12px] bg-black/60 px-10 h-10 text-white text-xs font-bold cursor-pointer"
        >
          <div className="h-6 w-6 p-0.5 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
            !
          </div>
          <span className="truncate">{message}</span>
        </div>
      ),
      { duration },
    ),
  info: (message: string, duration = 2000) =>
    sonnerToast.custom(
      (id) => (
        <div
          onClick={() => sonnerToast.dismiss(id)}
          className="flex items-center justify-center gap-2 rounded-[12px] bg-black/60 px-10 h-10 text-white text-xs font-bold cursor-pointer"
        >
          <span className="truncate">{message}</span>
        </div>
      ),
      { duration },
    ),
}

const MockToaster = () => (
  <SonnerToaster
    position="bottom-center"
    toastOptions={{ unstyled: true }}
    offset={40}
    gap={8}
    visibleToasts={5}
  />
)

const meta = {
  title: 'Components/Toast',
  component: MockToaster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-screen">
        <Story />
        <MockToaster />
      </div>
    ),
  ],
} satisfies Meta<typeof MockToaster>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.success('성공적으로 저장되었습니다')}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-green-600"
      >
        성공 토스트
      </button>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.error('오류가 발생했습니다')}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        에러 토스트
      </button>
    </div>
  ),
}

export const Info: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.info('기본 toast입니다')}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        기본 토스트
      </button>
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.success('성공적으로 저장되었습니다')}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-green-600"
      >
        성공 토스트
      </button>
      <button
        onClick={() => mockToast.error('에러가 발생했습니다')}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        에러 토스트
      </button>
      <button
        onClick={() => mockToast.info('기본 toast입니다')}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        기본 토스트
      </button>
    </div>
  ),
}

export const LongMessage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.success('이것은 매우 긴 toast입니다.')}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        긴 성공 토스트
      </button>
      <button
        onClick={() => mockToast.error('매우 긴 에러 toast입니다.')}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        긴 에러 토스트
      </button>
    </div>
  ),
}

export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => mockToast.success('1초 후 사라집니다', 1000)}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        1초 토스트
      </button>
      <button
        onClick={() => mockToast.info('5초 후 사라집니다', 5000)}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        5초 토스트
      </button>
      <button
        onClick={() => mockToast.error('기본 2초 (default)', undefined)}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        기본 2초 토스트
      </button>
    </div>
  ),
}

export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => {
          mockToast.success('첫 번째 토스트')
          setTimeout(() => mockToast.info('두 번째 토스트'), 500)
          setTimeout(() => mockToast.error('세 번째 토스트'), 1000)
        }}
        className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        토스트 여러개 띄우기
      </button>
      <button
        onClick={() => {
          for (let i = 1; i <= 5; i++) {
            setTimeout(() => mockToast.info(`토스트 ${i}`), i * 200)
          }
        }}
        className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
      >
        Show 5 Toasts Sequentially
      </button>
    </div>
  ),
}

export const ClickToDismiss: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => {
          mockToast.info('클릭하면 사라집니다', 10000)
        }}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Show Toast (Click to Dismiss)
      </button>
      <p className="text-sm text-gray-600">토스트를 클릭하면 즉시 사라집니다</p>
    </div>
  ),
}
