import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import CommentCardSkeleton from './CommentCardSkeleton'

const meta = {
  title: 'Comment/CommentCardSkeleton',
  component: CommentCardSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCardSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const WithReplyButton: Story = {
  args: {
    showReplies: true,
  },
}

export const WithoutReplyButton: Story = {
  args: {
    showReplies: false,
  },
}

export const MultipleComments: Story = {
  render: () => (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <CommentCardSkeleton key={index} showReplies={true} />
      ))}
    </div>
  ),
}

export const MultipleReplies: Story = {
  render: () => (
    <div className="pl-[55px] space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <CommentCardSkeleton key={index} showReplies={false} />
      ))}
    </div>
  ),
}

export const MixedView: Story = {
  render: () => (
    <div className="space-y-6">
      <CommentCardSkeleton showReplies={true} />
      <div className="pl-[55px] space-y-6">
        <CommentCardSkeleton showReplies={false} />
        <CommentCardSkeleton showReplies={false} />
      </div>
      <CommentCardSkeleton showReplies={true} />
    </div>
  ),
}
