import { useEffect, useEffectEvent } from 'react'

import { leaveChatroom } from '../api/chatroom.clients'

export const useChatRoomExit = (chatParticipantId: number) => {
  const onExit = useEffectEvent(() => {
    leaveChatroom({
      chatParticipantId,
    })
  })

  useEffect(() => {
    return () => {
      onExit()
    }
  }, [])
}
