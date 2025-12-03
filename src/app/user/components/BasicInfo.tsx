import { Input } from '@/components/common/Input'

export default function BasicInfo() {
  return (
    <>
      <div>
        <label className="block font-medium">
          닉네임 <span className="text-danger">*</span>
        </label>
        <Input
          name="nickname"
          type="text"
          required
          className="w-42 h-11 bg-[#EDF4FB] mt-3"
          placeholder="닉네임"
        />
      </div>
      <div>
        <label className="blockfont-medium">
          이름 <span className="text-danger">*</span>
        </label>
        <Input
          name="name"
          type="text"
          required
          className="h-11 w-41.5 bg-[#EDF4FB] mt-3"
          placeholder="이름"
        />
      </div>
    </>
  )
}
