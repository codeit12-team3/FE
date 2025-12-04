import z from 'zod'

import {
  EMAILCODE_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@/constants/auth'
import {
  GENDER_LIST,
  MBTI_LIST,
  NICKNAME_MAX_LENGTH,
  NICKNAME_REGEX,
} from '@/constants/member'

export const signupSchema = z
  .object({
    email: z
      .string()
      .email('올바른 이메일 형식이 아닙니다')
      .nonempty('이메일을 입력해주세요'),
    emailCode: z
      .string()
      .nonempty('인증코드를 입력해주세요')
      .length(EMAILCODE_LENGTH, `인증코드는 ${EMAILCODE_LENGTH}자리 입니다`),
    password: z
      .string()
      .refine((val) => !val.includes(' '), {
        message: '비밀번호에는 공백을 사용할 수 없습니다',
      })
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다`,
      )
      .regex(
        PASSWORD_REGEX,
        '비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다',
      ),
    passwordConfirm: z.string().nonempty('비밀번호 확인을 진행해주세요'),
    nickname: z
      .string()
      .min(1, { message: '닉네입을 입력해주세요' })
      .max(NICKNAME_MAX_LENGTH, {
        message: `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 허용됩니다`,
      })
      .regex(NICKNAME_REGEX, {
        message: '닉네임은 한/영, 숫자, 특수문자만 사용 가능합니다',
      }),
    year: z.string().min(1, '년도를 선택해주세요'),
    month: z.string().min(1, '월을 선택해주세요'),
    day: z.string().min(1, '일을 선택해주세요'),
    gender: z.enum(GENDER_LIST, '성별을 선택해주세요').optional(),
    mbti: z.enum(MBTI_LIST, 'MBTI를 선택해주세요').optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다',
  })
  .superRefine((data, ctx) => {
    const { year, month, day } = data

    if (!year || !month || !day) return

    const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    const date = new Date(dateStr)

    const isValidDate =
      !isNaN(date.getTime()) &&
      date.getMonth() + 1 === parseInt(month) &&
      date.getDate() === parseInt(day)

    if (!isValidDate) {
      ctx.addIssue({
        code: 'custom',
        message: '유효하지 않은 날짜입니다',
        path: ['day'],
      })
    }

    if (!data.gender) {
      ctx.addIssue({
        code: 'custom',
        message: '성별을 선택해주세요',
        path: ['gender'],
      })
    }

    if (!data.mbti) {
      ctx.addIssue({
        code: 'custom',
        message: 'MBTI를 선택해주세요',
        path: ['mbti'],
      })
    }
  })

export type SignupFormValues = z.infer<typeof signupSchema>
