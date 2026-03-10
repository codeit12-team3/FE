import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from '@storybook/test'

import CommentCard from '@/features/comment/components/List/CommentCard/CommentCard'

const meta = {
  title: 'Comment/CommentCard',
  component: CommentCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    imageUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    nickname: '김철수',
    content: '정말 유익한 게시글이네요! 감사합니다.',
    createdAt: '2024-12-27T10:00:00Z',
    updatedAt: '2024-12-27T10:00:00Z',

    isOwner: true,
    isEditing: false,
    isUpdating: false,

    onDelete: fn(),
    onEditClick: fn(),
    onCancelEdit: fn(),
    onSaveEdit: fn(),
    onReplyClick: fn(),
  },
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EditedComment: Story = {
  args: {
    nickname: '박영희',
    imageUrl: 'https://avatars.githubusercontent.com/u/3?v=4',
    createdAt: '2024-12-27T09:00:00Z',
    updatedAt: '2024-12-27T10:30:00Z',
    content: '수정된 내용입니다. "수정됨" 표시가 나타납니다.',
  },
}

export const DeletedComment: Story = {
  args: {
    nickname: '이민수',
    imageUrl: 'https://avatars.githubusercontent.com/u/4?v=4',
    content: '삭제된 댓글입니다',
    onDelete: undefined,
    onEditClick: undefined,
    onReplyClick: undefined,
  },
}

export const LongComment: Story = {
  args: {
    nickname: '최지원',
    imageUrl: 'https://avatars.githubusercontent.com/u/5?v=4',
    content: `정말 좋은 게시글이네요!

저도 비슷한 경험이 있어서 공감이 많이 됩니다.
특히 두 번째 단락에서 말씀하신 부분이 인상 깊었어요.

앞으로도 이런 좋은 글 많이 부탁드립니다.
감사합니다!`,
  },
}

export const Reply: Story = {
  args: {
    nickname: '정수진',
    imageUrl: 'https://avatars.githubusercontent.com/u/6?v=4',
    content: '댓글에 대한 답글입니다.',
    onReplyClick: undefined,
  },
}
