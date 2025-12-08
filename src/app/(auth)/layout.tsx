import Image from 'next/image'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="w-full flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full">
        <section className="flex-1 space-y-3 w-full">
          <h3 className="text-2xl font-semibold text-center">
            Welcome to Trip Us!
          </h3>
          <p className="font-medium text-center">
            {/* TODO: 멘트 결정나면 바꿈 */}
            한줄 소개 있으면 좋을 것 같습니다.
          </p>
          <Image
            width={640}
            height={563}
            src={'/images/auth/intro.png'}
            alt={'함께 여행하는 모습이 담긴 인트로 일러스트 이미지'}
            className="w-full h-auto"
          />
        </section>
        {children}
      </div>
    </main>
  )
}
