import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import BaseCommentItemSkeleton from './BaseCommentSkeleton'

const meta = {
  title: 'Comment/BaseCommentItemSkeleton',
  component: BaseCommentItemSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseCommentItemSkeleton>

export default meta
type Story = StoryObj<typeof meta>

// 댓글 스켈레톤 (답글 달기 버튼 포함)
export const WithReplyButton: Story = {
  args: {
    showReplies: true,
  },
}

// 답글 스켈레톤 (답글 달기 버튼 없음)
export const WithoutReplyButton: Story = {
  args: {
    showReplies: false,
  },
}

// 여러 개의 댓글 스켈레톤
export const MultipleComments: Story = {
  render: () => (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <BaseCommentItemSkeleton key={index} showReplies={true} />
      ))}
    </div>
  ),
}

// 여러 개의 답글 스켈레톤
export const MultipleReplies: Story = {
  render: () => (
    <div className="pl-[55px] space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <BaseCommentItemSkeleton key={index} showReplies={false} />
      ))}
    </div>
  ),
}

// 댓글과 답글 혼합
export const MixedView: Story = {
  render: () => (
    <div className="space-y-6">
      <BaseCommentItemSkeleton showReplies={true} />
      <div className="pl-[55px] space-y-6">
        <BaseCommentItemSkeleton showReplies={false} />
        <BaseCommentItemSkeleton showReplies={false} />
      </div>
      <BaseCommentItemSkeleton showReplies={true} />
    </div>
  ),
}
