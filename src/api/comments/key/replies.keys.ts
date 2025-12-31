export const replyKeys = {
  all: ['replies'] as const,
  lists: () => [...replyKeys.all, 'list'] as const,
  list: (commentId: number) => [...replyKeys.lists(), commentId] as const,
}
