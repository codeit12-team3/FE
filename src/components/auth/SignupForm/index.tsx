'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { useSignupEmail } from '@/api/auth'
import { useEmailVerification, useFormStep } from '@/hooks/auth'
import { SignupEmailReq, SignupFormValues, signupSchema } from '@/types/auth'

import SignupFirstStep from './SignupFirstStep'
import SignupSecondStep from './SignupSecondStep'

export default function SignupForm() {
  const router = useRouter()
  const { step, next } = useFormStep({ maxStep: 2 })
  const { mutate } = useSignupEmail()
  const verification = useEmailVerification()
  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      emailCode: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      year: '',
      month: '',
      day: '',
      gender: undefined,
      mbti: undefined,
    },
  })

  const onSubmit = (data: SignupFormValues) => {
    if (!verification.isChecked) return

    const formattedData: SignupEmailReq = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      birth: `${data.year}-${data.month.padStart(2, '0')}-${data.day.padStart(2, '0')}`,
      gender: data.gender!,
      mbti: data.mbti!,
    }

    // mutate(formattedData, {
    //   onSuccess: () => {
    //     // TODO: NextAuth 인증 로직 구현 후 완성
    //     // 1. 성공시
    //     // 1-1. NextAuth signIn 호출
    //     // 1-2. 메인 페이지로 이동
    //     // 2. 실패시
    //     // 2-1. toast 에러 메시지
    //     // 2-2. 로그인 페이지로 이동
    //   },
    // })

    console.log(formattedData)

    router.push('/signin')
  }

  return (
    <FormProvider {...methods}>
      <section className="px-4 md:px-14 py-6 md:py-11 rounded-[40px] bg-white flex-1 w-full space-y-4">
        <div className="space-y-[35px]">
          <h2 className="text-2xl font-semibold text-center">회원가입</h2>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && (
              <SignupFirstStep verification={verification} onNext={next} />
            )}
            {step === 2 && <SignupSecondStep verification={verification} />}
          </form>
        </div>
        <p className="text-center text-sm">
          이미 회원이신가요?{' '}
          <Link
            className="text-main underline underline-offset-1"
            href={'/signin'}
          >
            로그인
          </Link>
        </p>
      </section>
    </FormProvider>
  )
}
