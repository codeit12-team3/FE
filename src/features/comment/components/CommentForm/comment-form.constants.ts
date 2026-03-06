import { CommentFormMode } from './comment-form.types'

export const COMMENT_FORM_CONFIG: Record<
  CommentFormMode,
  {
    placeholder: string
    submitText: string
  }
> = {
  create: {
    placeholder: '댓글을 입력해주세요',
    submitText: '댓글 작성',
  },
  reply: {
    placeholder: '답글을 입력해주세요',
    submitText: '답글 작성',
  },
  edit: {
    placeholder: '수정할 내용을 입력해주세요',
    submitText: '수정 완료',
  },
}
