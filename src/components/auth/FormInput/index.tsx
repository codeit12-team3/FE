import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'

import { Input, Label } from '@/components/common'
import { cn } from '@/lib/common'

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'input'>, 'name'> {
  label: string
  name: Path<T>
  rightElement?: React.ReactNode
  rightContent?: string
}

export default function FormInput<T extends FieldValues>({
  label,
  name,
  className,
  rightElement,
  rightContent,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>()

  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  const isError = !!error

  return (
    <div className={cn('space-y-2 w-full', className)}>
      <Label htmlFor={name}>{label}</Label>
      <div className="space-y-1 w-full">
        <div className="flex items-center gap-2 w-full">
          <Input
            aria-invalid={isError ? 'true' : 'false'}
            id={name}
            {...field}
            {...props}
          />
          {rightElement}
        </div>
        <div className="flex items-center justify-between">
          <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
            {isError && <CircleAlert className="size-4" />}
            {error?.message}
          </p>
          {rightContent && <p className="text-main px-4">{rightContent}</p>}
        </div>
      </div>
    </div>
  )
}
