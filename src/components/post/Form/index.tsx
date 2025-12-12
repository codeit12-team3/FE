'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { createPost } from '@/api/posts'
import { Button } from '@/components/common'
import { AgeType, GenderType } from '@/types/posts'

import Date from './Date'
import Description from './Description'
import Header from './Header'
import ImageUpload from './ImageUpload'
import Info from './Info'

export default function PostForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    nation: '',
    region: '',
    member: '',
    age: '' as AgeType | '',
    gender: '' as GenderType | '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    tags: [] as string[],
    images: [] as string[],
  })

  const router = useRouter()
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      alert('게시글이 등록되었습니다.')
    },
    onError: () => {
      alert('게시글 등록 실패')
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.age || !form.gender || !form.startDate || !form.endDate) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    const payload = {
      title: form.title,
      content: form.description,
      nation: form.nation,
      region: form.region,
      startDate: form.startDate.toISOString().split('T')[0],
      endDate: form.endDate.toISOString().split('T')[0],
      maxMembers: parseInt(form.member) || 0,
      tags: form.tags,
      images: form.images,
      genderType: form.gender as GenderType,
      ageType: form.age as AgeType,
    }
    mutation.mutate(payload)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-7xl w-full px-8">
        <h1 className="text-2xl font-semibold mb-6 text-left">게시글 작성</h1>
      </div>
      <div className="max-w-7xl flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Header
            title={form.title}
            tags={form.tags}
            onChangeTitle={(v) => setForm((prev) => ({ ...prev, title: v }))}
            onChangeTags={(text) => {
              const tags = text.map((t) => t.trim()).filter((t) => t !== '')
              setForm((prev) => ({ ...prev, tags }))
            }}
          />
          <ImageUpload />
          <Info
            nation={form.nation}
            region={form.region}
            member={form.member}
            age={form.age}
            gender={form.gender}
            onChangeRegion={(v) => setForm((prev) => ({ ...prev, region: v }))}
            onChangeNation={(v) => setForm((prev) => ({ ...prev, nation: v }))}
            onChangeMember={(v) => setForm((prev) => ({ ...prev, member: v }))}
            onChangeAge={(v) =>
              setForm((prev) => ({ ...prev, age: v as AgeType }))
            }
            onChangeGender={(v) =>
              setForm((prev) => ({ ...prev, gender: v as GenderType }))
            }
          />
          <Date
            startDate={form.startDate}
            endDate={form.endDate}
            onChangeStartDate={(v) =>
              setForm((prev) => ({ ...prev, startDate: v }))
            }
            onChangeEndDate={(v) =>
              setForm((prev) => ({ ...prev, endDate: v }))
            }
          />
          <Description
            description={form.description}
            onChangeDescription={(v) =>
              setForm((prev) => ({ ...prev, description: v }))
            }
          />
          <div className="flex items-center gap-8 justify-center">
            <Button
              type="button"
              size="md"
              variant="secondary"
              onClick={() => router.push('/')}
            >
              나가기
            </Button>
            <Button type="submit" size="md">
              게시글 등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
