import { useQuery } from '@tanstack/react-query'

import { getMyProfile } from './member.clients'

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
