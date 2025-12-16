import PostWriterRow from './PostWriterRow'

interface Props {
  writer: {
    nickname: string
    age: number
    gender: 'MALE' | 'FEMALE'
    mbti: string
    birth: number
  }
}

export default function PostWriter({ writer }: Props) {
  const { nickname, age, gender, mbti, birth } = writer

  return (
    <div className="flex flex-col p-8 border-2 border-gray-200 rounded-2xl gap-10">
      <div className="flex gap-5">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0" />
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
