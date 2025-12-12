import { z } from 'zod'

import { AgeType, GenderType } from '@/types/posts'

export const postSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    description: z.string().min(1, '내용을 입력해주세요'),

    nation: z.string().min(1, '국가를 선택해주세요'),
    region: z.string().min(1, '도시를 선택해주세요'),

    member: z.coerce.number().min(1, '모집 정원을 1명 이상 입력해주세요'),

    ageType: z
      .nativeEnum(AgeType)
      .optional()
      .refine((v) => v !== undefined, {
        message: '나이를 선택해주세요',
      }),

    gender: z
      .nativeEnum(GenderType)
      .optional()
      .refine((v) => v !== undefined, {
        message: '성별을 선택해주세요',
      }),

    startDate: z.coerce.date().refine((v) => v instanceof Date, {
      message: '시작 날짜를 선택해주세요',
    }),

    endDate: z.coerce.date().refine((v) => v instanceof Date, {
      message: '종료 날짜를 선택해주세요',
    }),

    tags: z.array(z.string()).min(1, '태그를 1개 이상 추가해주세요'),
    images: z.array(z.string()),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜 이후여야 합니다',
    path: ['endDate'],
  })

export type PostFormValues = z.infer<typeof postSchema>
export type PostFormWithTagValues = PostFormValues & { tag: string }
