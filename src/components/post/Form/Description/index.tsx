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
      <label className="block text-sm text-text-base mb-2">
        모집 설명 (0/500)
      </label>
      <textarea
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        rows={4}
        placeholder="모집 설명을 입력해주세요"
        className="w-full px-4 py-2.5 rounded-lg text-sm resize-none bg-[#EDF4FB] outline-none placeholder:text-text-input"
      />
    </div>
  )
}
