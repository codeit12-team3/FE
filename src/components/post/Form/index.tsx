'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/common'

import Date from './Date'
import Description from './Description'
import Header from './Header'
import ImageUpload from './ImageUpload'
import Info from './Info'

export default function PostForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    region: '',
    membar: '',
    age: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    tags: [] as string[],
    images: [] as string[],
  })
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col  items-center">
        <div className="max-w-7xl w-full px-8">
          <h1 className="text-2xl font-semibold mb-6 text-left">게시글 작성</h1>
        </div>
        <div className=" max-w-7xl flex items-center justify-center">
          <div className="space-y-2.5 ">
            <Header
              title={form.title}
              tags={form.tags}
              onChangeTitle={(v) => setForm((prev) => ({ ...prev, title: v }))}
              onChangeTags={(text) => {
                const tags = text
                  .split(',')
                  .map((t) => t.trim())
                  .filter((t) => t !== '')
                setForm((prev) => ({ ...prev, tags }))
              }}
            />
            <ImageUpload />
            <Info
              region={form.region}
              member={form.member}
              age={form.age}
              onChangeMember={(v) =>
                setForm((prev) => ({ ...prev, member: v }))
              }
              }
              onChangeRegion={(v) =>
                setForm((prev) => ({ ...prev, region: v }))
              }
              onChangeAge={(v) => setForm((prev) => ({ ...prev, age: v }))}
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
                size="md"
                variant="secondary"
                onClick={() => router.push('/')}
              >
                나가기
              </Button>
              <Button size="md">게시글 등록</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
