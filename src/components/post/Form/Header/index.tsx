'use client'

import { X } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'

import FormInput from '@/components/form/FormInput'
import type { PostFormWithTagValues } from '@/types/posts/schema'

export default function Header() {
  const { control, setValue, trigger } = useFormContext<PostFormWithTagValues>()

  const { field: tagField } = useController({ name: 'tag', control })
  const { field: tagsField } = useController({ name: 'tags', control })

  const tags = tagsField.value ?? []

  const addTag = async () => {
    const v = (tagField.value ?? '').trim()
    if (!v) return
    if (tags.length >= 5) return
    if (tags.includes(v)) return
    const next = [...tags, v]
    setValue('tags', next, { shouldValidate: true, shouldDirty: true })
    await trigger('tags')
    setValue('tag', '', { shouldDirty: true })
  }

  const removeTag = async (tagToRemove: string) => {
    const next = tags.filter((t) => t !== tagToRemove)
    setValue('tags', next, { shouldValidate: true, shouldDirty: true })
    await trigger('tags')
  }

  return (
    <>
      <FormInput<PostFormWithTagValues>
        label="모임 이름"
        name="title"
        placeholder="모임 이름을 작성해주세요"
        required
        className="mb-0"
      />

      <div>
        <FormInput<PostFormWithTagValues>
          label="여행 태그"
          name="tag"
          placeholder="여행 테마를 작성해주세요. 최대 5개"
          className="mb-0"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            const v = (e.currentTarget.value ?? '').trim()
            if (!v) return
            e.preventDefault()
            void addTag()
          }}
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 px-2 py-1 border border-main text-main rounded-full text-sm bg-sub mb-3"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => void removeTag(tag)}
                className="text-main hover:text-danger"
              >
                <div className="border border-main rounded-full">
                  <X className="size-3" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
