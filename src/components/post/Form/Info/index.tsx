interface InfoProps {
  region: string
  member: string
  age: string
  onChangeMember: (v: string) => void
  onChangeRegion: (v: string) => void
  onChangeAge: (v: string) => void
}

export default function Info({
  region,
  member,
  age,
  onChangeMember,
  onChangeRegion,
  onChangeAge,
}: InfoProps) {
  return (
    <>
      <div>
        <label className="block text-sm text-text-base mb-3">
          국가 <span className="text-danger">*</span>
        </label>

        <div className="relative">
          <select
            value={region}
            onChange={(e) => onChangeRegion(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] outline-none"
          >
            <option value="">국가를 선택해주세요</option>
            <option value="korea">대한민국</option>
            <option value="japan">일본</option>
            <option value="usa">미국</option>
          </select>

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-input pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          모집 정원 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-4">
          <input
            type="text"
            value={member}
            onChange={(e) => onChangeMember(e.target.value)}
            placeholder="인원을 입력해주세요"
            className="w-1/2 px-4 py-2.5 rounded-lg text-sm bg-[#EDF4FB] placeholder:text-text-input outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          나이 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-3 items-center">
          <select
            value={age}
            onChange={(e) => onChangeAge(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] outline-none"
          >
            <option value="">출생년도 선택해주세요</option>
            <option value="2005">2005년</option>
            <option value="2000">2000년</option>
            <option value="1995">1995년</option>
          </select>
        </div>
      </div>
    </>
  )
}
