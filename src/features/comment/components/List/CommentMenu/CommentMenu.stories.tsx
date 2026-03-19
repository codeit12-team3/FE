import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import CommentMenu from './CommentMenu'

const meta = {
  title: 'Comment/CommentMenu',
  component: CommentMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onConfirm: () => {},
    startEdit: () => {},
  },
} satisfies Meta<typeof CommentMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
