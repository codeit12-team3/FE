import { Label } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface InfoProps {
  region: string
  member: string
  age: string
  gender: string
  onChangeMember: (v: string) => void
  onChangeRegion: (v: string) => void
  onChangeAge: (v: string) => void
  onChangeGender: (v: string) => void
}

export default function Info({
  region,
  member,
  age,
  gender,
  onChangeMember,
  onChangeRegion,
  onChangeAge,
  onChangeGender,
}: InfoProps) {
  return (
    <>
      <div>
        <Label className=" mb-2">
          국가 <span className="text-danger">*</span>
        </Label>

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
        <Label className="mb-2">
          모집 정원 <span className="text-danger">*</span>
        </Label>

        <div className="flex gap-4 items-center">
          <Input
            value={member}
            onChange={(e) => onChangeMember(e.target.value)}
            placeholder="인원을 입력해주세요"
            className="w-1/2"
          />

          <RadioGroup
            value={gender}
            onValueChange={onChangeGender}
            className="flex gap-3 items-center"
          >
            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="남성" />
              <span className=" text-sm">남성만</span>
            </Label>

            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="여성" />
              <span className="text-sm">여성만</span>
            </Label>

            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="모두" />
              <span className=" text-sm">모두</span>
            </Label>
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label className=" mb-2">
          나이 <span className="text-danger">*</span>
        </Label>

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
    </>
  )
}
