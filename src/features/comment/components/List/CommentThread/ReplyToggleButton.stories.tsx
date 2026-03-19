import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ReplyToggleButton from './ReplyToggleButton'

const meta = {
  title: 'Comment/ReplyToggleButton',
  component: ReplyToggleButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof ReplyToggleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  args: {
    expanded: false,
  },
}

export const Expanded: Story = {
  args: {
    expanded: true,
  },
}
