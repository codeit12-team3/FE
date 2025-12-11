interface Props {
  writer: {
    nickname: string
    age: number
    gender: 'MALE' | 'FEMALE'
    mbti: string
    birth: number
    tripstyle: string
    accommodationPreference: string
  }
}

const LABEL_STYLE = 'text-text-disabled w-20'
const VALUE_STYLE = 'text-text-base'
const ROW_STYLE = 'flex gap-3'

export default function PostWriter({ writer }: Props) {
  const {
    nickname,
    age,
    gender,
    mbti,
    birth,
    tripstyle,
    accommodationPreference,
  } = writer

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
              <div className="flex-col gap-2">
                <div className={ROW_STYLE}>
                  <span className={LABEL_STYLE}>나이</span>
                  <span className={VALUE_STYLE}>
                    {birth}년생 / {age}살
                  </span>
                </div>

                <div className={ROW_STYLE}>
                  <span className={LABEL_STYLE}>성별</span>
                  <span className={VALUE_STYLE}>
                    {gender === 'MALE' ? '남성' : '여성'}
                  </span>
                </div>

                <div className={ROW_STYLE}>
                  <span className={LABEL_STYLE}>MBTI</span>
                  <span className={VALUE_STYLE}>{mbti}</span>
                </div>
              </div>

              <div>
                <div className={ROW_STYLE}>
                  <span className={LABEL_STYLE}>여행 스타일</span>
                  <span className={VALUE_STYLE}>{tripstyle}</span>
                </div>

                <div className={ROW_STYLE}>
                  <span className={LABEL_STYLE}>숙소 취향</span>
                  <span className={VALUE_STYLE}>{accommodationPreference}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
