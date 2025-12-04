import { Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPageHeader() {
  return (
    <div className="mb-10">
      <h1 className="text-[32px] font-semibold mb-8">마이페이지</h1>

      <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">내 프로필</h2>
          <Link
            href="/mypage/edit"
            className="w-8 h-8 rounded-full bg-main flex items-center justify-center"
          >
            <Pencil className="w-4.5 h-4.5 text-white" />
          </Link>
        </div>
        <div className="flex justify-between items-start mt-2.5">
          <div className="flex items-start flex-1">
            <div className="rounded-full border overflow-hidden w-14 h-14 relative mr-3">
              <Image
                fill
                src="/images/profile_default.svg"
                className="object-cover"
                alt="프로필사진"
              />
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <span className="font-semibold">안녕닉네임</span>
              </div>
              <div className="text-sm">
                <span className="inline-block w-17 font-medium mb-1">이름</span>
                <span>두루미</span>
              </div>
              <div className="text-sm">
                <span className="inline-block w-17 font-medium ">E-mail</span>
                <span>123@naver.com</span>
              </div>
            </div>
          </div>
          <div className="border-x h-20 border-disabled text-sm mt-4 flex-1">
            <div className="pl-14">
              <div className="mt-2">
                <span className="inline-block w-17 font-medium">나이</span>
                <span>NNNN년생 / N살 </span>
              </div>
              <div>
                <span className="inline-block w-17 font-medium my-1">성별</span>
                <span>남</span>
              </div>
              <div>
                <span className="inline-block w-17 font-medium">MTBI</span>
                <span>INTP</span>
              </div>
            </div>
          </div>
          <div className="text-sm mt-4 flex-1">
            <div className="pl-14">
              <div className="mt-2">
                <span className="inline-block w-25 font-medium">
                  여행 스타일
                </span>
                <span>-</span>
              </div>
              <div>
                <span className="inline-block w-25 font-medium my-1">
                  숙소 취향
                </span>
                <span>-</span>
              </div>
              <div>
                <span className="inline-block w-25 font-medium">한줄 소개</span>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
