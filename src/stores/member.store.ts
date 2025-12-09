import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { MemberEditState, MemberState } from '@/types/member'

export const useMemberEditState = create<MemberEditState>((set) => ({
  isUploadingImage: false,

  setIsUploadingImage: (uploading) => set({ isUploadingImage: uploading }),
  reset: () => set({ isUploadingImage: false }),
}))

export const useMemberStore = create<MemberState>()(
  devtools(
    (set, get) => ({
      profile: null,
      isDirty: false,
      isSubmitting: false,

      setProfile: (profile) => set({ profile, isDirty: false }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
          isDirty: true,
        })),

      setImage: (image) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, image } : null,
          isDirty: true,
        })),

      setDirty: (dirty) => set({ isDirty: dirty }),
      setSubmitting: (submitting) => set({ isSubmitting: submitting }),

      getUpdatePayload: () => {
        const profile = get().profile
        if (!profile) throw new Error('Profile not loaded')

        return {
          image: profile.image,
          nickname: profile.nickname || undefined,
          name: profile.name || undefined,
          birth: profile.birth || undefined,
          gender: profile.gender || undefined,
          mbti: profile.mbti,
          accommodation: profile.accommodation,
          travelStyle: profile.travelStyle,
          bio: profile.bio,
        }
      },

      reset: () => set({ profile: null, isDirty: false, isSubmitting: false }),
    }),
    { name: 'MemberStore' },
  ),
)
