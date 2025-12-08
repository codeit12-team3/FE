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
        작성자프로필
      </h3>
      <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-2xl">
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center" />
          <span className="font-semibold text-text-base pt-3 mr-15">
            {nickname}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-10 text-sm">
              <span>나이</span>
              <span>
                {' '}
                {birth}년생 / {age}살
              </span>
            </div>

            <div className="flex gap-10 text-sm">
              <span>성별</span>
              <span>{gender === 'MALE' ? '남' : '여'}</span>
            </div>
            <div className="flex gap-8 text-sm">
              <span>MBTI </span>
              <span>{mbti}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
