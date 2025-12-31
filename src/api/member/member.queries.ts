import { useQuery } from '@tanstack/react-query'

import { STALE_TIME } from '@/constants/common'

import { getMyProfile, getOtherProfile } from './member.clients'

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: getMyProfile,
    staleTime: STALE_TIME.MINUTE * 5,
    retry: false,
  })
}

export const useGetOtherProfile = (memberId: string | undefined) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getOtherProfile(memberId!),
    staleTime: STALE_TIME.MINUTE * 5,
    retry: false,
    enabled: !!memberId,
  })
}
