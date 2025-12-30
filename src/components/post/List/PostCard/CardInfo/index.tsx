import {
  IconCrownSolid,
  IconHeart,
  IconHeartSolid,
  IconUser,
} from '@/assets/svgr'
import { NATION_CODE_TO_LABEL, NationCode } from '@/constants/posts'

interface PostCardInfoProps {
  postId: string
  title: string
  nickname: string
  tags: string[]
  isOwner: boolean
  currentMembers: number
  nation: NationCode
  period: { startDate: string; endDate: string }
  conditions: { ageType: string; genderCondition: string }
  onTitleClick: () => void
  onWriterClick: () => void
  onBookmarkClick: (e: React.MouseEvent) => void
  isBookmarked: boolean
}

export default function PostCardInfo({
  title,
  nickname,
  tags,
  isOwner,
  currentMembers,
  nation,
  period,
  conditions,
  onTitleClick,
  onWriterClick,
  onBookmarkClick,
  isBookmarked,
}: PostCardInfoProps) {
  return (
    <div className="flex-1 flex flex-col md:px-4 md:py-0 p-4 justify-between">
      <div className="pb-4">
        <div className="flex gap-2.5 items-center justify-between pb-4">
          <div className="flex gap-2.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 rounded-full text-xs text-blue-500"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onBookmarkClick}
            className="w-10 h-10 md:hidden flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 cursor-pointer"
          >
            {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
          </button>
        </div>

        <div className="flex gap-1.5 px-1 pb-1">
          <h3
            className="text-xl font-bold cursor-pointer hover:underline"
            onClick={onTitleClick}
          >
            {title}
          </h3>
          {isOwner && <IconCrownSolid className="size-6 text-blue-500" />}
        </div>
        <div className="flex gap-1.5 text-sm px-1">
          <p className="text-gray-400">작성자</p>
          <p
            className="text-gray-600 cursor-pointer hover:underline"
            onClick={onWriterClick}
          >
            {nickname}
          </p>
        </div>
      </div>
      <div className="flex flex-col px-1">
        <div className="flex text-sm gap-1 mb-2">
          <IconUser className="size-4" />
          <span>
            <span className="text-blue-500">{currentMembers}</span>명 신청
          </span>
        </div>

        <div className="flex items-center gap-1.5 lg:text-sm flex-wrap text-xs px-1">
          <span className="text-gray-400">위치</span>
          <span className="text-gray-600">{NATION_CODE_TO_LABEL[nation]}</span>

          <span className="text-gray-300">|</span>

          <span className="text-gray-400">날짜</span>
          <span className="text-gray-600">
            {new Date(period.startDate).toLocaleDateString('ko-KR', {
              month: 'long',
              day: 'numeric',
            })}
          </span>

          <span className="text-gray-300 md:max-[1279px]:hidden">|</span>
          <span className="text-gray-400">나이</span>
          <span className="text-gray-600">{conditions.ageType}</span>

          <span className="text-gray-300">|</span>

          <span className="text-gray-400">성별</span>
          <span className="text-gray-600">{conditions.genderCondition}</span>
        </div>
      </div>
    </div>
  )
}
