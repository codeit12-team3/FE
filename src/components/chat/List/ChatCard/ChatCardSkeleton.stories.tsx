import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ChatCardSkeleton } from './ChatCardSkeleton'

const meta: Meta<typeof ChatCardSkeleton> = {
  title: 'Components/Chat/ChatCardSkeleton',
  component: ChatCardSkeleton,
  decorators: [
    (Story) => (
      <div className="max-w-[800px] bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ChatCardSkeleton>

export const Default: Story = {}

export const List: Story = {
  render: () => (
    <ul className="flex flex-col gap-4">
      <ChatCardSkeleton />
      <ChatCardSkeleton />
      <ChatCardSkeleton />
    </ul>
  ),
}
