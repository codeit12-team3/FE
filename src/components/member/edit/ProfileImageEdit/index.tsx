import { Pencil } from 'lucide-react'
import Image from 'next/image'

export default function ProfileImageEdit() {
  return (
    <div className="flex flex-col items-center gap-5 mt-9">
      <div>
        <div className="relative">
          <div className="relative w-[173px] h-[173px] rounded-full overflow-hidden border-2 border-[#DDDDDD]">
            <Image
              fill
              src="/images/profile_default.svg"
              className="object-cover"
              alt="프로필이미지"
            />
          </div>
          <div className="absolute w-12 h-12 border-2 border-[#dddddd] rounded-full flex items-center justify-center bg-white bottom-0 right-0 cursor-pointer">
            <Pencil />
          </div>
        </div>
      </div>

      <h2>나의닉네임</h2>
    </div>
  )
}
