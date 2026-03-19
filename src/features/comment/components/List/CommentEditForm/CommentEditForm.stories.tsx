import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import CommentEditForm from './CommentEditForm'

const meta = {
  title: 'Comment/CommentEditForm',
  component: CommentEditForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    initialContent: '수정할 댓글 내용입니다.',
    onCancel: () => {},
    onSave: async () => {},
    isUpdating: false,
  },
} satisfies Meta<typeof CommentEditForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Updating: Story = {
  args: {
    isUpdating: true,
  },
}

export const LongContent: Story = {
  args: {
    initialContent:
      '이것은 긴 댓글 내용입니다. 이것은 긴 댓글 내용입니다. 이것은 긴 댓글 내용입니다. 이것은 긴 댓글 내용입니다. 이것은 긴 댓글 내용입니다. 이것은 긴 댓글 내용입니다.',
  },
}
