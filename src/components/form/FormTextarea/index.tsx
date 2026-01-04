'use client'

import { CircleAlert } from 'lucide-react'
import { ComponentProps } from 'react'
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'

import { Label } from '@/components/ui'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/common'

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'textarea'>, 'name'> {
  label: string
  name: Path<T>
  rightContent?: string
}

export default function FormTextarea<T extends FieldValues>({
  label,
  name,
  className,
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
    <div className={cn('space-y-2 w-full')}>
      <Label htmlFor={name} className="gap-1">
        {label}
        {required && <span className="text-blue-500">*</span>}
      </Label>
      <div className="space-y-1 w-full">
        <Textarea
          aria-invalid={isError ? 'true' : 'false'}
          id={name}
          required={required}
          className={className}
          {...field}
          {...props}
        />
        <div className="flex items-center justify-between">
          <p className="h-6 flex text-xs text-danger items-center gap-1 px-4">
            {isError && <CircleAlert className="size-4" />}
            {error?.message}
          </p>
          {rightContent && (
            <p className="text-gray-500 px-4 text-sm font-medium">
              {rightContent}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
