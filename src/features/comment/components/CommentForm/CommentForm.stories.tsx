import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import CommentForm from './CommentForm'

const meta = {
  title: 'Comment/CommentForm',
  component: CommentForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    userImage: null,
    isSubmitting: false,
    onSubmit: async () => {},
    onDeActivate: () => {},
  },
} satisfies Meta<typeof CommentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {
  args: {
    mode: 'create',
  },
}

export const Reply: Story = {
  args: {
    mode: 'reply',
  },
}

export const Submitting: Story = {
  args: {
    mode: 'create',
    isSubmitting: true,
    initialValue: '제출 중인 댓글입니다.',
  },
}
