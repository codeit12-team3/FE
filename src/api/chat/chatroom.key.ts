export const chatroomKeys = {
  all: ['chatroom'] as const,
  list: () => [...chatroomKeys.all, 'list'] as const,
}
