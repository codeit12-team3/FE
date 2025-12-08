import Image from 'next/image'

interface PostImagesProps {
  images: string[]
}

export default function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="mb-6 text-sm text-text-input">이미지가 없습니다.</div>
    )
  }

  return (
    <div className="flex gap-3 mb-6">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="w-32 h-32 bg-blue-50 rounded-lg overflow-hidden"
        >
          <Image
            src={src}
            alt={`post-image-${idx}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
