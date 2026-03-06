export type CommentFormMode = 'create' | 'reply' | 'edit'

export interface CommentFormProps {
  mode: CommentFormMode
  initialValue?: string
  userImage: string | null
  isSubmitting: boolean
  onSubmit: (value: string) => Promise<void>
  onClose?: () => void
  autoFocus?: boolean
}
