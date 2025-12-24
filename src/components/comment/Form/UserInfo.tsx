import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { getImageUrl } from '@/lib/common'

export default function UserInfo() {
  const { data: session } = useSession()
  // 임시 처리
  const user = session?.user
  if (!user) return null

  return (
    <div className="w-full flex items-center gap-2 justify-start">
      <div className="w-6 aspect-square relative rounded-full overflow-hidden">
        <Image
          src={getImageUrl(user.image)}
          alt="user profile"
          fill
          sizes="24px"
        />
      </div>
      <p className="font-semibold text-sm text-gray-900">{user.nickname}</p>
    </div>
  )
}
