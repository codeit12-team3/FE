import { z } from 'zod'

import { NICKNAME_REGEX } from '@/constants/member'

export const profileEditSchema = z.object({
  image: z.string().optional(),
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(20, '닉네임은 20자 이하여야 합니다')
    .regex(NICKNAME_REGEX, '한글, 영문, 숫자만 가능합니다'),
  birth: z.string().min(1, '생일을 선택해주세요'),
  gender: z.string().min(1, '성별을 선택해주세요'),
  mbti: z.string().optional(),
  lodgingStyle: z.string().optional(),
  tripStyle: z.string().optional(),
  introduction: z
    .string()
    .max(100, '자기소개는 100자 이하로 입력해주세요')
    .optional(),
})

export type ProfileEditFormData = z.infer<typeof profileEditSchema>
