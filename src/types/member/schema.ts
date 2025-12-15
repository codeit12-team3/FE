import { z } from 'zod'

export const profileEditSchema = z.object({
  image: z.string().optional(),
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
  birth: z.string().min(1, '생일을 선택해주세요'),
  gender: z.string().min(1, '성별을 선택해주세요'),
  mbti: z.string().optional(),
  lodgingStyle: z.string().optional(),
  travelStyle: z.string().optional(),
  introduction: z
    .string()
    .max(100, '자기소개는 100자 이하로 입력해주세요')
    .optional(),
})

export type ProfileEditFormData = z.infer<typeof profileEditSchema>
