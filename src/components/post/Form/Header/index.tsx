import { X } from 'lucide-react'
import { useState } from 'react'

import { Input, Label } from '@/components/ui'

interface HeaderProps {
  title: string
  tags: string[]
  onChangeTitle: (v: string) => void
  onChangeTags: (v: string[]) => void
}

export default function Header({
  title,
  tags,
  onChangeTitle,
  onChangeTags,
}: HeaderProps) {
  const [tagInput, setTagInput] = useState('')

  const addTag = () => {
    const newTag = tagInput.trim()
    if (!newTag) return
    if (tags.includes(newTag)) return
    if (tags.length >= 5) return

    onChangeTags([...tags, newTag])
    setTagInput('')
  }

  return (
    <>
      <div>
        <Label className="mb-3">
          모임 이름 <span className="text-danger">*</span>
        </Label>
        <Input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="모임 이름을 작성해주세요"
        />
      </div>

      <div>
        <Label className="mb-3">
          여행 태그 <span className="text-danger">*</span>
        </Label>

        <Input
          value={tagInput}
          placeholder="여행 테마를 작성해주세요. 최대 5개"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 border border-main text-main rounded-full text-sm bg-sub"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => onChangeTags(tags.filter((_, i) => i !== index))}
                className="text-main hover:text-danger"
              >
                <div className="border border-main rounded-full ">
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
