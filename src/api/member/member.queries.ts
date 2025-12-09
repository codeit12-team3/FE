import { useQuery } from '@tanstack/react-query'

import { useMemberStore } from '@/stores/member.store'
import { MyProfile } from '@/types/member'

import { getMyProfile } from './member.clients'

export const useMyProfileQuery = () => {
  const { setProfile } = useMemberStore()

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const res = await getMyProfile()
      return res.data as MyProfile
    },
    staleTime: 5 * 60 * 1000,

    select: (data) => {
      if (data) {
        setProfile(data)
      }
      return data
    },
  })
}
