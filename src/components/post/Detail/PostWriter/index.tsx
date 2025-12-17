import Image from 'next/image'

interface RowProps {
  label: string
  children: React.ReactNode
}
interface WriterProps {
  writer: {
    nickname: string
    age: number
    gender: 'MALE' | 'FEMALE'
    mbti: string
    birth: number
  }
}

const LABEL_STYLE = 'text-text-disabled w-20'
const VALUE_STYLE = 'text-text-base'
const ROW_STYLE = 'flex gap-3'

function PostWriterRow({ label, children }: RowProps) {
  return (
    <div className={ROW_STYLE}>
      <span className={LABEL_STYLE}>{label}</span>
      <span className={VALUE_STYLE}>{children}</span>
    </div>
  )
}

export default function PostWriter({ writer }: WriterProps) {
  const { nickname, age, gender, mbti, birth } = writer

  return (
    <div className="flex flex-col p-8 border-2 border-gray-200 rounded-2xl gap-10">
      <div className="flex gap-5">
        <Image
          src="/images/profile-default.png"
          alt="프로필"
          width={80}
          height={80}
          className="object-cover"
        />

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex flex-col items-center">
            <span className="font-semibold  bg-sub text-main p-1 rounded-full text-sm">
              작성자
            </span>
            <span className="font-semibold text-text-base text-lg">
              {nickname}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        <div className="flex-col gap-2 justify-center items-center">
          <PostWriterRow label="나이">
            {birth}년생 / {age}살
          </PostWriterRow>

          <PostWriterRow label="성별">
            {gender === 'MALE' ? '남성' : '여성'}
          </PostWriterRow>

          <PostWriterRow label="MBTI">{mbti}</PostWriterRow>
        </div>
      </div>
    </div>
  )
}
