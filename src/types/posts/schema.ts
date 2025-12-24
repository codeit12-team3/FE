import { z } from 'zod'

import { NATION_OPTIONS } from '@/constants/posts'
import { AgeType, GenderType } from '@/types/posts'

export const postSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    content: z.string().min(1, '내용을 입력해주세요'),

    nation: z.enum(NATION_OPTIONS),
    region: z.string().min(1, '도시를 선택해주세요'),

    maxMembers: z.coerce
      .number('숫자만 입력 가능합니다')
      .min(1, '모집 정원을 1명 이상 입력해주세요'),

    ageType: z.nativeEnum(AgeType).refine((v) => v !== undefined, {
      message: '나이를 선택해주세요',
    }),

    gender: z.nativeEnum(GenderType).refine((v) => v !== undefined, {
      message: '성별을 선택해주세요',
    }),

    startDate: z.string().min(1, '시작 날짜를 선택해주세요'),
    endDate: z.string().min(1, '종료 날짜를 선택해주세요'),

    tags: z.array(z.string()).min(1, '태그를 1개 이상 추가해주세요'),
    images: z.array(z.string()),
    tag: z.string(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료 날짜는 시작 날짜 이후여야 합니다',
    path: ['endDate'],
  })

export type PostFormValues = z.infer<typeof postSchema>
export type PostFormWithTagValues = PostFormValues
