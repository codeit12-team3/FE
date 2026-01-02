'use client'

import { motion } from 'motion/react'

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
          <motion.div {...FADE_IN}>
            <Tabs<MyPostsState> />
          </motion.div>
          <motion.div {...SLIDE_UP}>
            <MyPostsList />
          </motion.div>
        </div>
      </TabsProvider>
    </div>
  )
}
