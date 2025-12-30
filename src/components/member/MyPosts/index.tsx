import { MYPOSTS_STATUS } from '@/constants/member'
import { MyPostsState } from '@/types/member'

import { Tabs, TabsProvider } from '../Tabs'

export default function MyPosts() {
  return (
    <div>
      <TabsProvider<MyPostsState>
        options={MYPOSTS_STATUS}
        defaultValue="RECRUITING"
        paramName="status"
      >
        <div className="flex flex-col gap-4">
          <Tabs<MyPostsState> />
        </div>
      </TabsProvider>
    </div>
  )
}
