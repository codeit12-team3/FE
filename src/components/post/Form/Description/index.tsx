import { Label, Textarea } from '@/components/ui'

interface DescriptionProps {
  description: string
  onChangeDescription: (v: string) => void
}

export default function Description({
  description,
  onChangeDescription,
}: DescriptionProps) {
  return (
    <div>
      <Label className="mb-2">모집 설명</Label>
      <Textarea
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        rows={4}
        placeholder="모집 설명을 입력해주세요"
      />
    </div>
  )
}
