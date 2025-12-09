interface HeaderProps {
  title: string
  tags: string[]
  onChangeTitle: (v: string) => void
  onChangeTags: (v: string) => void
}

export default function Header({
  title,
  tags,
  onChangeTitle,
  onChangeTags,
}: HeaderProps) {
  return (
    <>
      <div>
        <label className="block text-sm text-text-base mb-2">
          모임 이름 <span className="text-danger">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          type="text"
          placeholder="모임 이름을 작성해주세요"
          className="w-full px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          여행 태그 <span className="text-danger">*</span>
        </label>
        <input
          value={tags.join(', ')}
          onChange={(e) => onChangeTags(e.target.value)}
          type="text"
          placeholder="태그로 선택해주세요, 최대 5개"
          className="w-full px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
        />
      </div>
    </>
  )
}
