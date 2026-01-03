import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ChatRoomContent } from '@/types/chat/chatRoom.types'

import ChatCard from '.'

const meta: Meta<typeof ChatCard> = {
  title: 'Components/Chat/ChatCard',
  component: ChatCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-[800px] w-full bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ChatCard>

// 1. 공통 Mock 데이터를 상수로 분리 (타입 안전성 확보)
const MOCK_CHAT_DATA: ChatRoomContent = {
  chatRoomId: 1,
  chatParticipantId: 101,
  title: 'Next.js 스터디 모집합니다',
  thumbnail: null,
  recruitStatus: 'RECRUITING',
  unreadCount: 3,
  lastMessage: '안녕하세요! 프로젝트 참여하고 싶습니다.',
  lastMessageAt: '2025-12-28 14:21:34',
  tags: ['React', 'Next.js'],
  nation: 'KR',
  region: '서울',
  startDate: '',
  endDate: '',
}

export const Default: Story = {
  args: {
    chat: MOCK_CHAT_DATA,
  },
}

export const LongMessage: Story = {
  args: {
    chat: {
      ...MOCK_CHAT_DATA, // 2. !나 ? 없이 안전하게 복사
      title:
        '제목이 아주 긴 채팅방의 경우에는 어떻게 보일까요? 테스트용 긴 제목입니다.',
      lastMessage:
        '이 메시지는 아주 길어서 한 줄로 생략되어야 합니다. 말줄임표 처리가 잘 되어 있는지 확인해 보세요. 넘치는 텍스트는 보이지 않아야 합니다.',
      unreadCount: 99,
    },
  },
}

export const NoMessage: Story = {
  args: {
    chat: {
      ...MOCK_CHAT_DATA,
      lastMessage: '',
      unreadCount: 0,
    },
  },
}
