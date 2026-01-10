import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { RoomItemSkeleton } from './RoomItemSkeleton'

const meta: Meta<typeof RoomItemSkeleton> = {
  title: 'Components/Chat/ChatCardSkeleton',
  component: RoomItemSkeleton,
  decorators: [
    (Story) => (
      <div className="max-w-[800px] bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RoomItemSkeleton>

export const Default: Story = {}

export const List: Story = {
  render: () => (
    <ul className="flex flex-col gap-4">
      <RoomItemSkeleton />
      <RoomItemSkeleton />
      <RoomItemSkeleton />
    </ul>
  ),
}
