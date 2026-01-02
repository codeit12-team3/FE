'use client'

import { motion } from 'motion/react'

import { FADE_IN, SLIDE_UP } from '@/constants/animation'
import { COMPANION_STATUS } from '@/constants/companion'
import { CompanionState } from '@/types/companions'

import { Tabs, TabsProvider } from '../Tabs'
import SentList from './SentList'

export default function SentCompanion() {
  return (
    <div>
      <TabsProvider<CompanionState>
        options={COMPANION_STATUS}
        defaultValue="PENDING"
        paramName="status"
      >
        <div className="flex flex-col gap-4">
          <motion.div {...FADE_IN}>
            <Tabs<CompanionState> />
          </motion.div>
          <motion.div {...SLIDE_UP}>
            <SentList />
          </motion.div>
        </div>
      </TabsProvider>
    </div>
  )
}
