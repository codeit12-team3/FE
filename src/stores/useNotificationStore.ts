import { create } from 'zustand'

interface NotificationState {
  hasNew: boolean
  setHasNew: (status: boolean) => void
}

const useNotificationStore = create<NotificationState>((set) => ({
  hasNew: false,
  setHasNew: (status) => set({ hasNew: status }),
}))

export default useNotificationStore
