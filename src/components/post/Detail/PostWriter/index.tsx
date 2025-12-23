import Image from 'next/image'

interface WriterProps {
  writer: {
    nickname: string
    age: number
    gender: 'MALE' | 'FEMALE'
    mbti: string
    birth: number
  }
}

export default function PostWriter({ writer }: WriterProps) {
  const { nickname, age, gender, mbti, birth } = writer

  return (
    <>
      <p className="font-semibold mt-10 mb-2 pl-2">여행장</p>
      <div className="flex flex-col p-8 border border-slate-100 bg-gray-200 rounded-2xl gap-10">
        <div className="flex gap-5">
          <Image
            src="/images/profile-default.png"
            alt="프로필"
            width={48}
            height={48}
            className="object-cover"
          />

          <div className="flex flex-col gap-2 items-center mr-14">
            <span className="font-semibold bg-blue-50 text-blue-500 py-1.5 px-2.5 rounded-full text-xs">
              작성자
            </span>
            <span className="font-semibold">{nickname}</span>
          </div>
          <div className="flex flex-col gap-2 justify-center text-sm">
            <div className="flex gap-1.5">
              <span className="w-10 text-gray-600">나이</span>
              <span className="text-gray-800">
                {birth}년생 / {age}살
              </span>
            </div>

            <div className="flex gap-1.5">
              <span className="w-10 text-gray-600">성별</span>
              <span className="text-gray-800">
                {gender === 'MALE' ? '남성' : '여성'}
              </span>
            </div>

            <div className="flex gap-1.5">
              <span className="w-10 text-gray-600">MBTI</span>
              <span className="text-gray-800">{mbti}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
