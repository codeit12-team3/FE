'use client'

import * as m from 'motion/react-m'

import { FADE_IN, SLIDE_UP } from '@/constants/animation'
import { COMPANION_STATUS } from '@/constants/companion'
import { CompanionState } from '@/types/companions'

import { Tabs, TabsProvider } from '../Tabs'
import RecievedList from './ReceivedList'

export default function ReceivedCompanion() {
  return (
    <div>
      <TabsProvider<CompanionState>
        options={COMPANION_STATUS}
        defaultValue="PENDING"
        paramName="status"
      >
        <div className="flex flex-col gap-4">
          <m.div {...FADE_IN}>
            <Tabs<CompanionState> />
          </m.div>
          <m.div {...SLIDE_UP}>
            <RecievedList />
          </m.div>
        </div>
      </TabsProvider>
    </div>
  )
}
