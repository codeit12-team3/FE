import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from '@storybook/test'
import { SessionProvider } from 'next-auth/react'

import BaseCommentItem from '../BaseCommentItem'

const mockSession = {
  expires: '2099-01-01T00:00:00Z',
  user: {
    name: '테스트유저',
    email: 'test@example.com',
    image: 'https://avatars.githubusercontent.com/u/2?v=4',
    memberId: 2,
  },
}

const meta = {
  title: 'Comment/BaseCommentItem',
  component: BaseCommentItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <Story />
      </SessionProvider>
    ),
  ],
  args: {
    onDelete: fn(),
    onSave: fn(),
    onReply: fn(),
    isUpdating: false,
  },
} satisfies Meta<typeof BaseCommentItem>

export default meta
type Story = StoryObj<typeof meta>

// 기본 댓글
export const Default: Story = {
  args: {
    commentId: 1,
    imageUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    nickname: '김철수',
    createdAt: '2024-12-27T10:00:00Z',
    updatedAt: '2024-12-27T10:00:00Z',
    memberId: 1,
    content: '정말 유익한 게시글이네요! 감사합니다.',
    isUpdating: false,
  },
}

// 수정된 댓글
export const EditedComment: Story = {
  args: {
    commentId: 1,
    imageUrl: 'https://avatars.githubusercontent.com/u/3?v=4',
    nickname: '박영희',
    createdAt: '2024-12-27T09:00:00Z',
    updatedAt: '2024-12-27T10:30:00Z',
    memberId: 3,
    content: '수정된 내용입니다. "수정됨" 표시가 나타납니다.',
    isUpdating: false,
  },
}

// 삭제된 댓글
export const DeletedComment: Story = {
  args: {
    commentId: 1,
    imageUrl: 'https://avatars.githubusercontent.com/u/4?v=4',
    nickname: '이민수',
    createdAt: '2024-12-27T08:00:00Z',
    updatedAt: '2024-12-27T08:00:00Z',
    memberId: 4,
    content: '삭제된 댓글입니다',
    isUpdating: false,
  },
}

// 긴 댓글
export const LongComment: Story = {
  args: {
    commentId: 1,
    imageUrl: 'https://avatars.githubusercontent.com/u/5?v=4',
    nickname: '최지원',
    createdAt: '2024-12-27T10:00:00Z',
    updatedAt: '2024-12-27T10:00:00Z',
    memberId: 5,
    content: `정말 좋은 게시글이네요!
    
저도 비슷한 경험이 있어서 공감이 많이 됩니다.
특히 두 번째 단락에서 말씀하신 부분이 인상 깊었어요.

앞으로도 이런 좋은 글 많이 부탁드립니다.
감사합니다!`,
    isUpdating: false,
  },
}

// 답글
export const Reply: Story = {
  args: {
    commentId: 2,
    imageUrl: 'https://avatars.githubusercontent.com/u/6?v=4',
    nickname: '정수진',
    createdAt: '2024-12-27T10:00:00Z',
    updatedAt: '2024-12-27T10:00:00Z',
    memberId: 6,
    content: '댓글에 대한 답글입니다.',
    isUpdating: false,
    hasReplyAction: false,
  },
}
