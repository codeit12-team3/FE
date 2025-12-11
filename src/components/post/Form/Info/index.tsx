import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AGE_OPTIONS, GENDER_OPTIONS, REGION_OPTIONS } from '@/constants/posts'

interface InfoProps {
  region: string
  city: string
  member: string
  age: string
  gender: string
  onChangeMember: (v: string) => void
  onChangeRegion: (v: string) => void
  onChangeCity: (v: string) => void
  onChangeAge: (v: string) => void
  onChangeGender: (v: string) => void
}

export default function Info({
  region,
  city,
  member,
  age,
  gender,
  onChangeMember,
  onChangeRegion,
  onChangeAge,
  onChangeGender,
  onChangeCity,
}: InfoProps) {
  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label className=" mb-3">
            국가 <span className="text-danger">*</span>
          </Label>

          <div className="relative">
            <Select value={region} onValueChange={onChangeRegion}>
              <SelectTrigger className=" w-full">
                <SelectValue placeholder="국가를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {REGION_OPTIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-1/2">
          <Label className=" mb-3">
            도시 <span className="text-danger">*</span>
          </Label>
          <div className="relative">
            <Select value={city} onValueChange={onChangeCity}>
              <SelectTrigger className=" w-full">
                <SelectValue placeholder="도시를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {REGION_OPTIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <Label className="mb-3">
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
            {GENDER_OPTIONS.map((opt) => (
              <Label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={opt.value} />
                <span className="text-sm">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label className=" mb-5">
            나이 <span className="text-danger">*</span>
          </Label>

          <RadioGroup
            value={age}
            onValueChange={onChangeAge}
            className="flex gap-3 items-center mb-3"
          >
            {AGE_OPTIONS.map((opt) => (
              <Label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={opt.value} />
                <span className="text-sm">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  )
}
