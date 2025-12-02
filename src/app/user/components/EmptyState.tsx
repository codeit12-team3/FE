import Image from 'next/image'

type EmptyStateProps = {
  type: 'received' | 'sent' | 'posts' | 'bookmarks'
}

const messages = {
  received: '아직 받은 동행 신청이 없어요',
  sent: '아직 신청한 동행이 없어요',
  posts: '아직 작성한 게시글이 없어요',
  bookmarks: '아직 북마크한 게시글이 없어요',
} as const

export default function EmptyState({ type }: EmptyStateProps) {
  return (
    <div className="flex justify-center mt-15">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/user_empty.svg"
          alt="빈 상태"
          width={171}
          height={136}
          className="mb-6"
        />
        <span className="font-semibold text-text-disabled text-lg">
          {messages[type]}
        </span>
      </div>
    </div>
  )
}
