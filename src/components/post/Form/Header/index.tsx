'use client'

import { useController, useFormContext } from 'react-hook-form'

import { IconX } from '@/assets/svgr'
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
  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const v = (e.currentTarget.value ?? '').trim()
    if (!v) return
    e.preventDefault()
    addTag()
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

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-sm">
            여행 태그 <span className="text-blue-500">*</span>
          </label>
          <p className="text-sm text-gray-400">최대 5개</p>
        </div>

        <FormInput<PostFormWithTagValues>
          label=""
          name="tag"
          placeholder="여행 테마를 입력 후 Enter를 클릭하세요"
          className={tags.length > 0 ? '-mb-6' : ''}
          onKeyDown={handleTag}
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 px-2 py-1  text-blue-500 rounded-full bg-blue-50 my-2"
            >
              <span className="text-xs">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-500 cursor-pointer"
              >
                <IconX className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
