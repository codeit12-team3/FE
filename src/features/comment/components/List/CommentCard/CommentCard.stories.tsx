import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import CommentCard from './CommentCard'

const now = new Date().toISOString()
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

const baseArgs = {
  imageUrl: '',
  nickname: '홍길동',
  content: '안녕하세요! 정말 유익한 게시글이네요. 감사합니다.',
  createdAt: oneHourAgo,
  updatedAt: oneHourAgo,
  isOwner: false,
  isEditing: false,
  onReplyClick: () => {},
}

const meta = {
  title: 'Comment/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: baseArgs,
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AsOwner: Story = {
  args: {
    isOwner: true,
    onDelete: () => {},
    onEditClick: () => {},
  },
}

export const Edited: Story = {
  args: {
    createdAt: oneDayAgo,
    updatedAt: oneHourAgo,
  },
}

export const Deleted: Story = {
  args: {
    content: '삭제된 댓글입니다',
    isOwner: true,
    onDelete: () => {},
    onEditClick: () => {},
  },
}

export const Editing: Story = {
  args: {
    isOwner: true,
    isEditing: true,
    onSaveEdit: async () => {},
    onCancelEdit: () => {},
  },
}

export const Updating: Story = {
  args: {
    isOwner: true,
    isEditing: true,
    isUpdating: true,
    onSaveEdit: async () => {},
    onCancelEdit: () => {},
  },
}

export const AsReply: Story = {
  render: (args) => (
    <div className="pl-[55px]">
      <CommentCard {...args} onReplyClick={undefined} />
    </div>
  ),
}

export const MixedView: Story = {
  render: () => (
    <div className="space-y-6">
      <CommentCard
        {...baseArgs}
        isOwner={true}
        onDelete={() => {}}
        onEditClick={() => {}}
      />
      <div className="pl-14 space-y-6">
        <CommentCard {...baseArgs} onReplyClick={undefined} />
        <CommentCard
          {...baseArgs}
          nickname="김철수"
          content="저도 동의합니다."
          createdAt={now}
          updatedAt={now}
          onReplyClick={undefined}
        />
      </div>
      <CommentCard
        {...baseArgs}
        nickname="이영희"
        content="삭제된 댓글입니다"
        isOwner={false}
      />
    </div>
  ),
}
