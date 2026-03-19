import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ErrorFallback from './ErrorFallback'

const meta = {
  title: 'Comment/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRetry: Story = {
  args: {
    onRetry: () => {},
  },
}

export const WithRefresh: Story = {
  args: {
    showRefresh: true,
  },
}

export const CustomMessage: Story = {
  args: {
    message: '댓글을 불러오는데 실패했습니다.',
    onRetry: () => {},
  },
}
