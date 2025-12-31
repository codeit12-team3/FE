import Image from 'next/image'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="w-full flex-1 py-6 max-w-7xl mx-auto px-4 md:px-8 md:py-16 lg:flex lg:items-center lg:py-0">
      <div className="flex gap-7 flex-col lg:flex-row items-center justify-center w-full lg:gap-11 md:gap-10">
        <section>
          <div className="space-y-2">
            <h3 className="lg:text-3xl md:text-2xl text-xl font-bold text-center text-blue-600">
              Welcome to Trip Us!
            </h3>
            <p className="text-xs md:text-base font-medium text-center text-gray-700">
              혼자였던 여행이, 함께하는 순간
            </p>
          </div>
          <Image
            width={490}
            height={324}
            src={'/images/auth/intro.png'}
            alt={'함께 여행하는 모습이 담긴 인트로 일러스트 이미지'}
            className="w-[250px] h-[165px] mx-auto lg:w-[490px] lg:h-[324px] md:w-[320px] md:h-[212px]"
          />
        </section>
        {children}
      </div>
    </main>
  )
}
