import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'

import { Label } from '@/components/ui'
import { cn } from '@/lib/common'

import PasswordInput from '../PasswordInput'

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
  required,
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
      <Label htmlFor={name} className="gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="space-y-1 w-full">
        <div className="flex items-center gap-2 w-full">
          <PasswordInput
            aria-invalid={isError ? 'true' : 'false'}
            id={name}
            required={required}
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
