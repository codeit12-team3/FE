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
    <div className="my-8 w-2/3">
      <h3 className="text-lg font-semibold mb-3 text-text-base">
        작성자 프로필
      </h3>

      <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-2xl">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0" />

          <div className="flex gap-20 mt-1">
            <span className="font-semibold text-text-base text-lg">
              {nickname}
            </span>

            <div className="flex gap-20 text-sm">
              {/* 왼쪽 */}
              <div className="flex-col gap-2">
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
        </div>
      </div>
    </div>
  )
}
