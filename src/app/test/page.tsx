import { div } from 'motion/react-client'

import { Header } from '@/components/common/Header'
import TravelPostList from '@/components/travel/TravelPostList'

export default function Home() {
  return (
    <div>
      <Header />
      <TravelPostList></TravelPostList>
    </div>
  )
}
