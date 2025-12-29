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
          <Tabs<CompanionState> />
          <RecievedList />
        </div>
      </TabsProvider>
    </div>
  )
}
