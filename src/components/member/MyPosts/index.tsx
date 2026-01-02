'use client'

import * as m from 'motion/react-m'

import { FADE_IN, SLIDE_UP } from '@/constants/animation'
import { MYPOSTS_STATUS } from '@/constants/member'
import { MyPostsState } from '@/types/member'

import { Tabs, TabsProvider } from '../Tabs'
import MyPostsList from './MyPostsList'

export default function MyPosts() {
  return (
    <div>
      <TabsProvider<MyPostsState>
        options={MYPOSTS_STATUS}
        defaultValue="RECRUITING"
        paramName="status"
      >
        <div className="flex flex-col gap-4">
          <m.div {...FADE_IN}>
            <Tabs<MyPostsState> />
          </m.div>
          <m.div {...SLIDE_UP}>
            <MyPostsList />
          </m.div>
        </div>
      </TabsProvider>
    </div>
  )
}
