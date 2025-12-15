interface PostTagsProps {
  tags: string[]
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) {
    return <div className="mb-6 text-sm text-text-input">태그 없음</div>
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-text-base">태그</h3>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 bg-blue-50 text-main rounded-full text-sm hover:bg-main hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
